// Static site generation: renders every locale to its own HTML file so search
// engines and AI crawlers receive complete content and meta tags without
// running JavaScript. Also writes sitemap.xml, robots.txt and llms.txt.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server/entry-server.js');

const { render, locales, localePath, localeInfo, defaultLocale, getDictionary, site, allRoutes, routePath } = await import(
  pathToFileURL(serverEntry).href
);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

// 1. One HTML file per page and locale: /, /ru/, /loyihalar/, /maqolalar/<slug>/, …
const pages = allRoutes();
for (const { locale, route } of pages) {
  const { lang, head, html } = render(locale, route);
  const page = template
    .replace('<!--app-lang-->', lang)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);
  const url = routePath(locale, route);
  const dir = path.join(dist, url);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), page);
  console.log(`✓ ${url}index.html (${lang})`);
}

// 2. sitemap.xml with hreflang alternates (only between languages a page exists in)
const key = (route) => JSON.stringify(route);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(({ locale, route }) => {
    const langs = pages.filter((p) => key(p.route) === key(route)).map((p) => p.locale);
    const alternates =
      langs.length > 1
        ? langs
            .map((l) => `    <xhtml:link rel="alternate" hreflang="${localeInfo[l].hreflang}" href="${site.url}${routePath(l, route)}"/>`)
            .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${site.url}${routePath(defaultLocale, route)}"/>`)
            .join('\n') + '\n'
        : '';
    const home = route.page === 'home';
    return `  <url>
    <loc>${site.url}${routePath(locale, route)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${home || route.page === 'articles' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${home ? (locale === defaultLocale ? '1.0' : '0.9') : '0.7'}</priority>
${alternates}  </url>`;
  })
  .join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log('✓ sitemap.xml');

// 3. robots.txt — AI crawlers are allowed explicitly (GEO): being readable by
// ChatGPT, Claude, Perplexity and Gemini lets them cite ALSTAR in answers.
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'YandexBot'];
const robots = process.env.VITE_NOINDEX === '1' ? `User-agent: *\nDisallow: /\n` : `User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${site.url}/sitemap.xml
`;
await writeFile(path.join(dist, 'robots.txt'), robots);
console.log('✓ robots.txt');

// 4. llms.txt (https://llmstxt.org) — a plain-language brief for AI assistants.
const en = getDictionary('en');
const llms = `# ${site.name}

> ${en.meta.description}

${site.name} has manufactured aluminium composite panels (ACP, also known as "alucobond") in Uzbekistan since ${site.foundingYear}.${site.stats.facilityM2 ? ` Production facility: ${site.stats.facilityM2.toLocaleString('en-US')} m².` : ''}${site.stats.projects ? ` Projects completed: ${site.stats.projects.toLocaleString('en-US')}.` : ''} Team: ${site.stats.team}+ people.

## Products

${en.products.items.map((p) => `- **${p.name}** (${p.type}): ${p.desc} ${p.spec}.`).join('\n')}

## Finishes

${en.colours.items.map((c) => c.name).join(', ')}.

## Frequently asked questions

${en.faq.items.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## Contact

- Phone: ${site.phones.join(', ')}
- Email: ${site.email}
- Website: ${site.url}

## Pages

${locales.map((l) => `- [${localeInfo[l].name}](${site.url}${localePath(l)})`).join('\n')}
- [Products and specification](${site.url}${routePath('en', { page: 'products' })})
- [Technical center](${site.url}${routePath('en', { page: 'technical' })})
- [Installation guide (Uzbek)](${site.url}${routePath('uz', { page: 'installation' })})
- [Projects](${site.url}${routePath('en', { page: 'projects' })})
- [Coating plant](${site.url}${routePath('en', { page: 'factory' })})
- [Articles (Uzbek)](${site.url}${routePath('uz', { page: 'articles' })})
`;
await writeFile(path.join(dist, 'llms.txt'), llms);
console.log('✓ llms.txt');

await rm(path.join(root, 'dist-server'), { recursive: true, force: true });
