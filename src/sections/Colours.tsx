import { Button, delay, Img, SectionHead } from '../components/ui';
import type { ImageName } from '../config/images';
import { useI18n } from '../i18n';

export function Colours() {
  const { t } = useI18n();
  return (
    <section className="section" id="colours" aria-labelledby="colours-title">
      <div className="container">
        <SectionHead index="03" title={t.colours.title} titleId="colours-title" intro={t.colours.copy}>
          <Button href="#contact">{t.colours.cta}</Button>
        </SectionHead>
        <ul className="colour-grid" role="list">
          {t.colours.items.map((c, i) => (
            <li className="colour reveal" style={delay((i % 4) * 70)} key={c.id}>
              <figure>
                <div className="colour-img">
                  <Img
                    name={`finish-${c.id}` as ImageName}
                    alt={`${c.name} ${t.colours.altSuffix}`}
                    sizes="(max-width: 1100px) 50vw, 25vw"
                  />
                </div>
                <figcaption className="colour-name">{c.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
