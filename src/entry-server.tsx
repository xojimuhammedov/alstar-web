// Server entry used only at build time by scripts/prerender.mjs.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { site } from './config/site';
import { defaultLocale, getDictionary, localeInfo, localePath, locales, type Locale } from './i18n';
import { allRoutes, routePath, type Route } from './routes';
import { renderHead } from './seo/head';

export { allRoutes, defaultLocale, getDictionary, localeInfo, localePath, locales, routePath, site };

export function render(locale: Locale, route: Route) {
  return {
    lang: localeInfo[locale].hreflang,
    head: renderHead(locale, route),
    html: renderToString(
      <StrictMode>
        <App locale={locale} route={route} />
      </StrictMode>,
    ),
  };
}
