import type { Dictionary } from '../i18n';

type NavKey = 'about' | 'products' | 'colours' | 'projects' | 'news' | 'technical' | 'faq' | 'contact';

const sections: { key: NavKey; href: string }[] = [
  { key: 'about', href: '#why' },
  { key: 'products', href: '#products' },
  { key: 'colours', href: '#colours' },
  { key: 'projects', href: '#projects' },
  { key: 'news', href: '#news' },
  { key: 'technical', href: '#technical' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
];

/** Header shows everything except FAQ (kept to the footer and mobile menu to save space). */
export const navItems = (t: Dictionary, { withFaq = true } = {}) =>
  sections.filter((s) => withFaq || s.key !== 'faq').map((s) => ({ href: s.href, label: t.nav[s.key] }));
