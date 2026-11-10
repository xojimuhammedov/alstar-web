import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { Button, delay, Img } from '../components/ui';
import { heroTitleParam, heroTitleVariants } from '../config/heroTitleVariants';
import { visibleStats } from '../config/stats';
import { formatNumber } from '../hooks/useCountUp';
import { prefersReducedMotion, useScrollFrame } from '../hooks/useScrollFrame';
import { useI18n } from '../i18n';

export function Hero() {
  const { t, locale } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Client preview of the candidate headlines (uz only): /?sarlavha=1…5.
  // Read after hydration so the pre-rendered HTML always carries the default title.
  const [variant, setVariant] = useState<number | null>(null);
  useEffect(() => {
    if (locale !== 'uz') return;
    const n = Number(new URLSearchParams(window.location.search).get(heroTitleParam));
    if (Number.isInteger(n) && n >= 1 && n <= heroTitleVariants.length) setVariant(n - 1);
  }, [locale]);
  const { title, accentLine } = variant === null ? t.hero : heroTitleVariants[variant];
  // The mobile title size is fitted to the longest word so no line is clipped.
  const longestWord = Math.max(...title.flatMap((line) => line.split(/\s+/)).map((w) => w.length));

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

  const specs = visibleStats(t);

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
          <span
            className="hero-title reveal"
            style={{ ...delay(120), '--longest-word': longestWord } as CSSProperties}
          >
            {title.map((line, i) => (
              <span key={i} className={i === accentLine ? 'accent' : undefined}>
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
      <dl className="hero-specs" style={{ '--spec-count': specs.length } as CSSProperties}>
        {specs.map((s) => (
          <div className="hero-spec" key={s.key}>
            <dt>{s.label}</dt>
            <dd>
              {formatNumber(s.value)}
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
