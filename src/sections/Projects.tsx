import { useRef } from 'react';
import { Button, Img, SectionHead } from '../components/ui';
import type { ImageName } from '../config/images';
import { useScrollFrame } from '../hooks/useScrollFrame';
import { useI18n } from '../i18n';

export function Projects() {
  const { t } = useI18n();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Vertical scroll drives the horizontal track while the section is pinned (desktop only).
  useScrollFrame((reduced) => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    if (reduced || window.innerWidth <= 1100) {
      track.style.transform = '';
      return;
    }
    const rect = pin.getBoundingClientRect();
    const maxScroll = pin.offsetHeight - window.innerHeight;
    const p = maxScroll > 0 ? Math.min(1, Math.max(0, -rect.top / maxScroll)) : 0;
    const maxX = Math.max(0, track.scrollWidth - window.innerWidth);
    track.style.transform = `translateX(${-p * maxX}px)`;
  });

  return (
    <section className="section alt projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead index="04" title={t.projects.title} titleId="projects-title" intro={t.projects.copy}>
          <Button href="#contact">{t.projects.cta}</Button>
        </SectionHead>
        <div className="projects-pin" ref={pinRef}>
          <div className="projects-sticky">
            <div className="project-track" ref={trackRef}>
              {t.projects.items.map((p, i) => (
                <article className={`project-card ${i === 0 ? 'project-large' : 'project-small'}`} key={p.id}>
                  <Img
                    name={`project-${p.id}` as ImageName}
                    alt={p.alt}
                    sizes={i === 0 ? '(max-width: 760px) 78vw, 880px' : '(max-width: 760px) 78vw, 500px'}
                  />
                  {i === 0 && <span className="featured-tag">{t.projects.featured}</span>}
                  <div className="project-overlay">
                    <h3>{p.title}</h3>
                    <small>{t.projects.tag}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
