// Page routes. The site is pre-rendered, so every route here becomes a static
// HTML file (see scripts/prerender.mjs). No router library: the server/HTML file
// decides the page, React only hydrates it.
import { createContext, useContext } from 'react';
import { articles } from './content/articles';
import { defaultLocale, localePath, locales, type Locale } from './i18n';

export type Route =
  | { page: 'home' }
  | { page: 'projects' }
  | { page: 'factory' }
  | { page: 'articles' }
  | { page: 'article'; slug: string };

/** URL segment per page (shared by all locales). */
export const segments = {
  projects: 'loyihalar',
  factory: 'boyoq-zavodi',
  articles: 'maqolalar',
} as const;

/** Articles are written in Uzbek only, so their pages exist for the default locale only. */
export const routeExists = (locale: Locale, route: Route) =>
  !(route.page === 'articles' || route.page === 'article') || locale === defaultLocale;

export function routePath(locale: Locale, route: Route): string {
  const base = localePath(locale);
  switch (route.page) {
    case 'home':
      return base;
    case 'article':
      return `${base}${segments.articles}/${route.slug}/`;
    default:
      return `${base}${segments[route.page]}/`;
  }
}

/** Link to a section of the home page, e.g. homeAnchor('ru', 'contact') → "/ru/#contact". */
export const homeAnchor = (locale: Locale, id: string) => `${localePath(locale)}#${id}`;

/** Deploy sub-path ("/" normally, "/alstar-web/" on GitHub Pages). Paths above are base-free. */
export const BASE = import.meta.env.BASE_URL;
export const withBase = (path: string) => `${BASE}${path.replace(/^\//, '')}`;
/** Base-free path of a URL path that includes the deploy sub-path. */
export const stripBase = (path: string) => (path.startsWith(BASE) ? `/${path.slice(BASE.length)}` : path);

/** Link targets for <a href> — the same paths with the deploy sub-path added. */
export const localeHref = (locale: Locale) => withBase(localePath(locale));
export const pageHref = (locale: Locale, route: Route) => withBase(routePath(locale, route));
export const anchorHref = (locale: Locale, id: string) => withBase(homeAnchor(locale, id));

export function parseRoute(pathname: string): { locale: Locale; route: Route } {
  const parts = stripBase(pathname).split('/').filter(Boolean);
  let locale: Locale = defaultLocale;
  if ((locales as readonly string[]).includes(parts[0])) locale = parts.shift() as Locale;
  const [first, second] = parts;
  let route: Route = { page: 'home' };
  if (first === segments.projects) route = { page: 'projects' };
  else if (first === segments.factory) route = { page: 'factory' };
  else if (first === segments.articles) route = second ? { page: 'article', slug: second } : { page: 'articles' };
  return { locale, route: routeExists(locale, route) ? route : { page: 'home' } };
}

export const RouteContext = createContext<Route>({ page: 'home' });
export const useRoute = () => useContext(RouteContext);

/** Every page to pre-render. */
export function allRoutes(): { locale: Locale; route: Route }[] {
  const pages: Route[] = [
    { page: 'home' },
    { page: 'projects' },
    { page: 'factory' },
    { page: 'articles' },
    ...articles.map((a) => ({ page: 'article', slug: a.slug }) as Route),
  ];
  return locales.flatMap((locale) => pages.filter((r) => routeExists(locale, r)).map((route) => ({ locale, route })));
}
