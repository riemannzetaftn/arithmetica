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

  // 번호 앞에 붙일 접두어 (예: "1.2" → Theorem 1.2.3)
  function getPrefix(root) {
    const marker = root.querySelector("[data-thm-prefix]");
    if (marker) return marker.dataset.thmPrefix;
    const h1 = root.querySelector("h1");
    const m = h1 && h1.textContent.match(/^\s*(?:Chapter|Section|§)\s*(\d+(?:\.\d+)*)/i);
    return m ? m[1] : "";
  }

  function run() {
    const root = document.querySelector(".md-content") || document.body;
    const prefix = getPrefix(root);
    const types = Object.keys(KINDS);
    const selector = types.map((t) => `.admonition.${t}, details.${t}`).join(", ");
    const counters = {};
    const labels = {};

    root.querySelectorAll(selector).forEach((box) => {
      const type = types.find((t) => box.classList.contains(t));
      const key = SHARED_COUNTER ? "_all" : type;
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