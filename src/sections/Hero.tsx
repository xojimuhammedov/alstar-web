import { useRef, type PointerEvent } from 'react';
import { Button, delay, Img } from '../components/ui';
import { site } from '../config/site';
import { formatNumber } from '../hooks/useCountUp';
import { prefersReducedMotion, useScrollFrame } from '../hooks/useScrollFrame';
import { useI18n } from '../i18n';

export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { stats } = site;

  useScrollFrame((reduced) => {
    if (reduced || !bgRef.current) return;
    const p = Math.min(1, Math.max(0, window.scrollY / 800));
    bgRef.current.style.transform = `scale(${(1.04 - 0.02 * p).toFixed(3)}) translateY(${(-35 * p).toFixed(1)}px)`;
  });

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  const specs = [
    { value: `${stats.years}+`, label: t.stats.years },
    { value: formatNumber(stats.facilityM2), label: t.stats.facility },
    { value: formatNumber(stats.projects), label: t.stats.projects },
    { value: `${stats.team}+`, label: t.stats.team },
  ];

  return (
    <section className="hero" ref={sectionRef} onPointerMove={onPointerMove} aria-labelledby="hero-title">
      <div className="hero-bg" ref={bgRef}>
        <Img name="hero-facade" alt={t.hero.imageAlt} sizes="100vw" priority />
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-sweep" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />
      <div className="hero-side-index" aria-hidden="true">
        <span className="active">01</span>
        <span className="dot" />
        <span>02</span>
        <span className="dot" />
        <span>03</span>
        <span className="dot" />
        <span>04</span>
      </div>

      <div className="hero-content">
        {/* The kicker is part of the h1 so the main heading carries the product keyword. */}
        <h1 id="hero-title">
          <span className="hero-kicker reveal">
            <span className="hero-pulse" aria-hidden="true" />
            {t.hero.kicker}
          </span>
          <span className="hero-title reveal" style={delay(120)}>
            {t.hero.title.map((line, i) => (
              <span key={i} className={i === t.hero.accentLine ? 'accent' : undefined}>
                {line}{' '}
              </span>
            ))}
          </span>
        </h1>
        <p className="hero-copy reveal" style={delay(220)}>
          {t.hero.copy}
        </p>
        <div className="hero-meta reveal" style={delay(320)}>
          <Button variant="red" href="#products">
            {t.hero.primary}
          </Button>
          <Button href="#why">{t.hero.secondary}</Button>
          <span className="hero-status">{t.hero.status}</span>
        </div>
      </div>

      <div className="hero-orbit" aria-hidden="true">
        <span>
          {t.hero.orbit[0]}
          <br />
          {t.hero.orbit[1]}
        </span>
      </div>
      <div className="hero-rail" aria-hidden="true">
        {t.hero.rail}
      </div>
      <dl className="hero-specs">
        {specs.map((s) => (
          <div className="hero-spec" key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
