// Builds the <head> tags for one page (locale + route). Rendered into the static HTML at
// build time (scripts/prerender.mjs), so crawlers get everything without JS.
import { site } from '../config/site';
import { articleBySlug } from '../content/articles';
import { installationGuide } from '../content/installation';
import { productsPage } from '../content/products';
import { technicalPage } from '../content/technical';
import { imageSet } from '../config/images';
import { defaultLocale, getDictionary, localeInfo, locales, type Locale } from '../i18n';
import { routeExists, routePath, stripBase, type Route } from '../routes';
import { buildSchema } from './schema';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** JSON inside <script> must not be able to close the tag. */
const safeJson = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export interface PageMeta {
  title: string;
  description: string;
  /** Absolute URL of the social preview image and its size. */
  image: { url: string; width: number; height: number; type: string };
  imageAlt: string;
  type: 'website' | 'article';
}

const defaultImage = { url: `${site.url}/og-image.jpg`, width: 1200, height: 630, type: 'image/jpeg' };

/** Title, description and preview image of a page. */
export function pageMeta(locale: Locale, route: Route): PageMeta {
  const t = getDictionary(locale);
  const base = { image: defaultImage, imageAlt: t.meta.ogImageAlt, type: 'website' as const };
  switch (route.page) {
    case 'products':
      return { ...base, title: productsPage[locale].metaTitle, description: productsPage[locale].metaDescription };
    case 'technical':
      return { ...base, title: technicalPage[locale].metaTitle, description: technicalPage[locale].metaDescription };
    case 'installation':
      return { ...base, title: installationGuide.seoTitle, description: installationGuide.metaDescription };
    case 'projects':
      return { ...base, title: t.projects.page.metaTitle, description: t.projects.page.metaDescription };
    case 'factory':
      return { ...base, title: t.factory.metaTitle, description: t.factory.metaDescription };
    case 'articles':
      return { ...base, title: t.articles.metaTitle, description: t.articles.metaDescription };
    case 'article': {
      const a = articleBySlug(route.slug);
      if (!a) break;
      const img = imageSet(a.image);
      return {
        title: a.seoTitle,
        description: a.metaDescription,
        image: { url: `${site.url}${stripBase(img.src)}`, width: img.width, height: img.height, type: 'image/webp' },
        imageAlt: a.imageAlt,
        type: 'article',
      };
    }
  }
  return { ...base, title: t.meta.title, description: t.meta.description };
}

export function renderHead(locale: Locale, route: Route): string {
  const t = getDictionary(locale);
  const meta = pageMeta(locale, route);
  const url = `${site.url}${routePath(locale, route)}`;
  const { address, geo } = site;
  const placename = [address.city, 'Uzbekistan'].filter(Boolean).join(', ');
  const langs = locales.filter((l) => routeExists(l, route));

  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    ...(route.page === 'home' ? [`<meta name="keywords" content="${esc(t.meta.keywords)}">`] : []),
    // Preview deploys (GitHub Pages) must not compete with the real domain in search.
    import.meta.env.VITE_NOINDEX === '1'
      ? `<meta name="robots" content="noindex, nofollow">`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<meta name="author" content="${site.name}">`,
    `<link rel="canonical" href="${url}">`,

    // Language alternates — only for languages this page exists in.
    ...(langs.length > 1
      ? [
          ...langs.map((l) => `<link rel="alternate" hreflang="${localeInfo[l].hreflang}" href="${site.url}${routePath(l, route)}">`),
          `<link rel="alternate" hreflang="x-default" href="${site.url}${routePath(defaultLocale, route)}">`,
        ]
      : []),

    // Open Graph (Telegram, Facebook, LinkedIn, WhatsApp previews)
    `<meta property="og:type" content="${meta.type}">`,
    `<meta property="og:site_name" content="${site.name}">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${meta.image.url}">`,
    `<meta property="og:image:type" content="${meta.image.type}">`,
    `<meta property="og:image:width" content="${meta.image.width}">`,
    `<meta property="og:image:height" content="${meta.image.height}">`,
    `<meta property="og:image:alt" content="${esc(meta.imageAlt)}">`,
    `<meta property="og:locale" content="${localeInfo[locale].ogLocale}">`,
    ...langs
      .filter((l) => l !== locale)
      .map((l) => `<meta property="og:locale:alternate" content="${localeInfo[l].ogLocale}">`),

    // Twitter / X
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
    `<meta name="twitter:image" content="${meta.image.url}">`,
    `<meta name="twitter:image:alt" content="${esc(meta.imageAlt)}">`,

    // Geo targeting (local SEO)
    `<meta name="geo.region" content="${site.geoRegion}">`,
    `<meta name="geo.placename" content="${esc(placename)}">`,
    ...(geo
      ? [
          `<meta name="geo.position" content="${geo.lat};${geo.lng}">`,
          `<meta name="ICBM" content="${geo.lat}, ${geo.lng}">`,
        ]
      : []),

    // Phone numbers stay plain text on iOS unless wrapped in tel: links.
    `<meta name="format-detection" content="telephone=no">`,

    // LLM-readable site summary (GEO): https://llmstxt.org
    `<link rel="alternate" type="text/markdown" title="LLM summary" href="${site.url}/llms.txt">`,

    `<script type="application/ld+json">${safeJson(buildSchema(locale, route))}</script>`,
  ];

  return tags.join('\n    ');
}
