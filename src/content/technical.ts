// Technical center page (/texnik-markaz/). Sections match the five cards of the
// home-page "Texnik markaz" block: datasheets, installation guide, certificates,
// fire-safety documents and downloads.
import type { Locale } from '../i18n';

/** Certificates that belong under "Fire-safety documents" (ids from content/certificates.ts). */
export const fireCertificateIds = ['fire-b1', 'fire-ng-ru'];

/** Download file of a certificate (first page, full resolution) — public/docs/. */
export const certificateFile = (id: string) => `docs/alstar-${id}.jpg`;

interface TechnicalPage {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  intro: string;
  datasheets: { title: string; intro: string; specLink: string; fireClass: string; more: string };
  installation: { title: string; intro: string; open: string; langNote: string; steps: string[] };
  fire: { title: string; intro: string };
  downloads: { title: string; intro: string; spec: string; specSub: string; catalog: string; catalogSub: string; soon: string };
  open: string;
  download: string;
  imageNote: string;
}

const uz: TechnicalPage = {
  metaTitle: 'Texnik markaz — ALSTAR ACP panellari bo‘yicha hujjatlar va qo‘llanmalar',
  metaDescription:
    'ALSTAR texnik markazi: PE, B1 va A2 panellar spetsifikatsiyasi, o‘rnatish bo‘yicha qo‘llanma, sertifikatlar, yong‘in xavfsizligi hujjatlari va yuklab olish.',
  kicker: 'ALSTAR · Texnik markaz',
  title: 'Texnik markaz',
  intro: 'Barcha texnik ma’lumotlar bir joyda: spetsifikatsiya, o‘rnatish bo‘yicha qo‘llanma, sertifikatlar va yuklab olinadigan hujjatlar.',
  datasheets: {
    title: 'Texnik tavsifnomalar',
    intro: 'Har bir panel turi bo‘yicha asosiy xarakteristikalar. To‘liq jadval — spetsifikatsiyada.',
    specLink: 'To‘liq spetsifikatsiya',
    fireClass: 'Yong‘in klassi',
    more: 'Batafsil',
  },
  installation: {
    title: 'O‘rnatish bo‘yicha qo‘llanma',
    intro: 'Ventilyatsiyali fasad tizimida ACP panellarni o‘rnatishning asosiy bosqichlari — tayyorgarlikdan parvarishgacha.',
    open: 'Qo‘llanmani o‘qish',
    langNote: '',
    steps: [
      'Montajdan oldingi tayyorgarlik',
      'Tashish va saqlash',
      'Kerakli asbob-uskunalar',
      'Metall karkasni o‘rnatish',
      'Kesish, frezerlash va bukish',
      'Fasadga o‘rnatish va choklar',
      'Himoya plyonkasi va parvarish',
      'Eng ko‘p uchraydigan xatolar',
    ],
  },
  fire: {
    title: 'Yong‘in xavfsizligi hujjatlari',
    intro: 'ALSTAR panellarining yong‘in xavfsizligi bo‘yicha sinov bayonnomalari va sertifikatlari.',
  },
  downloads: {
    title: 'Yuklab olish',
    intro: 'Sertifikatlar, hujjatlar va texnik ma’lumotlarni yuklab oling.',
    spec: 'Texnik spetsifikatsiya',
    specSub: 'PE, B1, A2 — o‘lchamlar, alyuminiy qalinligi, qoplama',
    catalog: 'ALSTAR katalogi',
    catalogSub: 'Mahsulotlar va ranglar katalogi',
    soon: 'Tez orada',
  },
  open: 'Ochish',
  download: 'Yuklab olish',
  imageNote: 'JPG · 1-sahifa',
};

const ru: TechnicalPage = {
  metaTitle: 'Технический центр — документы и инструкции по панелям ALSTAR',
  metaDescription:
    'Технический центр ALSTAR: спецификация панелей PE, B1 и A2, инструкция по монтажу, сертификаты, документы по пожарной безопасности и загрузки.',
  kicker: 'ALSTAR · Технический центр',
  title: 'Технический центр',
  intro: 'Вся техническая информация в одном месте: спецификация, инструкция по монтажу, сертификаты и документы для скачивания.',
  datasheets: {
    title: 'Технические описания',
    intro: 'Основные характеристики каждого типа панели. Полная таблица — в спецификации.',
    specLink: 'Полная спецификация',
    fireClass: 'Класс пожарной безопасности',
    more: 'Подробнее',
  },
  installation: {
    title: 'Инструкция по монтажу',
    intro: 'Основные этапы монтажа АКП в системе вентилируемого фасада — от подготовки до ухода.',
    open: 'Читать инструкцию',
    langNote: 'на узбекском языке',
    steps: [
      'Подготовка к монтажу',
      'Транспортировка и хранение',
      'Инструменты',
      'Монтаж металлического каркаса',
      'Резка, фрезеровка и гибка',
      'Монтаж на фасад и швы',
      'Защитная плёнка и уход',
      'Частые ошибки',
    ],
  },
  fire: {
    title: 'Документы по пожарной безопасности',
    intro: 'Протоколы испытаний и сертификаты пожарной безопасности панелей ALSTAR.',
  },
  downloads: {
    title: 'Загрузки',
    intro: 'Скачайте сертификаты, документы и технические данные.',
    spec: 'Техническая спецификация',
    specSub: 'PE, B1, A2 — размеры, толщина алюминия, покрытие',
    catalog: 'Каталог ALSTAR',
    catalogSub: 'Каталог продукции и цветов',
    soon: 'Скоро',
  },
  open: 'Открыть',
  download: 'Скачать',
  imageNote: 'JPG · 1-я страница',
};

const en: TechnicalPage = {
  metaTitle: 'Technical center — ALSTAR panel documents and guides',
  metaDescription:
    'ALSTAR technical center: PE, B1 and A2 panel specification, installation guide, certificates, fire-safety documents and downloads.',
  kicker: 'ALSTAR · Technical center',
  title: 'Technical center',
  intro: 'All technical information in one place: specification, installation guide, certificates and downloadable documents.',
  datasheets: {
    title: 'Technical datasheets',
    intro: 'Key characteristics of each panel type. The full table is in the specification.',
    specLink: 'Full specification',
    fireClass: 'Fire class',
    more: 'View details',
  },
  installation: {
    title: 'Installation guide',
    intro: 'The main steps of installing ACP in a ventilated façade system — from preparation to care.',
    open: 'Read the guide',
    langNote: 'in Uzbek',
    steps: [
      'Preparation',
      'Transport and storage',
      'Tools',
      'Metal sub-frame',
      'Cutting, routing and folding',
      'Fixing to the façade and joints',
      'Protective film and care',
      'Common mistakes',
    ],
  },
  fire: {
    title: 'Fire-safety documents',
    intro: 'Fire test reports and fire-safety certificates of ALSTAR panels.',
  },
  downloads: {
    title: 'Downloads',
    intro: 'Download certificates, documents and technical data.',
    spec: 'Technical specification',
    specSub: 'PE, B1, A2 — sizes, aluminium thickness, coating',
    catalog: 'ALSTAR catalog',
    catalogSub: 'Products and colours catalog',
    soon: 'Coming soon',
  },
  open: 'Open',
  download: 'Download',
  imageNote: 'JPG · page 1',
};

export const technicalPage: Record<Locale, TechnicalPage> = { uz, ru, en };
