import { site } from '../config/site';
import {useI18n } from '../i18n';
import { localeHref } from '../routes';

export function Brand() {
  const { t, locale } = useI18n();
  return (
    <a className="brand" href={localeHref(locale)} aria-label={t.nav.home}>
      <strong>{site.name}</strong>
      <span aria-hidden="true">{site.tagline.toUpperCase()}</span>
    </a>
  );
}
