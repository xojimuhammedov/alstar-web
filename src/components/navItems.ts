import type { Dictionary, Locale } from '../i18n';
import { anchorHref, pageHref } from '../routes';

type NavKey = 'about' | 'products' | 'colours' | 'projects' | 'news' | 'factory' | 'technical' | 'faq' | 'contact';

/** Home-page sections are linked as "/<locale>/#id" so the menu also works from sub-pages. */
const sections: { key: NavKey; href: (l: Locale) => string }[] = [
  { key: 'about', href: (l) => anchorHref(l, 'why') },
  { key: 'products', href: (l) => anchorHref(l, 'products') },
  { key: 'colours', href: (l) => anchorHref(l, 'colours') },
  { key: 'projects', href: (l) => anchorHref(l, 'projects') },
  { key: 'news', href: (l) => anchorHref(l, 'news') },
  { key: 'factory', href: (l) => pageHref(l, { page: 'factory' }) },
  { key: 'technical', href: (l) => anchorHref(l, 'technical') },
  { key: 'faq', href: (l) => anchorHref(l, 'faq') },
  { key: 'contact', href: (l) => anchorHref(l, 'contact') },
];

/** Header shows everything except FAQ (kept to the footer and mobile menu to save space). */
export const navItems = (t: Dictionary, locale: Locale, { withFaq = true } = {}) =>
  sections
    .filter((s) => withFaq || s.key !== 'faq')
    .map((s) => ({ key: s.key, href: s.href(locale), label: t.nav[s.key] }));
