import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { Img, SectionHead } from '../components/ui';
import { certificates, type Certificate } from '../content/certificates';
import { prefersReducedMotion } from '../hooks/useScrollFrame';
import { useI18n } from '../i18n';

const AUTOPLAY_MS = 3800;
const n = certificates.length;

/** Signed distance from the active slide, wrapped so the ring has no ends. */
const offsetOf = (i: number, active: number) => {
  let o = (i - active + n) % n;
  if (o > n / 2) o -= n;
  return o;
};

function slideStyle(o: number): CSSProperties {
  const a = Math.abs(o);
  return {
    transform: `translateX(${o * 58}%) translateZ(${-a * 150}px) rotateY(${o * -28}deg) scale(${1 - Math.min(a, 3) * 0.06})`,
    opacity: a > 3 ? 0 : 1 - a * 0.22,
    zIndex: 20 - a,
    filter: a ? `brightness(${0.75 - a * 0.1})` : undefined,
    pointerEvents: a > 3 ? 'none' : undefined,
  };
}

const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));

export function Certificates({ index }: { index: string }) {
  const { t, locale } = useI18n();
  const c = t.certificates;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; id: number } | null>(null);
  /** A swipe must not also count as a click on the card under the pointer. */
  const swiped = useRef(false);

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), []);
  const next = useCallback(() => setActive((a) => (a + 1) % n), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + n) % n), []);

  // Reduced motion: no autoplay; the user moves through the certificates themselves.
  useEffect(() => {
    if (prefersReducedMotion()) setPlaying(false);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && visible && !hovered && !open;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (!document.hidden) next();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [running, next, active]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else return;
    e.preventDefault();
  };

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onPointerUp = (e: PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    swiped.current = Math.abs(dx) > 8;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  const current = certificates[active];

  return (
    <section className="section certs" id="certificates" aria-labelledby="certificates-title">
      <div className="container">
        <SectionHead index={index} title={c.title} titleId="certificates-title" intro={c.intro} />

        <div
          className="cert-stage"
          ref={stageRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={c.title}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current = null)}
          onClickCapture={(e) => {
            if (!swiped.current) return;
            swiped.current = false;
            e.preventDefault();
            e.stopPropagation();
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <div className="cert-glow" aria-hidden="true" />
          <ul className="cert-track">
            {certificates.map((cert, i) => {
              const o = offsetOf(i, active);
              const isActive = o === 0;
              return (
                <li
                  key={cert.id}
                  className={`cert-slide ${isActive ? 'is-active' : ''}`}
                  style={slideStyle(o)}
                  aria-roledescription="slide"
                  aria-label={fill(c.slide, { n: i + 1, total: n })}
                  aria-hidden={!isActive}
                >
                  <button
                    type="button"
                    className="cert-card"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => (isActive ? setOpen(true) : go(i))}
                    aria-label={`${isActive ? c.open : ''} ${cert.title[locale]}`.trim()}
                  >
                    <span className="cert-paper">
                      <Img name={cert.image} alt="" sizes="(max-width: 760px) 64vw, 360px" />
                    </span>
                    <span className="cert-sheen" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="cert-info">
          <div className="cert-caption" aria-live="polite">
            <span className={`cert-kind kind-${current.kind}`}>{c.kinds[current.kind]}</span>
            <h3>{current.title[locale]}</h3>
            <p>
              {current.issuer[locale]}
              {current.valid[locale] && <span className="cert-valid"> · {current.valid[locale]}</span>}
            </p>
          </div>
          <div className="cert-controls">
            <button type="button" className="cert-btn" onClick={prev} aria-label={c.prev}>
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <ol className="cert-dots">
              {certificates.map((cert, i) => (
                <li key={cert.id}>
                  <button
                    type="button"
                    className={i === active ? 'is-active' : ''}
                    aria-current={i === active ? 'true' : undefined}
                    aria-label={`${fill(c.slide, { n: i + 1, total: n })}: ${cert.title[locale]}`}
                    onClick={() => go(i)}
                  >
                    {i === active && running && <span className="cert-progress" key={active} />}
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              className="cert-btn"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? c.pause : c.play}
              aria-pressed={!playing}
            >
              {playing ? <Pause size={15} strokeWidth={1.5} /> : <Play size={15} strokeWidth={1.5} />}
            </button>
            <button type="button" className="cert-btn" onClick={next} aria-label={c.next}>
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <CertificateDialog cert={current} open={open} onOpenChange={setOpen} onPrev={prev} onNext={next} />
    </section>
  );
}

interface DialogProps {
  cert: Certificate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
}

function CertificateDialog({ cert, open, onOpenChange, onPrev, onNext }: DialogProps) {
  const { t, locale } = useI18n();
  const c = t.certificates;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="lightbox-overlay" />
        <Dialog.Content
          className="lightbox cert-lightbox"
          aria-describedby={undefined}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
          }}
        >
          <div className="lightbox-media">
            <Img name={cert.image} alt={cert.title[locale]} sizes="(max-width: 760px) 92vw, 640px" priority />
          </div>
          <div className="lightbox-bar">
            <div>
              <Dialog.Title className="lightbox-title">{cert.title[locale]}</Dialog.Title>
              <p className="lightbox-sub">
                {cert.issuer[locale]}
                {cert.valid[locale] && ` · ${cert.valid[locale]}`}
                {cert.pages > 1 && ` · ${fill(c.pages, { n: cert.pages })}`}
              </p>
            </div>
            <div className="lightbox-actions">
              <button type="button" className="cert-btn" onClick={onPrev} aria-label={c.prev}>
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button type="button" className="cert-btn" onClick={onNext} aria-label={c.next}>
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
              <Dialog.Close className="cert-btn" aria-label={c.close}>
                <X size={18} strokeWidth={1.5} />
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Compact trust row for the Products section — links to the full carousel. */
export function CertificateStrip() {
  const { t, locale } = useI18n();
  const featured = certificates.filter((x) => ['fire-b1', 'fire-ng-ru', 'iso-9001', 'conformity'].includes(x.id));
  return (
    <a className="cert-strip reveal" href="#certificates">
      <span className="cert-strip-thumbs" aria-hidden="true">
        {featured.map((x) => (
          <span key={x.id} className="cert-strip-thumb">
            <Img name={x.image} alt="" sizes="72px" />
          </span>
        ))}
      </span>
      <span className="cert-strip-copy">
        <strong>{t.certificates.strip}</strong>
        <small>{featured.map((x) => x.title[locale]).join(' · ')}</small>
      </span>
      <span className="cert-strip-cta">
        {t.certificates.stripCta} <span aria-hidden="true">→</span>
      </span>
    </a>
  );
}
