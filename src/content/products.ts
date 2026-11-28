// Product page (/mahsulotlar/) content. Source: ALSTAR catalog "АКП 2026" (draft,
// pages 03–04) and the product sheet photo Otabek sent on 27 Nov 2026
// ("АЛСТАР A2 / B1 / PE — Это означает…"). Uzbek and English are translations
// of the Russian originals.
import type { Locale } from '../i18n';

export type ProductId = 'pe' | 'b1' | 'a2';

interface ProductDetail {
  id: ProductId;
  /** Catalog headline, e.g. "Стандарт огнестойкости". */
  standard: string;
  /** Catalog sub-line, e.g. "Огнестойкость и среднее дымовыделение в случае пожара." */
  summary: string;
  /** "… соответствует требованиям EN 13501-1 …" */
  compliance: string;
  /** "Это означает: …" */
  meaning: string;
  specs: { label: string; value: string }[];
}

interface SpecTable {
  title: string;
  head: string[];
  rows: string[][];
}

interface ProductsPage {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  intro: string;
  detailsTitle: string;
  meaningLabel: string;
  specsLabel: string;
  specTitle: string;
  specIntro: string;
  products: ProductDetail[];
  tables: SpecTable[];
  ask: string;
}

const uz: ProductsPage = {
  metaTitle: 'ALSTAR mahsulotlari — PE, B1 va A2 alyuminiy kompozit panellar | Spetsifikatsiya',
  metaDescription:
    'ALSTAR PE, B1 (EN 13501-1 B-s1, d0) va A2 (A2-s1, d0) alyuminiy kompozit panellari: tavsif, yong‘in klassi, o‘lchamlar, alyuminiy qalinligi va qoplama turlari.',
  kicker: 'ALSTAR · Mahsulotlar',
  title: 'Mahsulotlar',
  intro: 'Uch turdagi alyuminiy kompozit panel — standart PE, yong‘inga chidamli B1 va yonmaydigan A2. Har biri bo‘yicha to‘liq ma’lumot va texnik spetsifikatsiya.',
  detailsTitle: 'Mahsulotlar haqida batafsil',
  meaningLabel: 'Bu nimani anglatadi',
  specsLabel: 'Asosiy xarakteristikalar',
  specTitle: 'Spetsifikatsiya',
  specIntro: 'Standart o‘lchamlar va buyurtma asosida ishlab chiqariladigan variantlar.',
  products: [
    {
      id: 'pe',
      standard: 'Standart PE',
      summary: 'Polietilen to‘ldirgichli panel.',
      compliance: 'ALSTAR PE alyuminiy kompozit paneli — yong‘inga chidamlilik klassiga ega bo‘lmagan standart ACP.',
      meaning:
        'ALSTAR PE panellari bino fasadlarini bezash, fasad va tom konstruksiyalarini qoplash hamda interyerda foydalanish uchun mos. Yong‘in xavfsizligi bo‘yicha alohida talablar qo‘yilmagan mavjud va yangi binolarda qo‘llaniladi.',
      specs: [
        { label: 'O‘zak', value: 'Polietilen (PE)' },
        { label: 'Yong‘in klassi (EN 13501-1)', value: 'Klassga ega emas' },
        { label: 'Alyuminiy qalinligi', value: '0,18 / 0,2 / 0,22 mm · buyurtma: 0,1–0,7 mm' },
        { label: 'Panel qalinligi', value: '3 mm, 4 mm · buyurtma: 2–8 mm' },
        { label: 'Panel o‘lchami', value: '1220 × 2440 mm' },
      ],
    },
    {
      id: 'b1',
      standard: 'Yong‘inga chidamlilik standarti',
      summary: 'Yong‘in paytida olovbardosh, o‘rtacha tutun chiqaradi.',
      compliance: 'ALSTAR B1 alyuminiy kompozit paneli EN 13501-1 bo‘yicha B-s1, d0 yong‘in xavfsizligi klassi talablariga javob beradi.',
      meaning:
        'ALSTAR B1 panellari ventilyatsiyali fasadlarni murakkab shaklda bezash, fasad va tom konstruksiyalarini qoplash hamda interyerda foydalanish uchun juda mos. Mavjud va yangi binolarda qo‘llaniladi.',
      specs: [
        { label: 'O‘zak', value: 'Yong‘inga chidamli (FR) o‘zak' },
        { label: 'Yong‘in klassi (EN 13501-1)', value: 'B-s1, d0' },
        { label: 'Alyuminiy qalinligi', value: '0,3 / 0,4 mm · buyurtma: 0,25–0,7 mm' },
        { label: 'Panel qalinligi', value: '3 mm, 4 mm · buyurtma: 2–8 mm' },
        { label: 'Panel o‘lchami', value: '1220 × 2440 mm' },
      ],
    },
    {
      id: 'a2',
      standard: 'Yonmaydigan muqobil',
      summary: 'Yonmaydi, yong‘in paytida kam tutun chiqaradi.',
      compliance: 'ALSTAR A2 kompozit paneli EN 13501-1 bo‘yicha A2-s1, d0 klassining juda yuqori yong‘in xavfsizligi talablariga javob beradi.',
      meaning:
        'ALSTAR A2 panellari — baland binolar va xavfi yuqori bo‘lgan binolarni qoplash uchun ideal material: bunday obyektlarda A2 yevroklassidagi yonmaydigan fasad materiallarini qo‘llash majburiy.',
      specs: [
        { label: 'O‘zak', value: 'Mineral (yonmaydigan) o‘zak' },
        { label: 'Yong‘in klassi (EN 13501-1)', value: 'A2-s1, d0' },
        { label: 'Alyuminiy qalinligi', value: '0,3 / 0,4 mm · buyurtma: 0,3–0,7 mm' },
        { label: 'Panel qalinligi', value: '3 mm, 4 mm · buyurtma: 2–8 mm' },
        { label: 'Panel o‘lchami', value: '1220 × 2440 mm' },
      ],
    },
  ],
  tables: [
    {
      title: 'ACP o‘lchamlari',
      head: ['Xarakteristika', 'Standart', 'Buyurtma asosida'],
      rows: [
        ['Panel kengligi', '1220 mm', '1000 dan 1600 mm gacha'],
        ['Panel uzunligi', '2440 mm', 'Tashish imkoniyatiga qarab istalgan uzunlik'],
        ['Panel qalinligi', '3 mm, 4 mm', '2 dan 8 mm gacha'],
      ],
    },
    {
      title: 'Qoplama turi',
      head: ['Tur', 'Tavsif'],
      rows: [
        ['PE (Polyester)', 'Ichki foydalanish uchun. Xizmat muddati — 10 yil.'],
        ['PVDF (Poly Vinylidene Fluoride)', 'Tashqi foydalanish uchun. Xizmat muddati — 20–25 yil.'],
      ],
    },
    {
      title: 'Alyuminiy qalinligi',
      head: ['ACP turi', 'Standart', 'Buyurtma asosida'],
      rows: [
        ['PE', 'Dibond — 0,18 mm\nAlstar — 0,2 mm\nAlstar — 0,22 mm', '0,1 dan 0,7 mm gacha'],
        ['B1', 'Alstar7 FR B1 — 0,3 / 0,4 mm\nAlstar FR B1 — 0,3 / 0,4 mm\nUzbond FR B1 — 0,3 / 0,4 mm', '0,25 dan 0,7 mm gacha'],
        ['A2', 'Alstar FR A2 — 0,3 / 0,4 mm\nUzbond FR A2 — 0,3 / 0,4 mm', '0,3 dan 0,7 mm gacha'],
      ],
    },
  ],
  ask: 'Narx yoki namuna so‘rash',
};

const ru: ProductsPage = {
  metaTitle: 'Продукция ALSTAR — алюминиевые композитные панели PE, B1 и A2 | Спецификация',
  metaDescription:
    'Алюминиевые композитные панели ALSTAR PE, B1 (EN 13501-1 B-s1, d0) и A2 (A2-s1, d0): описание, класс пожарной безопасности, размеры, толщина алюминия и типы покрытия.',
  kicker: 'ALSTAR · Продукция',
  title: 'Продукция',
  intro: 'Три типа алюминиевых композитных панелей — стандартная PE, огнестойкая B1 и негорючая A2. Подробное описание и техническая спецификация.',
  detailsTitle: 'Подробно о продукции',
  meaningLabel: 'Это означает',
  specsLabel: 'Основные характеристики',
  specTitle: 'Спецификация',
  specIntro: 'Стандартные размеры и варианты под заказ.',
  products: [
    {
      id: 'pe',
      standard: 'Стандарт PE',
      summary: 'Полиэтиленовое наполнение.',
      compliance: 'Алюминиевая композитная панель ALSTAR/PE является стандартной АКП, не имеющей класса огнестойкости.',
      meaning:
        'Алюминиевые композитные панели ALSTAR/PE подходят для оформления фасадов зданий, облицовки фасадов и кровельных конструкций, а также для внутреннего применения. Как в существующих, так и в новых зданиях без требований пожарной безопасности.',
      specs: [
        { label: 'Сердечник', value: 'Полиэтилен (PE)' },
        { label: 'Класс (EN 13501-1)', value: 'Не имеет класса огнестойкости' },
        { label: 'Толщина алюминия', value: '0,18 / 0,2 / 0,22 мм · под заказ: 0,1–0,7 мм' },
        { label: 'Толщина панели', value: '3 мм, 4 мм · под заказ: 2–8 мм' },
        { label: 'Размер панели', value: '1220 × 2440 мм' },
      ],
    },
    {
      id: 'b1',
      standard: 'Стандарт огнестойкости',
      summary: 'Огнестойкость и среднее дымовыделение в случае пожара.',
      compliance: 'Алюминиевая композитная панель ALSTAR B-1 соответствует требованиям пожарной безопасности EN 13501-1 класса B-s1, d0.',
      meaning:
        'Алюминиевые композитные панели ALSTAR B-1 идеально подходят для сложного оформления вентилируемых фасадов зданий, облицовки фасадов и кровельных конструкций, а также для внутреннего применения. Как в существующих, так и в новых зданиях.',
      specs: [
        { label: 'Сердечник', value: 'Огнестойкий (FR) сердечник' },
        { label: 'Класс (EN 13501-1)', value: 'B-s1, d0' },
        { label: 'Толщина алюминия', value: '0,3 / 0,4 мм · под заказ: 0,25–0,7 мм' },
        { label: 'Толщина панели', value: '3 мм, 4 мм · под заказ: 2–8 мм' },
        { label: 'Размер панели', value: '1220 × 2440 мм' },
      ],
    },
    {
      id: 'a2',
      standard: 'Негорючая альтернатива',
      summary: 'Негорючесть и низкое дымовыделение в случае пожара.',
      compliance: 'Композитная панель ALSTAR A2 соответствует очень высоким требованиям пожарной безопасности EN 13501-1, класс A2-s1, d0.',
      meaning:
        'Алюминиевые композитные панели ALSTAR A2 — идеальный материал для облицовки высотных зданий и зданий повышенной опасности, где обязательно использование негорючих фасадных материалов еврокласса A2.',
      specs: [
        { label: 'Сердечник', value: 'Минеральный (негорючий) сердечник' },
        { label: 'Класс (EN 13501-1)', value: 'A2-s1, d0' },
        { label: 'Толщина алюминия', value: '0,3 / 0,4 мм · под заказ: 0,3–0,7 мм' },
        { label: 'Толщина панели', value: '3 мм, 4 мм · под заказ: 2–8 мм' },
        { label: 'Размер панели', value: '1220 × 2440 мм' },
      ],
    },
  ],
  tables: [
    {
      title: 'Размеры АКП',
      head: ['Характеристика', 'Стандарт', 'Под заказ'],
      rows: [
        ['Ширина панели', '1220 мм', 'от 1000 до 1600 мм'],
        ['Длина панели', '2440 мм', 'Любая длина исходя из возможностей транспортировки'],
        ['Толщина панели', '3 мм, 4 мм', 'от 2 до 8 мм'],
      ],
    },
    {
      title: 'Тип покрытия',
      head: ['Тип', 'Описание'],
      rows: [
        ['PE (Polyester)', 'Предназначено для внутреннего использования. Срок службы — 10 лет.'],
        ['PVDF (Poly Vinylidene Fluoride)', 'Предназначено для наружного использования. Срок службы — 20–25 лет.'],
      ],
    },
    {
      title: 'Толщина алюминия',
      head: ['Тип АКП', 'Стандарт', 'Под заказ'],
      rows: [
        ['PE', 'Dibond — 0,18 мм\nAlstar — 0,2 мм\nAlstar — 0,22 мм', 'от 0,1 до 0,7 мм'],
        ['B1', 'Alstar7 FR B1 — 0,3 / 0,4 мм\nAlstar FR B1 — 0,3 / 0,4 мм\nUzbond FR B1 — 0,3 / 0,4 мм', 'от 0,25 до 0,7 мм'],
        ['A2', 'Alstar FR A2 — 0,3 / 0,4 мм\nUzbond FR A2 — 0,3 / 0,4 мм', 'от 0,3 до 0,7 мм'],
      ],
    },
  ],
  ask: 'Запросить цену или образец',
};

const en: ProductsPage = {
  metaTitle: 'ALSTAR products — PE, B1 and A2 aluminium composite panels | Specification',
  metaDescription:
    'ALSTAR PE, B1 (EN 13501-1 B-s1, d0) and A2 (A2-s1, d0) aluminium composite panels: description, fire class, sizes, aluminium thickness and coating types.',
  kicker: 'ALSTAR · Products',
  title: 'Products',
  intro: 'Three types of aluminium composite panel — standard PE, fire-retardant B1 and non-combustible A2. Full details and the technical specification.',
  detailsTitle: 'Product details',
  meaningLabel: 'What it means',
  specsLabel: 'Key characteristics',
  specTitle: 'Specification',
  specIntro: 'Standard sizes and made-to-order options.',
  products: [
    {
      id: 'pe',
      standard: 'PE standard',
      summary: 'Polyethylene core.',
      compliance: 'The ALSTAR PE aluminium composite panel is a standard ACP without a fire-resistance class.',
      meaning:
        'ALSTAR PE panels suit building façades, façade and roof cladding and interior use — in existing and new buildings without fire-safety requirements.',
      specs: [
        { label: 'Core', value: 'Polyethylene (PE)' },
        { label: 'Fire class (EN 13501-1)', value: 'No fire-resistance class' },
        { label: 'Aluminium thickness', value: '0.18 / 0.2 / 0.22 mm · to order: 0.1–0.7 mm' },
        { label: 'Panel thickness', value: '3 mm, 4 mm · to order: 2–8 mm' },
        { label: 'Panel size', value: '1220 × 2440 mm' },
      ],
    },
    {
      id: 'b1',
      standard: 'Fire-retardant standard',
      summary: 'Fire resistance and medium smoke release in a fire.',
      compliance: 'The ALSTAR B1 aluminium composite panel meets the fire-safety requirements of EN 13501-1, class B-s1, d0.',
      meaning:
        'ALSTAR B1 panels are ideal for complex ventilated façades, façade and roof cladding and interior use — in existing and new buildings.',
      specs: [
        { label: 'Core', value: 'Fire-retardant (FR) core' },
        { label: 'Fire class (EN 13501-1)', value: 'B-s1, d0' },
        { label: 'Aluminium thickness', value: '0.3 / 0.4 mm · to order: 0.25–0.7 mm' },
        { label: 'Panel thickness', value: '3 mm, 4 mm · to order: 2–8 mm' },
        { label: 'Panel size', value: '1220 × 2440 mm' },
      ],
    },
    {
      id: 'a2',
      standard: 'Non-combustible alternative',
      summary: 'Non-combustible, low smoke release in a fire.',
      compliance: 'The ALSTAR A2 composite panel meets the very high fire-safety requirements of EN 13501-1, class A2-s1, d0.',
      meaning:
        'ALSTAR A2 panels are the ideal cladding for high-rise and high-risk buildings, where non-combustible façade materials of Euroclass A2 are mandatory.',
      specs: [
        { label: 'Core', value: 'Mineral (non-combustible) core' },
        { label: 'Fire class (EN 13501-1)', value: 'A2-s1, d0' },
        { label: 'Aluminium thickness', value: '0.3 / 0.4 mm · to order: 0.3–0.7 mm' },
        { label: 'Panel thickness', value: '3 mm, 4 mm · to order: 2–8 mm' },
        { label: 'Panel size', value: '1220 × 2440 mm' },
      ],
    },
  ],
  tables: [
    {
      title: 'ACP sizes',
      head: ['Characteristic', 'Standard', 'To order'],
      rows: [
        ['Panel width', '1220 mm', '1000 to 1600 mm'],
        ['Panel length', '2440 mm', 'Any length that can be transported'],
        ['Panel thickness', '3 mm, 4 mm', '2 to 8 mm'],
      ],
    },
    {
      title: 'Coating type',
      head: ['Type', 'Description'],
      rows: [
        ['PE (Polyester)', 'For interior use. Service life — 10 years.'],
        ['PVDF (Poly Vinylidene Fluoride)', 'For exterior use. Service life — 20–25 years.'],
      ],
    },
    {
      title: 'Aluminium thickness',
      head: ['ACP type', 'Standard', 'To order'],
      rows: [
        ['PE', 'Dibond — 0.18 mm\nAlstar — 0.2 mm\nAlstar — 0.22 mm', '0.1 to 0.7 mm'],
        ['B1', 'Alstar7 FR B1 — 0.3 / 0.4 mm\nAlstar FR B1 — 0.3 / 0.4 mm\nUzbond FR B1 — 0.3 / 0.4 mm', '0.25 to 0.7 mm'],
        ['A2', 'Alstar FR A2 — 0.3 / 0.4 mm\nUzbond FR A2 — 0.3 / 0.4 mm', '0.3 to 0.7 mm'],
      ],
    },
  ],
  ask: 'Request a price or sample',
};

export const productsPage: Record<Locale, ProductsPage> = { uz, ru, en };
