import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { getDictionary, localeFromPath, localeInfo } from './i18n';
import './styles/global.css';

const locale = localeFromPath(window.location.pathname);
const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
);

if (root.hasChildNodes()) {
  // Production: the page was pre-rendered at build time — attach to it.
  hydrateRoot(root, app);
} else {
  // Dev server: no pre-rendered markup, render from scratch.
  document.documentElement.lang = localeInfo[locale].hreflang;
  document.title = getDictionary(locale).meta.title;
  createRoot(root).render(app);
}
