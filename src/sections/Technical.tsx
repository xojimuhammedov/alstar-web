import { Arrow, Button, delay, Img, SectionHead } from '../components/ui';
import type { ImageName } from '../config/images';
import { defaultLocale, useI18n } from '../i18n';
import { pageHref } from '../routes';

export function Technical() {
  const { t, locale } = useI18n();
  const center = pageHref(locale, { page: 'technical' });
  const href: Record<string, string> = {
    datasheets: `${center}#datasheets`,
    installation: locale === defaultLocale ? pageHref(locale, { page: 'installation' }) : `${center}#installation`,
    certificates: '#certificates',
    // Opens the fire-safety certificate in the carousel below.
    fire: '#cert-fire-b1',
    downloads: `${center}#downloads`,
  };
  return (
    <section className="section alt" id="technical" aria-labelledby="technical-title">
      <div className="container">
        <SectionHead index="06" title={t.technical.title} titleId="technical-title">
          <div className="right">
            <p className="small-copy">
              {t.technical.aside[0]}
              <br />
              {t.technical.aside[1]}
            </p>
            <Button href={center}>{t.technical.cta}</Button>
          </div>
        </SectionHead>
        <div className="tech-grid">
          {t.technical.items.map((item, i) => (
            <article className="tech-card reveal" style={delay(i * 90)} key={item.id}>
              <div className="tech-visual">
                <Img name={`tech-${item.id}` as ImageName} alt="" sizes="112px" />
              </div>
              <div className="tech-body">
                <h3>{item.title}</h3>
                <a href={href[item.id] ?? center}>
                  {t.technical.open} <span className="sr-only">— {item.title}</span>
                  <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
