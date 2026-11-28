// Single source of truth for company data (NAP: name, address, phone).
// Used by the UI, the meta tags, JSON-LD, sitemap, robots.txt and llms.txt —
// keep it accurate: search engines and AI assistants cross-check these facts.

export interface PostalAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2 */
  country: string;
}

import type { Locale } from '../i18n';

export type SocialId = 'instagram' | 'telegram' | 'facebook' | 'youtube' | 'whatsapp';

// Contacts below are taken from the current alstar.uz site (header, /contact and
// /branch pages), checked on 28 Nov 2026.
export const site = {
  name: 'ALSTAR',
  /** alstar.uz: "ALSTAR — бренд …, принадлежащий ООО “GOLDEN HAPPINESS”". */
  legalName: '“GOLDEN HAPPINESS” MChJ',
  tagline: 'Aluminium Composite Panel',
  /** Production URL without trailing slash. Override with VITE_SITE_URL at build time. */
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://alstar.uz').replace(/\/$/, ''),
  email: 'info@alstar.uz',
  phones: ['+998 77 000 87 00', '+998 77 000 89 00'],
  foundingYear: 2013,
  /** Head office (alstar.uz/branch: "Улица Изза, 59, Ташкент"). Empty fields are left out of structured data. */
  address: {
    street: 'Izza ko‘chasi, 59',
    city: 'Toshkent',
    region: 'Toshkent',
    postalCode: '',
    country: 'UZ',
  } satisfies PostalAddress,
  /** Head office address as shown on the page, per language. */
  addressText: {
    uz: 'Toshkent sh., Izza ko‘chasi, 59',
    ru: 'г. Ташкент, ул. Изза, 59',
    en: '59 Izza Street, Tashkent, Uzbekistan',
  } satisfies Record<Locale, string>,
  /** Kazakhstan branch (alstar.uz/branch). */
  branchText: {
    uz: 'Qozog‘iston, Turkiston viloyati, Shymkent sh., 226-kvartal',
    ru: 'Казахстан, Туркестанская обл., г. Шымкент, 226 квартал',
    en: 'Block 226, Shymkent, Turkistan Region, Kazakhstan',
  } satisfies Record<Locale, string>,
  /** From the Google Maps embed on alstar.uz/contact. */
  geo: { lat: 41.278252, lng: 69.146433 } as null | { lat: number; lng: number },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=41.278252%2C69.146433',
  /** ISO 3166-2 region code for the geo.region meta tag (UZ-TK = Tashkent city) */
  geoRegion: 'UZ-TK',
  socials: [
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/alstar.uz' },
    { id: 'telegram', label: 'Telegram', url: 'https://t.me/AlstarDibond' },
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61553429155300' },
    { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@uzbekistanalstar4978' },
    { id: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/998770008700' },
  ] as { id: SocialId; label: string; url: string }[],
  /** Official profiles for JSON-LD (WhatsApp is a chat link, not a profile). */
  sameAs: [
    'https://www.instagram.com/alstar.uz',
    'https://t.me/AlstarDibond',
    'https://www.facebook.com/profile.php?id=61553429155300',
    'https://www.youtube.com/@uzbekistanalstar4978',
  ] as string[],
  areaServed: ['UZ', 'KZ', 'KG', 'TJ', 'TM'],
  /**
   * `null` = not confirmed yet: the figure is hidden everywhere (hero, "Why
   * ALSTAR", JSON-LD, llms.txt) until the client confirms it.
   * - facilityM2: the source gives "50 000 000+ m²", but it is unclear whether it
   *   means facility area, total panels produced or yearly capacity.
   * - projects: no confirmed count yet.
   */
  stats: {
    years: 13,
    facilityM2: null as number | null,
    projects: null as number | null,
    team: 100,
  },
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
