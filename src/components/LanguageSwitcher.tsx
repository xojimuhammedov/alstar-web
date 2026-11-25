import { localeInfo, locales, useI18n } from '../i18n';
import { localeHref, pageHref, routeExists, useRoute } from '../routes';

/** Plain links to the pre-rendered page of each language (crawlable, no JS needed). */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, t } = useI18n();
  const route = useRoute();
  return (
    <nav className={`lang-switch ${className}`.trim()} aria-label={t.nav.language}>
      {locales.map((l) => (
        <a
          key={l}
          // Same page in the other language; Uzbek-only pages fall back to that language's home page.
          href={routeExists(l, route) ? pageHref(l, route) : localeHref(l)}
          hrefLang={localeInfo[l].hreflang}
          lang={localeInfo[l].hreflang}
          aria-current={l === locale ? 'page' : undefined}
          title={localeInfo[l].name}
        >
          {localeInfo[l].label}
        </a>
      ))}
    </nav>
  );
}
