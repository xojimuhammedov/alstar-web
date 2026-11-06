import { Arrow, Button, delay, Img, SectionHead } from '../components/ui';
import type { ImageName } from '../config/images';
import { useI18n } from '../i18n';

export function Technical() {
  const { t } = useI18n();
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
            <Button href="#contact">{t.technical.cta}</Button>
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
                <a href="#contact">
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
