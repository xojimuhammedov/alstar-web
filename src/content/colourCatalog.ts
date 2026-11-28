// Colour catalogue as printed in the ALSTAR "Color palette" catalog (АКП 2026,
// draft sent by Otabek on 27 Nov 2026, pages 06–11). Order and grouping follow the
// catalog page by page, as ALSTAR asked ("katalogdagi ketma-ketlik").
//
// The site shows this list whenever the content API is not configured or fails
// (e.g. the GitHub Pages preview), so "Barcha ranglar" always works.
// Swatches: public/colours/*.webp, cut from the PDF by
// scripts/extract-catalog-swatches.py — re-run it when the final catalog arrives.
//
// TODO(ALSTAR): ALS-050 is printed twice — glossy "Антрацитово-серый RAL 7016"
// and marble "Мрамор США". One of the two codes is probably a typo.
import type { FinishDto, FinishVariantDto } from '../config/api';
import type { Locale } from '../i18n';
import { withBase } from '../routes';

type Text = Record<Locale, string>;

export type CatalogGroup = 'matte' | 'glossy' | 'metallic' | 'special' | 'wood' | 'marble';

export const catalogGroups: { id: CatalogGroup; name: Text }[] = [
  { id: 'matte', name: { uz: 'Mat ranglar', ru: 'Матовые цвета', en: 'Matte colours' } },
  { id: 'glossy', name: { uz: 'Yaltiroq ranglar', ru: 'Глянцевые цвета', en: 'Glossy colours' } },
  { id: 'metallic', name: { uz: 'Metallik ranglar', ru: 'Цвета металлик', en: 'Metallic colours' } },
  {
    id: 'special',
    name: { uz: 'Ko‘zgu · Sparkling · Brush', ru: 'Mirror · Sparkling · Brush', en: 'Mirror · Sparkling · Brush' },
  },
  { id: 'wood', name: { uz: 'Yog‘och teksturasi', ru: 'Текстура дерева', en: 'Wood texture' } },
  { id: 'marble', name: { uz: 'Marmar teksturasi', ru: 'Текстура мрамора', en: 'Marble texture' } },
];

/** Finish cards on the home page → the catalog group they open. */
export const cardToGroup: Record<string, CatalogGroup | undefined> = {
  matte: 'matte',
  glossy: 'glossy',
  metallic: 'metallic',
  mirror: 'special',
  sparkling: 'special',
  wood: 'wood',
  marble: 'marble',
  // exclusive: not in the catalog yet — opens the whole catalogue.
};

interface Colour {
  code: string;
  ral?: string;
  /** Sub-type printed on the "Mirror · Sparkling · Brush" page. */
  kind?: string;
  name: Text;
}

const c = (code: string, ru: string, uz: string, en: string, ral?: string, kind?: string): Colour => ({
  code,
  ral,
  kind,
  name: { ru, uz, en },
});

export const catalog: Record<CatalogGroup, Colour[]> = {
  matte: [
    c('ALS-012', 'Сигнально-белый', 'Signal oq', 'Signal White', 'RAL 9003'),
    c('ALS-024', 'Жемчужно-белый', 'Marvarid oq', 'Pearl White', 'RAL 1013'),
    c('ALS-048', 'Слоновая кость', 'Fil suyagi', 'Light Ivory', 'RAL 1015'),
    c('ALS-013', 'Рапсово-жёлтый', 'Raps sarig‘i', 'Colza Yellow', 'RAL 1021'),
    c('ALS-006', 'Транспортно-оранжевый', 'Transport to‘q sariq', 'Traffic Orange', 'RAL 2009'),
    c('ALS-031', 'Пурпурно-красный', 'Purpur qizil', 'Purple Red', 'RAL 3004'),
    c('ALS-016/1', 'Фисташковый', 'Pista rang', 'Pistachio', 'RAL 6039'),
    c('ALS-014', 'Зелёный', 'Yashil', 'Green', 'RAL 6037'),
    c('ALS-016', 'Бирюзово-зелёный', 'Firuza-yashil', 'Turquoise Green', 'RAL 6016'),
    c('ALS-022', 'Небесно-синий', 'Osmon ko‘k', 'Sky Blue', 'RAL 5015'),
    c('ALS-032', 'Красно-сиреневый', 'Qizil siren', 'Red Lilac', 'RAL 4001'),
    c('ALS-015', 'Шоколадно-коричневый', 'Shokolad jigarrang', 'Chocolate Brown', 'RAL 8017'),
    c('ALS-049', 'Светло-серый', 'Och kulrang', 'Light Grey', 'RAL 7035'),
    c('ALS-028', 'Антрацитово-серый', 'Antratsit kulrang', 'Anthracite Grey', 'RAL 7016'),
    c('ALS-030', 'Глубокий чёрный', 'Chuqur qora', 'Jet Black', 'RAL 9005'),
  ],
  glossy: [
    c('ALS-002', 'Жемчужно-белый', 'Marvarid oq', 'Pearl White', 'RAL 1013'),
    c('ALS-005', 'Транспортно-красный', 'Transport qizil', 'Traffic Red', 'RAL 3020'),
    c('ALS-004', 'Ультрамарин', 'Ultramarin', 'Ultramarine Blue', 'RAL 5002'),
    c('ALS-023', 'Светло-зелёный', 'Och yashil', 'Light Green', 'RAL 6027'),
    c('ALS-050', 'Антрацитово-серый', 'Antratsit kulrang', 'Anthracite Grey', 'RAL 7016'),
    c('ALS-007', 'Шоколадно-коричневый', 'Shokolad jigarrang', 'Chocolate Brown', 'RAL 8017'),
    c('ALS-001', 'Сигнально-белый', 'Signal oq', 'Signal White', 'RAL 9003'),
    c('ALS-009', 'Глубокий чёрный', 'Chuqur qora', 'Jet Black', 'RAL 9005'),
  ],
  metallic: [
    c('ALS-033', 'Шампань', 'Shampan', 'Champagne'),
    c('ALS-051', 'Золото', 'Oltin', 'Gold'),
    c('ALS-003', 'Бронза', 'Bronza', 'Bronze'),
    c('ALS-008', 'Ярко-серебряный лёд', 'Yorqin kumush muz', 'Bright Silver Ice'),
    c('ALS-045', 'Тёмно-серый металлик', 'To‘q kulrang metallik', 'Dark Grey Metallic'),
    c('ALS-010', 'Изумрудный металлик', 'Zumrad metallik', 'Emerald Metallic'),
  ],
  special: [
    c('ALS-025', 'Серебряное зеркало', 'Kumush ko‘zgu', 'Silver Mirror', undefined, 'Mirror'),
    c('ALS-026', 'Золотое зеркало', 'Oltin ko‘zgu', 'Gold Mirror', undefined, 'Mirror'),
    c('ALS-044', 'Спарклинг', 'Sparkling', 'Sparkling', undefined, 'Sparkling'),
    c('ALS-034', 'Золотой штрих', 'Oltin shtrix', 'Gold Brush', undefined, 'Brush'),
  ],
  wood: [
    c('ALS-046', 'Дуб 2022', 'Eman 2022', 'Oak 2022'),
    c('ALS-036', 'Дуб шершавый', 'G‘adir-budir eman', 'Rough Oak'),
    c('ALS-037', 'Дуб серый', 'Kulrang eman', 'Grey Oak'),
    c('ALS-029', 'Дуб золотой', 'Oltin eman', 'Golden Oak'),
    c('ALS-040', 'Дуб мокко', 'Mokko eman', 'Mocha Oak'),
    c('ALS-054', 'Дуб 2023', 'Eman 2023', 'Oak 2023'),
  ],
  marble: [
    c('ALS-035', 'Белый мрамор', 'Oq marmar', 'White Marble'),
    c('ALS-052', 'Чёрный мрамор', 'Qora marmar', 'Black Marble'),
    c('ALS-027', 'Травертин', 'Travertin', 'Travertine'),
    c('ALS-027/1', 'Травертин 3D', 'Travertin 3D', 'Travertine 3D'),
    c('ALS-038', 'Красная индия', 'Qizil Hindiston', 'Red India'),
    c('ALS-039', 'Фиолетовая индия', 'Binafsha Hindiston', 'Purple India'),
    c('ALS-050', 'Мрамор США', 'AQSH marmari', 'US Marble'),
    c('ALS-020', 'Красный гранит', 'Qizil granit', 'Red Granite'),
    c('ALS-019', 'Коричневый гранит', 'Jigarrang granit', 'Brown Granite'),
  ],
};

const fileSlug = (code: string) => code.toLowerCase().replace(/[/.]/g, '-');

/** The catalogue in the API's shape, so the colour section renders it the same way. */
export function staticFinishes(locale: Locale): FinishDto[] {
  return catalogGroups.map((g, gi) => {
    const variants: FinishVariantDto[] = catalog[g.id].map((col, i) => ({
      id: `${g.id}-${fileSlug(col.code)}`,
      slug: `${g.id}-${fileSlug(col.code)}`,
      finish: g.id,
      code: col.code,
      ral: col.ral ?? col.kind ?? '',
      image: withBase(`colours/${g.id}-${fileSlug(col.code)}.webp`),
      order: i,
      name: col.name[locale],
    }));
    return {
      id: g.id,
      slug: g.id,
      order: gi,
      image: null,
      name: g.name[locale],
      featured: variants[0],
      variants_count: variants.length,
      variants,
    };
  });
}

/** Local search for the static catalogue: code, RAL and the name in every language. */
export function searchStatic(query: string): Set<string> {
  const q = query.trim().toLowerCase().replace(/\s+/g, ' ');
  const ids = new Set<string>();
  for (const g of catalogGroups) {
    for (const col of catalog[g.id]) {
      const hay = [col.code, col.ral ?? '', col.kind ?? '', ...Object.values(col.name), ...Object.values(g.name)]
        .join(' ')
        .toLowerCase();
      if (hay.includes(q) || hay.replace(/[-\s]/g, '').includes(q.replace(/[-\s]/g, ''))) {
        ids.add(`${g.id}-${fileSlug(col.code)}`);
      }
    }
  }
  return ids;
}
