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

export const site = {
  name: 'ALSTAR',
  /** TODO: official registered company name (e.g. "ALSTAR" MChJ / ООО) */
  legalName: 'ALSTAR',
  tagline: 'Aluminium Composite Panel',
  /** Production URL without trailing slash. Override with VITE_SITE_URL at build time. */
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://alstar.uz').replace(/\/$/, ''),
  email: 'info@alstar.uz',
  phones: ['+998 77 000 87 00', '+998 77 000 89 00'],
  foundingYear: 2013,
  /**
   * TODO: fill in the real address and coordinates. Empty fields are left out of
   * the structured data and geo meta tags, so nothing invented is published.
   */
  address: {
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'UZ',
  } satisfies PostalAddress,
  geo: null as null | { lat: number; lng: number },
  /** ISO 3166-2 region code for the geo.region meta tag, e.g. "UZ-TO" (Tashkent region) */
  geoRegion: 'UZ',
  /** TODO: official social profiles (Instagram, Telegram, Facebook, LinkedIn, YouTube) */
  sameAs: [] as string[],
  areaServed: ['UZ', 'KZ', 'KG', 'TJ', 'TM'],
  stats: {
    years: 40,
    facilityM2: 20000,
    projects: 1837,
    team: 130,
  },
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
