import { Button, delay, Img } from '../components/ui';
import { site } from '../config/site';
import { formatNumber, useCountUp } from '../hooks/useCountUp';
import { useI18n } from '../i18n';

export function Why() {
  const { t } = useI18n();
  const { stats } = site;
  const items = [
    { target: stats.years, suffix: '+', label: t.stats.years },
    { target: stats.facilityM2, suffix: '', label: t.stats.facility },
    { target: stats.projects, suffix: '', label: t.stats.projects },
    { target: stats.team, suffix: '+', label: t.stats.team },
  ];
  const { ref, values } = useCountUp<HTMLDListElement>(items.map((i) => i.target));

  return (
    <section className="section" id="why" aria-labelledby="why-title">
      <div className="container">
        <div className="why-grid">
          <div className="reveal">
            <div className="eyebrow" aria-hidden="true">
              01 /
            </div>
            <h2 className="title" id="why-title">
              {t.why.title}
            </h2>
            <p className="small-copy why-copy">{t.why.copy}</p>
            <Button href="#contact">{t.why.cta}</Button>
          </div>
          <div className="media reveal" style={delay(120)}>
            <Img name="why-facility" alt={t.why.imageAlt} sizes="(max-width: 1100px) 100vw, 60vw" />
            <div className="play" aria-hidden="true" />
          </div>
        </div>
        <dl className="stats reveal" ref={ref}>
          {items.map((item, i) => (
            <div className="stat" key={item.label}>
              <dt>{item.label}</dt>
              <dd className="num">
                {formatNumber(values[i])}
                {item.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
