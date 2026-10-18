window.MathJax = {
  window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    tags: "ams",
    macros: {
      sf: ["\\mathsf{#1}", 1],
      rm: ["\\mathrm{#1}", 1],
      bb: ["\\mathbb{#1}", 1],
      ca: ["\\mathcal{#1}", 1],
      Hom: \\mathrm{Hom},
      Ob: \\mathrm{Ob},
    },
  },
};
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

document$.subscribe(() => {
  MathJax.startup.output.clearCache()
  MathJax.typesetClear()
  MathJax.texReset()
  MathJax.typesetPromise()
})

component$.subscribe(({ ref }) => {
  if (ref.classList.contains("md-annotation"))
    MathJax.typesetPromise([ref])
})
