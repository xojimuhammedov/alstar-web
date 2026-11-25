// Certificates & patents shown in the certificate carousel. Source PDFs were sent
// by ALSTAR (chief accountant's list, 20 Nov 2026). Rules from ALSTAR:
//  - the fire-safety B1 certificate is the main (first) slide;
//  - expired documents are NOT shown (ISO 9001 2024 → expired 12.07.2026,
//    B1/A2 test protocol 2024 → expired 29.11.2024);
//  - trademark patents go at the end.
// Images: assets-src/cert-NN.png (first page of each PDF) → `npm run images`.
import type { ImageName } from '../config/images';
import type { Locale } from '../i18n';

type Text = Record<Locale, string>;

export interface Certificate {
  id: string;
  image: ImageName;
  /** Page count of the source document, for the "page 1 of N" hint. */
  pages: number;
  title: Text;
  issuer: Text;
  /** Validity as printed on the document (empty when the document has no term). */
  valid: Text;
  kind: 'certificate' | 'document' | 'patent';
}

export const certificates: Certificate[] = [
  {
    id: 'fire-b1',
    image: 'cert-01',
    pages: 3,
    kind: 'certificate',
    // TODO(ALSTAR): the protocol says "valid until 11.03.2026" — send the renewed one.
    title: {
      uz: 'Yong‘in xavfsizligi — FR B1',
      ru: 'Пожарная безопасность — FR B1',
      en: 'Fire safety — FR B1',
    },
    issuer: {
      uz: 'FVV Yong‘in xavfsizligi ilmiy-tadqiqot instituti · sinov bayonnomasi № 64',
      ru: 'НИИ пожарной безопасности МЧС РУз · протокол испытания № 64',
      en: 'Fire Safety Research Institute, Ministry of Emergencies · test report No. 64',
    },
    // Printed term: valid until 11.03.2026 — shown as is, never as current.
    valid: { uz: '11.03.2026-yilgacha', ru: 'до 11.03.2026', en: 'valid to 11.03.2026' },
  },
  {
    id: 'fire-ng-ru',
    image: 'cert-02',
    pages: 1,
    kind: 'certificate',
    title: {
      uz: 'Yonmaslik sertifikati (NG)',
      ru: 'Сертификат пожарной безопасности (НГ)',
      en: 'Non-combustibility certificate (NG)',
    },
    issuer: {
      uz: 'Rossiya, GOST R 57270-2016 · № ROSS RU.32079.04SPB1.OS14.59713',
      ru: 'Россия, ГОСТ Р 57270-2016 · № РОСС RU.32079.04СПБ1.ОС14.59713',
      en: 'Russia, GOST R 57270-2016 · No. ROSS RU.32079.04SPB1.OS14.59713',
    },
    valid: { uz: '2029-yilgacha', ru: 'до 2029 г.', en: 'valid to 2029' },
  },
  {
    id: 'conformity',
    image: 'cert-03',
    pages: 3,
    kind: 'certificate',
    title: { uz: 'Muvofiqlik sertifikati', ru: 'Сертификат соответствия', en: 'Certificate of conformity' },
    issuer: {
      uz: 'O‘zbekiston milliy sertifikatlashtirish tizimi · № UZ.SMT-01-0098-29657',
      ru: 'Национальная система сертификации РУз · № UZ.SMT-01-0098-29657',
      en: 'National Certification System of Uzbekistan · No. UZ.SMT-01-0098-29657',
    },
    valid: { uz: '2029-yilgacha', ru: 'до 2029 г.', en: 'valid to 2029' },
  },
  {
    id: 'iso-9001',
    image: 'cert-04',
    pages: 11,
    kind: 'certificate',
    title: { uz: 'ISO 9001:2015', ru: 'ISO 9001:2015', en: 'ISO 9001:2015' },
    issuer: {
      uz: 'Sifat menejmenti tizimi · ASTRAIA Certification',
      ru: 'Система менеджмента качества · ASTRAIA Certification',
      en: 'Quality management system · ASTRAIA Certification',
    },
    valid: { uz: '2027-yilgacha', ru: 'до 2027 г.', en: 'valid to 2027' },
  },
  {
    id: 'standard',
    image: 'cert-05',
    pages: 23,
    kind: 'document',
    title: { uz: 'Tashkilot standarti', ru: 'Стандарт организации', en: 'Company standard' },
    issuer: {
      uz: 'Ts 24390170-001:2023 · Alyuminiy kompozit panellar. Texnik shartlar',
      ru: 'Ts 24390170-001:2023 · Панели алюминиевые композитные. ТУ',
      en: 'Ts 24390170-001:2023 · Aluminium composite panels. Specifications',
    },
    valid: { uz: '', ru: '', en: '' },
  },
  {
    id: 'registration-2025',
    image: 'cert-06',
    pages: 1,
    kind: 'document',
    title: {
      uz: 'Davlat ro‘yxatidan o‘tganlik guvohnomasi',
      ru: 'Свидетельство о государственной регистрации',
      en: 'State registration certificate',
    },
    issuer: { uz: '«GOLDEN HAPPINESS» MChJ · 2025', ru: 'ООО «GOLDEN HAPPINESS» · 2025', en: 'GOLDEN HAPPINESS LLC · 2025' },
    valid: { uz: '', ru: '', en: '' },
  },
  {
    id: 'registration',
    image: 'cert-07',
    pages: 1,
    kind: 'document',
    title: {
      uz: 'Davlat ro‘yxatidan o‘tganlik guvohnomasi',
      ru: 'Свидетельство о государственной регистрации',
      en: 'State registration certificate',
    },
    issuer: {
      uz: '«GOLDEN HAPPINESS» MChJ · Uchtepa tumani',
      ru: 'ООО «GOLDEN HAPPINESS» · Учтепинский район',
      en: 'GOLDEN HAPPINESS LLC · Uchtepa district',
    },
    valid: { uz: '', ru: '', en: '' },
  },
  {
    id: 'trademark-alstar',
    image: 'cert-08',
    pages: 6,
    kind: 'patent',
    title: { uz: 'Tovar belgisi guvohnomasi', ru: 'Свидетельство на товарный знак', en: 'Trademark certificate' },
    issuer: {
      uz: 'O‘zbekiston Adliya vazirligi · № MGU 45892',
      ru: 'Министерство юстиции РУз · № MGU 45892',
      en: 'Ministry of Justice of Uzbekistan · No. MGU 45892',
    },
    valid: { uz: '2031-yilgacha', ru: 'до 2031 г.', en: 'valid to 2031' },
  },
  {
    id: 'trademark-45639',
    image: 'cert-09',
    pages: 3,
    kind: 'patent',
    title: { uz: 'Tovar belgisi guvohnomasi', ru: 'Свидетельство на товарный знак', en: 'Trademark certificate' },
    issuer: {
      uz: 'O‘zbekiston Adliya vazirligi · № MGU 45639',
      ru: 'Министерство юстиции РУз · № MGU 45639',
      en: 'Ministry of Justice of Uzbekistan · No. MGU 45639',
    },
    valid: { uz: '2031-yilgacha', ru: 'до 2031 г.', en: 'valid to 2031' },
  },
  {
    id: 'trademark-45642',
    image: 'cert-10',
    pages: 3,
    kind: 'patent',
    title: { uz: 'Tovar belgisi guvohnomasi', ru: 'Свидетельство на товарный знак', en: 'Trademark certificate' },
    issuer: {
      uz: 'O‘zbekiston Adliya vazirligi · № MGU 45642',
      ru: 'Министерство юстиции РУз · № MGU 45642',
      en: 'Ministry of Justice of Uzbekistan · No. MGU 45642',
    },
    valid: { uz: '2031-yilgacha', ru: 'до 2031 г.', en: 'valid to 2031' },
  },
];
