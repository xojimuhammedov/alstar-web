"""Cut the colour swatches out of the ALSTAR colour-palette catalog PDF.

Usage (needs PyMuPDF + Pillow):
    python scripts/extract-catalog-swatches.py "ALSTAR — Каталог АКП 2026.pdf"

Each colour page (Матовые, Глянцевые, Metallic, Mirror·Sparkling·Brush, Wood,
Marble) is one full-page picture with the swatches drawn as rounded tiles; the
"ALS-xxx" code is real text right under each tile. The script finds every code,
walks up from it to the tile above, crops the tile's inner area and writes
public/colours/<finish>-<code>.webp. Re-run it when the designer sends the
final catalog, then update src/content/colourCatalog.ts if colours changed.
"""

import os
import re
import statistics
import sys

import fitz  # PyMuPDF
from PIL import Image

PAGES = {6: 'matte', 7: 'glossy', 8: 'metallic', 9: 'special', 10: 'wood', 11: 'marble'}
DPI = 216  # 3x the 72 dpi page space
S = DPI / 72
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'colours')


def is_bg(px):
    return max(px[:3]) < 28  # the catalog's near-black page background


def slug(code):
    return code.lower().replace('/', '-').replace('.', '-')


def main(pdf_path):
    os.makedirs(OUT, exist_ok=True)
    doc = fitz.open(pdf_path)
    for page_no, finish in PAGES.items():
        page = doc[page_no - 1]
        pix = page.get_pixmap(dpi=DPI)
        img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        px = img.load()
        codes = [w for w in page.get_text('words') if re.match(r'^ALS-', w[4])]
        boxes = {}
        for x0, y0, _x1, _y1, code, *_ in codes:
            cx = int((x0 + 14) * S)
            y = int((y0 - 3) * S)
            while y > 0 and is_bg(px[cx, y]):  # gap between tile and code
                y -= 1
            bottom = y
            while y > 0 and not is_bg(px[cx, y]):  # the tile itself
                y -= 1
            top = y
            mid = (top + bottom) // 2
            x = cx
            while x < img.width - 1 and not is_bg(px[x, mid]):
                x += 1
            right = x
            boxes[code] = [int(x0 * S), top, right, bottom, int(y0 * S)]
        # Near-black tiles (e.g. Deep black) blend into the page: use the typical tile size and gap.
        good = [b for b in boxes.values() if b[3] - b[1] > 40 * S and b[2] - b[0] > 40 * S and b[4] - b[3] < 30 * S]
        h = statistics.median(b[3] - b[1] for b in good)
        w = statistics.median(b[2] - b[0] for b in good)
        gap = statistics.median(b[4] - b[3] for b in good)
        for code, (left, top, right, bottom, code_top) in boxes.items():
            if abs((code_top - bottom) - gap) > 4 * S or abs((bottom - top) - h) > 0.2 * h or right - left < 0.8 * w:
                bottom = code_top - gap
                top, right = bottom - h, left + w
            inset = int(5 * S)  # skip the rounded corners
            tile = img.crop((left + inset, int(top) + inset, int(right) - inset, bottom - inset))
            tile.thumbnail((480, 480))
            name = f'{finish}-{slug(code)}.webp'
            tile.save(os.path.join(OUT, name), 'WEBP', quality=82)
            print(page_no, code, tile.size, name)


if __name__ == '__main__':
    main(sys.argv[1])
