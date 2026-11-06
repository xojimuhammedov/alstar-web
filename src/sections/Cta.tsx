import { useRef } from 'react';
import { Button, Img } from '../components/ui';
import { site, telHref } from '../config/site';
import { useScrollFrame } from '../hooks/useScrollFrame';
import { useI18n } from '../i18n';

const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(`${site.name} — ${subject}`)}`;

export function Cta() {
  const { t } = useI18n();
  const bgRef = useRef<HTMLDivElement>(null);

  useScrollFrame((reduced) => {
    const bg = bgRef.current;
    if (reduced || !bg?.parentElement) return;
    const r = bg.parentElement.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
    bg.style.transform = `translateY(${(p * 24 - 12).toFixed(1)}px)`;
  });

  return (
    <section className="section cta" id="contact" aria-labelledby="contact-title">
      <div className="cta-bg" ref={bgRef}>
        <Img name="cta-bg" alt="" sizes="100vw" />
      </div>
      <div className="container reveal">
        <h2 id="contact-title">{t.cta.title}</h2>
        <p>
          {t.cta.partnerBefore} <strong className="cta-brand">{site.name}</strong> {t.cta.partnerAfter}
        </p>
        <div className="cta-actions">
          <Button variant="red" href={mailto(t.cta.touch)}>
            {t.cta.touch}
          </Button>
          <Button href={mailto(t.cta.quote)} arrow={false}>
            {t.cta.quote}
          </Button>
          <Button href={mailto(t.cta.sample)} arrow={false}>
            {t.cta.sample}
          </Button>
          <Button href={mailto(t.cta.technical)} arrow={false}>
            {t.cta.technical}
          </Button>
        </div>
        <address className="cta-contacts">
          <span>
            <small>{t.cta.phoneLabel}</small>
            {site.phones.map((p) => (
              <a key={p} href={telHref(p)}>
                {p}
              </a>
            ))}
          </span>
          <span>
            <small>{t.cta.emailLabel}</small>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </address>
      </div>
    </section>
  );
}
