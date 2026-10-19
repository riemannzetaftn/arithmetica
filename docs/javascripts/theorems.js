// First version, replaced on 2026.10.19. 21:23

// (function () {
//   // 번호를 붙일 환경: admonition 타입 → 표시 이름
//   const KINDS = {
//     definition: "Definition",
//     theorem: "Theorem",
//     lemma: "Lemma",
//     proposition: "Proposition",
//     corollary: "Corollary",
//     example: "Example",
//     remark: "Remark",
//   };
//   // true: 모든 환경이 번호 하나를 공유 (Definition 1.1, Theorem 1.2, ...)
//   // false: 환경마다 따로 (Definition 1.1, Theorem 1.1, ...)
//   const SHARED_COUNTER = true;

//   // 번호 앞에 붙일 접두어 (예: "1.2" → Theorem 1.2.3)
//   function getPrefix(root) {
//     const marker = root.querySelector("[data-thm-prefix]");
//     if (marker) return marker.dataset.thmPrefix;
//     const h1 = root.querySelector("h1");
//     const m = h1 && h1.textContent.match(/^\s*(?:Chapter|Section|§)\s*(\d+(?:\.\d+)*)/i);
//     return m ? m[1] : "";
//   }

//   function run() {
//     const root = document.querySelector(".md-content") || document.body;
//     const prefix = getPrefix(root);
//     const types = Object.keys(KINDS);
//     const selector = types.map((t) => `.admonition.${t}, details.${t}`).join(", ");
//     const counters = {};
//     const labels = {};

//     root.querySelectorAll(selector).forEach((box) => {
//       const type = types.find((t) => box.classList.contains(t));
//       const key = SHARED_COUNTER ? "_all" : type;
//       counters[key] = (counters[key] || 0) + 1;
//       const label = `${KINDS[type]} ${prefix ? prefix + "." : ""}${counters[key]}`;

//       // 제목: "Theorem 1.2 (Yoneda)"
//       const title = box.querySelector(":scope > .admonition-title, :scope > summary");
//       if (title) {
//         if (box.dataset.thmName === undefined) {
//           const raw = title.textContent.trim();
//           box.dataset.thmName = raw.toLowerCase() === type ? "" : raw;
//         }
//         const name = box.dataset.thmName;
//         title.textContent = name ? `${label} (${name})` : label;
//       }

//       // 본문 첫 문단의 id를 박스로 옮겨서 링크가 박스 맨 위로 가게 함
//       if (!box.id) {
//         const anchor = box.querySelector(":scope > [id]");
//         if (anchor) {
//           box.id = anchor.id;
//           anchor.removeAttribute("id");
//         }
//       }
//       if (box.id) labels[box.id] = label;
//     });

//     // 같은 페이지 안의 빈 링크 [](#id) 채우기
//     root.querySelectorAll('a[href*="#"]').forEach((a) => {
//       if (a.pathname !== location.pathname) return;
//       const id = decodeURIComponent(a.hash.slice(1));
//       if (!(id in labels)) return;
//       if (a.dataset.thmRef || a.textContent.trim() === "") {
//         a.textContent = labels[id];
//         a.dataset.thmRef = "1";
//       }
//     });
//   }

//   if (typeof document$ !== "undefined") document$.subscribe(run);
//   else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
//   else run();
// })();

(function () {
  // 번호를 붙일 환경: admonition 타입 → 표시 이름
  const KINDS = {
    definition: "Definition",
    theorem: "Theorem",
    lemma: "Lemma",
    proposition: "Proposition",
    corollary: "Corollary",
    example: "Example",
    remark: "Remark",
  };
  // true: 모든 환경이 번호 하나를 공유 (Definition 1.1, Theorem 1.2, ...)
  // false: 환경마다 따로 (Definition 1.1, Theorem 1.1, ...)
  const SHARED_COUNTER = true;

  const TYPES = Object.keys(KINDS);
  const SELECTOR = TYPES.map((t) => `.admonition.${t}, details.${t}`).join(", ");

  function typeOf(box) {
    return TYPES.find((t) => box.classList.contains(t));
  }
  function keyOf(type) {
    return SHARED_COUNTER ? "_all" : type;
  }

  // 경로에서 챕터 정보 추출
  // ".../Category Theory/Chapter 1/Section 2/" → { base: ".../Chapter 1", chapter: "1", section: 2 }
  // ".../Category Theory/Chapter 1/"           → { ..., section: 0 }  (챕터 인덱스)
  function parseLocation(pathname) {
    const path = decodeURIComponent(pathname);
    const m = path.match(/^(.*\/Chapter\s*(\d+))(?:\/Section\s*(\d+))?\/?(?:index\.html)?$/i);
    if (!m) return null;
    return { base: m[1], chapter: m[2], section: m[3] === undefined ? 0 : Number(m[3]) };
  }

  // 번호 앞에 붙일 접두어
  function getPrefix(root, loc) {
    const marker = root.querySelector("[data-thm-prefix]");
    if (marker) return marker.dataset.thmPrefix;
    if (loc) return loc.chapter;
    // 챕터 구조 밖의 페이지는 기존처럼 h1에서
    const h1 = root.querySelector("h1");
    const m = h1 && h1.textContent.match(/^\s*(?:Chapter|Section|§)\s*(\d+(?:\.\d+)*)/i);
    return m ? m[1] : "";
  }

  // 한 페이지(root) 안의 환경 개수 세기
  function countBoxes(root) {
    const counts = {};
    root.querySelectorAll(SELECTOR).forEach((box) => {
      const key = keyOf(typeOf(box));
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }

  // 다른 페이지를 가져와서 개수 세기 (페이지당 한 번만)
  const countCache = new Map();
  function fetchCounts(url) {
    if (!countCache.has(url)) {
      const p = fetch(url)
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.text();
        })
        .then((html) => {
          const doc = new DOMParser().parseFromString(html, "text/html");
          return countBoxes(doc.querySelector(".md-content") || doc.body);
        })
        .catch((err) => {
          console.warn("[theorems] 개수를 세지 못함:", url, err);
          return {};
        });
      countCache.set(url, p);
    }
    return countCache.get(url);
  }

  // 사이드바에서 같은 챕터의 이전 페이지 URL 목록 (섹션 번호순)
  function previousPages(loc) {
    const bySection = new Map();
    document.querySelectorAll(".md-nav a[href]").forEach((a) => {
      const info = parseLocation(a.pathname);
      if (!info || info.base !== loc.base || info.section >= loc.section) return;
      if (!bySection.has(info.section)) bySection.set(info.section, a.href.split("#")[0]);
    });
    return [...bySection.entries()].sort((x, y) => x[0] - y[0]).map(([, url]) => url);
  }

  // 이 페이지의 시작 카운터 = 같은 챕터 이전 페이지들의 개수 합
  async function getStartCounts(loc) {
    const start = {};
    if (!loc) return start;
    const all = await Promise.all(previousPages(loc).map(fetchCounts));
    all.forEach((c) => {
      for (const [k, v] of Object.entries(c)) start[k] = (start[k] || 0) + v;
    });
    return start;
  }

  let runId = 0;
  async function run() {
    const myRun = ++runId;
    const root = document.querySelector(".md-content") || document.body;
    const loc = parseLocation(location.pathname);
    const prefix = getPrefix(root, loc);
    const counters = await getStartCounts(loc);
    if (myRun !== runId) return; // 그 사이 다른 페이지로 이동했으면 중단

    const labels = {};
    root.querySelectorAll(SELECTOR).forEach((box) => {
      const type = typeOf(box);
      const key = keyOf(type);
      counters[key] = (counters[key] || 0) + 1;
      const label = `${KINDS[type]} ${prefix ? prefix + "." : ""}${counters[key]}`;

      // 제목: "Theorem 1.2 (Yoneda)"
      const title = box.querySelector(":scope > .admonition-title, :scope > summary");
      if (title) {
        if (box.dataset.thmName === undefined) {
          const raw = title.textContent.trim();
          box.dataset.thmName = raw.toLowerCase() === type ? "" : raw;
        }
        const name = box.dataset.thmName;
        title.textContent = name ? `${label} (${name})` : label;
      }

      // 본문 첫 문단의 id를 박스로 옮겨서 링크가 박스 맨 위로 가게 함
      if (!box.id) {
        const anchor = box.querySelector(":scope > [id]");
        if (anchor) {
          box.id = anchor.id;
          anchor.removeAttribute("id");
        }
      }
      if (box.id) labels[box.id] = label;
    });

    // 같은 페이지 안의 빈 링크 [](#id) 채우기
    root.querySelectorAll('a[href*="#"]').forEach((a) => {
      if (a.pathname !== location.pathname) return;
      const id = decodeURIComponent(a.hash.slice(1));
      if (!(id in labels)) return;
      if (a.dataset.thmRef || a.textContent.trim() === "") {
        a.textContent = labels[id];
        a.dataset.thmRef = "1";
      }
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(run);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();