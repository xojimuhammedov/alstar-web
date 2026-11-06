import { site } from '../config/site';
import { useI18n } from '../i18n';

export function Brand() {
  const { t } = useI18n();
  return (
    <a className="brand" href="#top" aria-label={t.nav.home}>
      <strong>{site.name}</strong>
      <span aria-hidden="true">{site.tagline.toUpperCase()}</span>
    </a>
  );
}
