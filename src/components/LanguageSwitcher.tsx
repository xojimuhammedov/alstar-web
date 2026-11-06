import { localeInfo, localePath, locales, useI18n } from '../i18n';

/** Plain links to the pre-rendered page of each language (crawlable, no JS needed). */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, t } = useI18n();
  return (
    <nav className={`lang-switch ${className}`.trim()} aria-label={t.nav.language}>
      {locales.map((l) => (
        <a
          key={l}
          href={localePath(l)}
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
