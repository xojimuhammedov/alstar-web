// JSON-LD structured data (schema.org). Helps Google rich results and gives AI
// search engines (ChatGPT, Perplexity, Gemini, Claude) unambiguous facts.
import { site } from '../config/site';
import { articleBySlug } from '../content/articles';
import { imageSet } from '../config/images';
import { getDictionary, localeInfo, localePath, type Locale } from '../i18n';
import { routePath, stripBase, type Route } from '../routes';
import { pageMeta } from './head';

const abs = (path: string) => `${site.url}${path}`;

export function buildSchema(locale: Locale, route: Route = { page: 'home' }) {
  const t = getDictionary(locale);
  const pageUrl = abs(routePath(locale, route));
  const meta = pageMeta(locale, route);
  const orgId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const { address, geo } = site;
  const hasAddress = Boolean(address.street || address.city);

  const organization = {
    // LocalBusiness needs a postal address to be valid, so it is only added once one is configured.
    '@type': hasAddress ? ['Organization', 'LocalBusiness'] : 'Organization',
    '@id': orgId,
    name: site.name,
    legalName: site.legalName,
    alternateName: ['ALSTAR ACP', 'ALSTAR Aluminium Composite Panel'],
    url: site.url,
    logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
    image: abs('/og-image.jpg'),
    description: t.meta.description,
    foundingDate: String(site.foundingYear),
    email: site.email,
    telephone: site.phones[0],
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: site.stats.team },
    areaServed: site.areaServed.map((code) => ({ '@type': 'Country', identifier: code })),
    knowsAbout: [
      'Aluminium composite panels',
      'ACP',
      'Alucobond',
      'Ventilated façades',
      'Fire-retardant façade cladding',
      'Architectural façade materials',
    ],
    contactPoint: site.phones.map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone,
      email: site.email,
      contactType: 'sales',
      areaServed: 'UZ',
      availableLanguage: ['uz', 'ru', 'en'],
    })),
    ...(hasAddress && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.street,
        addressLocality: address.city,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
    }),
    ...(geo && { geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng } }),
    ...(site.sameAs.length > 0 && { sameAs: site.sameAs }),
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: site.name,
    publisher: { '@id': orgId },
    inLanguage: Object.values(localeInfo).map((l) => l.hreflang),
  };

  const webpage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: meta.title,
    description: meta.description,
    inLanguage: localeInfo[locale].hreflang,
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId },
    primaryImageOfPage: meta.image.url,
  };

  if (route.page !== 'home') {
    const home = abs(localePath(locale));
    const crumbs = [{ name: t.nav.homeShort, url: home }];
    if (route.page === 'article') crumbs.push({ name: t.articles.title, url: abs(routePath(locale, { page: 'articles' })) });
    if (route.page === 'installation') crumbs.push({ name: t.nav.technical, url: abs(routePath(locale, { page: 'technical' })) });
    crumbs.push({ name: meta.title, url: pageUrl });
    const breadcrumb = {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
    };
    const graph: object[] = [organization, website, { ...webpage, breadcrumb: { '@id': breadcrumb['@id'] } }, breadcrumb];
    const article = route.page === 'article' ? articleBySlug(route.slug) : undefined;
    if (article) {
      graph.push({
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: article.title,
        description: article.metaDescription,
        image: abs(stripBase(imageSet(article.image).src)),
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: localeInfo[locale].hreflang,
        articleSection: article.category,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        author: { '@id': orgId },
        publisher: { '@id': orgId },
      });
    }
    return { '@context': 'https://schema.org', '@graph': graph };
  }

  const products = {
    '@type': 'ItemList',
    '@id': `${pageUrl}#products`,
    name: t.products.title,
    itemListElement: t.products.items.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        '@id': `${pageUrl}#product-${p.id}`,
        name: `${site.name} ${p.name}`,
        description: `${p.desc} ${p.spec}.`,
        category: 'Aluminium composite panel',
        material: 'Aluminium',
        image: abs(`/images/product-${p.id}-840.webp`),
        brand: { '@type': 'Brand', name: site.name },
        manufacturer: { '@id': orgId },
      },
    })),
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    inLanguage: localeInfo[locale].hreflang,
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return { '@context': 'https://schema.org', '@graph': [organization, website, webpage, products, faq] };
}
