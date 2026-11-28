import { useEffect, useState, type CSSProperties } from 'react';
import { PageHero } from '../components/PageHero';
import { Button, delay, Img } from '../components/ui';
import { lifeGallery, ralColours, series, type RalColour } from '../content/factory';
import { prefersReducedMotion } from '../hooks/useScrollFrame';
import { useI18n } from '../i18n';
import { anchorHref } from '../routes';
import { Cta } from '../sections/Cta';

/** Light colours need dark text on top of them. */
const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
};

const heroCycle = ['RAL 7016', 'RAL 3020', 'RAL 9006', 'RAL 5015', 'RAL 1021', 'RAL 9016'];

/** Face ring ellipse of the coil (the face is seen at an angle, so circles become ellipses). */
const FACE = { cx: 196, cy: 214, rx: 104, ry: 168 };
/** Depth of the coil: the back face sits up and to the right of the front face. */
const DEPTH = { x: 168, y: -34 };

/**
 * Aluminium coil in 3D (lying on its side) unrolling a painted strip.
 * Colour comes from the --coil custom property; the rings "spin" by moving their dashes.
 */
function Coil({ label }: { label: string }) {
  const { cx, cy, rx, ry } = FACE;
  const bx = cx + DEPTH.x;
  const by = cy + DEPTH.y;
  const rings = Array.from({ length: 15 }, (_, i) => 50 + i * 8);
  // Strip leaves the coil along its bottom edge and runs forward-right over the floor.
  const p1 = { x: cx + 8, y: cy + ry - 4 };
  const p2 = { x: bx + 4, y: by + ry - 2 };
  const L = { x: 250, y: 46 };
  const strip = `M${p1.x} ${p1.y} L${p2.x} ${p2.y} L${p2.x + L.x} ${p2.y + L.y} L${p1.x + L.x} ${p1.y + L.y} Z`;
  return (
    <svg className="coil" viewBox="0 0 660 470" role="img" aria-label={label}>
      <defs>
        <radialGradient id="coil-face" cx="42%" cy="36%" r="75%">
          <stop offset="0" stopColor="#f1f2f3" />
          <stop offset="0.5" stopColor="#a9abaf" />
          <stop offset="1" stopColor="#56585c" />
        </radialGradient>
        <linearGradient id="coil-body-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.28" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0.25" />
          <stop offset="1" stopColor="#000" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="coil-strip-shade" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="0.35" stopColor="#000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="coil-shine" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="coil-strip-clip">
          <path d={strip} />
        </clipPath>
      </defs>

      {/* floor shadow */}
      <ellipse cx={cx + 150} cy={cy + ry + 40} rx="250" ry="26" fill="#000" opacity="0.5" />

      {/* unrolled strip on the floor */}
      <g clipPath="url(#coil-strip-clip)">
        <path className="coil-fill" d={strip} />
        <path d={strip} fill="url(#coil-strip-shade)" />
        <rect className="coil-shine" x="-160" y={p1.y - 60} width="160" height="160" fill="url(#coil-shine)" />
      </g>
      <path d={`M${p1.x + L.x} ${p1.y + L.y} L${p2.x + L.x} ${p2.y + L.y}`} stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />

      {/* cylinder body: back face + the painted outer wrap */}
      <path
        className="coil-fill"
        d={`M${cx} ${cy - ry} L${bx} ${by - ry} A${rx} ${ry} 0 0 1 ${bx} ${by + ry} L${cx} ${cy + ry} Z`}
      />
      <path
        d={`M${cx} ${cy - ry} L${bx} ${by - ry} A${rx} ${ry} 0 0 1 ${bx} ${by + ry} L${cx} ${cy + ry} Z`}
        fill="url(#coil-body-shade)"
      />
      {/* wrap lines along the body */}
      {[0.22, 0.5, 0.78].map((k) => (
        <path
          key={k}
          d={`M${cx} ${cy - ry + 2 * ry * k} L${bx} ${by - ry + 2 * ry * k}`}
          stroke="rgba(0,0,0,.18)"
          strokeWidth="1"
        />
      ))}

      {/* front face: rolled aluminium layers */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#coil-face)" />
      <ellipse className="coil-paint" cx={cx} cy={cy} rx={rx - 3} ry={ry - 5} fill="none" strokeWidth="9" />
      <g className="coil-rings">
        {rings.map((r, i) => (
          <ellipse
            key={r}
            cx={cx}
            cy={cy}
            rx={(r * rx) / ry}
            ry={r}
            fill="none"
            stroke="rgba(30,32,35,.3)"
            strokeWidth="1"
            strokeDasharray={i % 2 ? '170 26' : '118 30 32 16'}
          />
        ))}
      </g>
      {/* core */}
      <ellipse cx={cx} cy={cy} rx={(44 * rx) / ry} ry="44" fill="#0b0c0d" />
      <ellipse cx={cx} cy={cy} rx={(44 * rx) / ry} ry="44" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="2" />
    </svg>
  );
}

/** Simple façade elevation whose cladding panels take the selected RAL colour. */
function FacadePreview({ colour, label }: { colour: RalColour; label: string }) {
  const cols = 6;
  const rows = 7;
  const w = 64;
  const h = 46;
  return (
    <svg className="facade" viewBox="0 0 420 380" role="img" aria-label={`${label}: ${colour.code}`} style={{ '--ral': colour.hex } as CSSProperties}>
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5f7d94" />
          <stop offset="0.5" stopColor="#1b2833" />
          <stop offset="1" stopColor="#0d141a" />
        </linearGradient>
        <linearGradient id="panel-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="420" height="380" fill="#16191c" />
      {Array.from({ length: rows }).flatMap((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const x = 18 + c * w;
          const y = 14 + r * h;
          // Window bands every other column on the middle rows.
          const glass = r > 0 && r < rows - 1 && c % 2 === 1;
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width={w - 4} height={h - 4} className={glass ? '' : 'facade-panel'} fill={glass ? 'url(#glass)' : undefined} />
              {!glass && <rect x={x} y={y} width={w - 4} height={h - 4} fill="url(#panel-light)" />}
            </g>
          );
        }),
      )}
      <rect x="0" y="340" width="420" height="40" fill="#0c0d0e" />
    </svg>
  );
}

export function FactoryPage() {
  const { t, locale } = useI18n();
  const f = t.factory;
  const [picked, setPicked] = useState<RalColour | null>(null);
  const [cycle, setCycle] = useState(0);
  const contact = anchorHref(locale, 'contact');

  // The hero coil cycles through a few colours until the visitor picks one.
  useEffect(() => {
    if (picked || prefersReducedMotion()) return;
    const id = window.setInterval(() => setCycle((i) => (i + 1) % heroCycle.length), 2600);
    return () => window.clearInterval(id);
  }, [picked]);

  const heroColour = picked ?? ralColours.find((c) => c.code === heroCycle[cycle])!;
  const selected = picked ?? ralColours.find((c) => c.code === 'RAL 7016')!;
  const groups = [...new Set(ralColours.map((c) => c.group))];

  return (
    <>
      <PageHero kicker={f.kicker} title={f.name} intro={f.slogan} crumbs={[{ label: t.nav.factory }]}>
        <div className="factory-hero-actions">
          <Button variant="red" href={contact}>
            {f.primary}
          </Button>
          <Button href="#ral">{f.secondary}</Button>
        </div>
        <div className="factory-hero-bg" aria-hidden="true">
          <Img name="why-facility" alt="" sizes="60vw" priority />
        </div>
        <div className="factory-coil" style={{ '--coil': heroColour.hex } as CSSProperties}>
          <Coil label={f.coil} />
          <span className="coil-tag">
            <i style={{ background: heroColour.hex }} aria-hidden="true" />
            {heroColour.code}
          </span>
        </div>
      </PageHero>

      <section className="section alt" aria-labelledby="factory-about">
        <div className="container factory-about">
          <div>
            <p className="eyebrow">01 /</p>
            <h2 className="title" id="factory-about">
              {f.aboutTitle}
            </h2>
            {f.about.map((p, i) => (
              <p className="factory-copy" key={i}>
                {p}
              </p>
            ))}
            <dl className="factory-facts">
              {f.facts.map((x) => (
                <div key={x.label}>
                  <dt>{x.label}</dt>
                  <dd>{x.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="media factory-photo reveal">
            <Img name="why-facility" alt={f.aboutAlt} sizes="(max-width: 1100px) 100vw, 55vw" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="factory-series">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">02 /</p>
              <h2 className="title" id="factory-series">
                {f.seriesTitle}
              </h2>
              <p className="small-copy section-intro">{f.seriesIntro}</p>
            </div>
          </div>
          <ul className="series-grid">
            {f.series.map((s, i) => {
              const img = series.find((x) => x.id === s.id);
              if (!img) return null;
              return (
                <li className="series-card reveal" key={s.id} style={delay((i % 3) * 90)}>
                  <div className="series-media">
                    <Img name={img.example} alt={f.exampleAlt.replace('{name}', s.name)} sizes="(max-width: 760px) 100vw, 33vw" />
                    <span className="series-life">{f.example}</span>
                    <span className="series-swatch">
                      <Img name={img.swatch} alt={f.swatchAlt.replace('{name}', s.name)} sizes="96px" />
                    </span>
                  </div>
                  <div className="series-body">
                    <span className="series-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{s.name}</h3>
                    <p>{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section alt" id="ral" aria-labelledby="factory-ral">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">03 /</p>
              <h2 className="title" id="factory-ral">
                {f.ralTitle}
              </h2>
              <p className="small-copy section-intro">{f.ralIntro}</p>
            </div>
          </div>
          <div className="ral-layout">
            <div className="ral-groups" role="group" aria-label={f.ralTitle}>
              {groups.map((g) => (
                <div className="ral-group" key={g}>
                  <h3>{f.ralGroups[g]}</h3>
                  <ul>
                    {ralColours
                      .filter((c) => c.group === g)
                      .map((c) => (
                        <li key={c.code}>
                          <button
                            type="button"
                            className="ral-chip"
                            aria-pressed={selected.code === c.code}
                            onClick={() => setPicked(c)}
                            style={{ background: c.hex, color: isLight(c.hex) ? '#111' : '#fff' }}
                          >
                            {c.code.replace('RAL ', '')}
                            <span className="sr-only"> — {c.code}</span>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <figure className="ral-preview">
              <FacadePreview colour={selected} label={f.preview} />
              <figcaption>
                <span className="ral-dot" style={{ background: selected.hex }} aria-hidden="true" />
                <span>
                  <small>{f.selected}</small>
                  <strong aria-live="polite">{selected.code}</strong>
                </span>
              </figcaption>
              <p className="ral-note">{f.ralNote}</p>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="factory-life">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">04 /</p>
              <h2 className="title" id="factory-life">
                {f.lifeTitle}
              </h2>
              <p className="small-copy section-intro">{f.lifeIntro}</p>
            </div>
          </div>
          <div className="life-grid">
            {lifeGallery.map((name, i) => (
              <div className={`life-item life-${i + 1} reveal`} key={name} style={delay(i * 80)}>
                <Img name={name} alt={f.lifeAlt} sizes="(max-width: 760px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
