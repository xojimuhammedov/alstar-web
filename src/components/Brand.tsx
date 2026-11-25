import { site } from '../config/site';
import { localePath, useI18n } from '../i18n';

export function Brand() {
  const { t, locale } = useI18n();
  return (
    <a className="brand" href={localePath(locale)} aria-label={t.nav.home}>
      <strong>{site.name}</strong>
      <span aria-hidden="true">{site.tagline.toUpperCase()}</span>
    </a>
  );
}
