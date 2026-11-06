// Server entry used only at build time by scripts/prerender.mjs.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { site } from './config/site';
import { defaultLocale, getDictionary, localeInfo, localePath, locales, type Locale } from './i18n';
import { renderHead } from './seo/head';

export { defaultLocale, getDictionary, localeInfo, localePath, locales, site };

export function render(locale: Locale) {
  return {
    lang: localeInfo[locale].hreflang,
    head: renderHead(locale),
    html: renderToString(
      <StrictMode>
        <App locale={locale} />
      </StrictMode>,
    ),
  };
}
