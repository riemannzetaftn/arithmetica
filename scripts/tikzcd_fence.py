"""SuperFences custom fence: ```tikzcd 블록을 미리 렌더된 SVG로 치환."""
import hashlib
import html
from functools import lru_cache
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE_DIR = ROOT / "tikzcd"  # docs/ 밖이므로 사이트에 별도 파일로 복사되지 않음
PREAMBLE_FILE = ROOT / "scripts" / "tikzcd_preamble.tex"


@lru_cache(maxsize=1)
def _preamble_bytes() -> bytes:
    return PREAMBLE_FILE.read_bytes()


def normalize(source: str) -> str:
    return "\n".join(ln.rstrip() for ln in source.strip("\n").splitlines())


def digest(source: str) -> str:
    h = hashlib.sha256()
    h.update(_preamble_bytes())          # 프리앰블이 바뀌면 전부 재렌더링
    h.update(normalize(source).encode("utf-8"))
    return h.hexdigest()[:16]


def fence(source, language, class_name, options, md, **kwargs):
    path = CACHE_DIR / f"{digest(source)}.svg"
    if path.exists():
        return f'<div class="tikzcd">{path.read_text(encoding="utf-8")}</div>'
    return (
        '<pre class="tikzcd-missing"><code>'
        "[tikzcd not rendered: run python scripts/render_tikzcd.py]\n"
        f"{html.escape(source)}</code></pre>"
    )