// Builds the <head> tags for one locale. Rendered into the static HTML at
// build time (scripts/prerender.mjs), so crawlers get everything without JS.
import { site } from '../config/site';
import { defaultLocale, getDictionary, localeInfo, localePath, locales, type Locale } from '../i18n';
import { buildSchema } from './schema';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** JSON inside <script> must not be able to close the tag. */
const safeJson = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export function renderHead(locale: Locale): string {
  const t = getDictionary(locale);
  const url = `${site.url}${localePath(locale)}`;
  const ogImage = `${site.url}/og-image.jpg`;
  const { address, geo } = site;
  const placename = [address.city, 'Uzbekistan'].filter(Boolean).join(', ');

  const tags = [
    `<title>${esc(t.meta.title)}</title>`,
    `<meta name="description" content="${esc(t.meta.description)}">`,
    `<meta name="keywords" content="${esc(t.meta.keywords)}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<meta name="author" content="${site.name}">`,
    `<link rel="canonical" href="${url}">`,

    // Language alternates — tells Google which URL to show for uz / ru / en searchers.
    ...locales.map(
      (l) => `<link rel="alternate" hreflang="${localeInfo[l].hreflang}" href="${site.url}${localePath(l)}">`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${site.url}${localePath(defaultLocale)}">`,

    // Open Graph (Telegram, Facebook, LinkedIn, WhatsApp previews)
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${site.name}">`,
    `<meta property="og:title" content="${esc(t.meta.title)}">`,
    `<meta property="og:description" content="${esc(t.meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(t.meta.ogImageAlt)}">`,
    `<meta property="og:locale" content="${localeInfo[locale].ogLocale}">`,
    ...locales
      .filter((l) => l !== locale)
      .map((l) => `<meta property="og:locale:alternate" content="${localeInfo[l].ogLocale}">`),

    // Twitter / X
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(t.meta.title)}">`,
    `<meta name="twitter:description" content="${esc(t.meta.description)}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
    `<meta name="twitter:image:alt" content="${esc(t.meta.ogImageAlt)}">`,

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

    `<script type="application/ld+json">${safeJson(buildSchema(locale))}</script>`,
  ];

  return tags.join('\n    ');
}
