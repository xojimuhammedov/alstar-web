import type { Dictionary, Locale } from '../i18n';
import { homeAnchor, routePath } from '../routes';

type NavKey = 'about' | 'products' | 'colours' | 'projects' | 'news' | 'factory' | 'technical' | 'faq' | 'contact';

/** Home-page sections are linked as "/<locale>/#id" so the menu also works from sub-pages. */
const sections: { key: NavKey; href: (l: Locale) => string }[] = [
  { key: 'about', href: (l) => homeAnchor(l, 'why') },
  { key: 'products', href: (l) => homeAnchor(l, 'products') },
  { key: 'colours', href: (l) => homeAnchor(l, 'colours') },
  { key: 'projects', href: (l) => homeAnchor(l, 'projects') },
  { key: 'news', href: (l) => homeAnchor(l, 'news') },
  { key: 'factory', href: (l) => routePath(l, { page: 'factory' }) },
  { key: 'technical', href: (l) => homeAnchor(l, 'technical') },
  { key: 'faq', href: (l) => homeAnchor(l, 'faq') },
  { key: 'contact', href: (l) => homeAnchor(l, 'contact') },
];

/** Header shows everything except FAQ (kept to the footer and mobile menu to save space). */
export const navItems = (t: Dictionary, locale: Locale, { withFaq = true } = {}) =>
  sections
    .filter((s) => withFaq || s.key !== 'faq')
    .map((s) => ({ key: s.key, href: s.href(locale), label: t.nav[s.key] }));
