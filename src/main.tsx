import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { localeInfo } from './i18n';
import { parseRoute } from './routes';
import { pageMeta } from './seo/head';
import './styles/global.css';

const { locale, route } = parseRoute(window.location.pathname);
const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App locale={locale} route={route} />
  </StrictMode>
);

// The dev template still holds the <!--app-html--> placeholder comment, so look for elements, not nodes.
if (root.firstElementChild) {
  // Production: the page was pre-rendered at build time — attach to it.
  hydrateRoot(root, app);
} else {
  // Dev server: no pre-rendered markup, render from scratch.
  document.documentElement.lang = localeInfo[locale].hreflang;
  document.title = pageMeta(locale, route).title;
  createRoot(root).render(app);
}
