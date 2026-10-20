#!/usr/bin/env python3
"""docs/ 안의 ```tikzcd 블록 중 SVG가 없는 것만 렌더링.

  python scripts/render_tikzcd.py           # 새 다이어그램만 렌더 (병렬)
  python scripts/render_tikzcd.py --check   # 누락 검사만 (TeX 불필요, CI용)
  python scripts/render_tikzcd.py --prune   # 안 쓰이는 SVG 삭제
"""
import argparse, os, re, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from tikzcd_fence import CACHE_DIR, PREAMBLE_FILE, ROOT, digest

FENCE_RE = re.compile(
    r"^(?P<indent>[ \t]*)(?P<fence>`{3,}|~{3,})[ \t]*tikzcd\b[^\n]*\n"
    r"(?P<body>.*?)^(?P=indent)(?P=fence)[ \t]*$",
    re.MULTILINE | re.DOTALL,
)


def find_blocks():
    blocks = {}
    for md in sorted((ROOT / "docs").rglob("*.md")):
        for m in FENCE_RE.finditer(md.read_text(encoding="utf-8")):
            ind = m["indent"]  # admonition 등 들여쓰기 안의 블록 대응
            body = "\n".join(l[len(ind):] if l.startswith(ind) else l.lstrip()
                             for l in m["body"].splitlines())
            blocks.setdefault(digest(body), (body, md))
    return blocks


def postprocess(svg: str, h: str) -> str:
    p = f"cd{h[:8]}-"  # 한 페이지에 SVG 여러 개를 인라인할 때 id 충돌 방지
    svg = re.sub(r"<\?xml.*?\?>|<!DOCTYPE[^>]*>|<!--.*?-->", "", svg, flags=re.S)
    svg = re.sub(r"""\bid=(['"])""", rf"id=\g<1>{p}", svg)
    svg = re.sub(r"""href=(['"])#""", rf"href=\g<1>#{p}", svg)
    svg = svg.replace("url(#", f"url(#{p}")
    # 검정색을 currentColor로 바꿔서 테마 글자색(다크 모드 포함)을 따르게 함
    svg = re.sub(r"""(['"])#000(?:000)?\1""", r"\g<1>currentColor\g<1>", svg)
    svg = svg.replace("<svg ", '<svg fill="currentColor" ', 1)
    return svg.strip()


def render_one(item):
    h, (body, src) = item
    tex = PREAMBLE_FILE.read_text(encoding="utf-8").replace("%%BODY%%", body)
    run = dict(check=True, capture_output=True, encoding="utf-8", errors="replace")
    with tempfile.TemporaryDirectory() as tmp:
        t = Path(tmp)
        (t / "d.tex").write_text(tex, encoding="utf-8")
        try:
            subprocess.run(["latex", "-interaction=nonstopmode", "-halt-on-error",
                            "d.tex"], cwd=t, **run)
            subprocess.run(["dvisvgm", "--no-fonts", "--exact-bbox",
                            "-o", "d.svg", "d.dvi"], cwd=t, **run)
        except subprocess.CalledProcessError as e:
            log = t / "d.log"
            text = log.read_text(errors="replace") if log.exists() else e.stderr
            errs = [l for l in text.splitlines() if l.startswith("!")]
            return f"{src.relative_to(ROOT)}: " + ("\n".join(errs) or "render failed")
        svg = (t / "d.svg").read_text(encoding="utf-8")
    (CACHE_DIR / f"{h}.svg").write_text(postprocess(svg, h), encoding="utf-8")
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--prune", action="store_true")
    a = ap.parse_args()

    CACHE_DIR.mkdir(exist_ok=True)
    blocks = find_blocks()
    todo = {h: v for h, v in blocks.items() if not (CACHE_DIR / f"{h}.svg").exists()}

    if a.check:
        for h, (_, src) in todo.items():
            print(f"missing: {src.relative_to(ROOT)} ({h})")
        sys.exit(1 if todo else 0)

    errors = []
    if todo:
        with ThreadPoolExecutor(max_workers=os.cpu_count() or 2) as ex:
            errors = [e for e in ex.map(render_one, todo.items()) if e]
    for e in errors:
        print(e, file=sys.stderr)

    if a.prune:
        for f in CACHE_DIR.glob("*.svg"):
            if f.stem not in blocks:
                f.unlink()

    print(f"{len(blocks)} diagrams, {len(todo) - len(errors)} rendered, "
          f"{len(errors)} failed")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()