(() => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  // 다이어그램에서 <html>까지 올라가며 배경색을 모은 뒤,
  // 바깥쪽부터 1x1 캔버스에 겹쳐 칠해서 실제로 보이는 색을 얻는다.
  // (반투명 admonition 배경, 다크 모드, 어떤 색 표기법이든 브라우저가 알아서 처리)
  function effectiveBg(el) {
    const layers = [];
    for (let n = el; n instanceof Element; n = n.parentElement) {
      layers.push(getComputedStyle(n).backgroundColor);
    }
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 1, 1);
    for (const color of layers.reverse()) {
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
    }
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  }

  function update() {
    document.querySelectorAll(".md-typeset .tikzcd").forEach((el) => {
      el.style.setProperty("--tikzcd-bg", effectiveBg(el));
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(update);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", update);
  else update();

  // 라이트/다크 전환 시 다시 계산
  new MutationObserver(update).observe(document.body, {
    attributes: true,
    attributeFilter: ["data-md-color-scheme"],
  });
})();