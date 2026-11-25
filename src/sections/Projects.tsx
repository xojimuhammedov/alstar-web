import { useRef } from 'react';
import { Arrow, Button, Img, SectionHead } from '../components/ui';
import { galleryImage, projects } from '../content/projects';
import { useScrollFrame } from '../hooks/useScrollFrame';
import { useI18n } from '../i18n';
import { pageHref } from '../routes';

export function Projects() {
  const { t, locale } = useI18n();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const page = pageHref(locale, { page: 'projects' });

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
          <Button href={page}>{t.projects.cta}</Button>
        </SectionHead>
        <div className="projects-pin" ref={pinRef}>
          <div className="projects-sticky">
            <div className="project-track" ref={trackRef}>
              {projects.map((p, i) => (
                <a
                  className={`project-card ${i === 0 ? 'project-large' : 'project-small'}`}
                  key={p.slug}
                  href={`${page}#${p.slug}`}
                >
                  <Img
                    name={galleryImage(p.slug, 1)}
                    alt={t.projects.page.mainAlt.replace('{name}', p.title[locale])}
                    sizes={i === 0 ? '(max-width: 760px) 78vw, 880px' : '(max-width: 760px) 78vw, 500px'}
                  />
                  {i === 0 && <span className="featured-tag">{t.projects.featured}</span>}
                  <div className="project-overlay">
                    <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{p.title[locale]}</h3>
                    <small>{p.finish[locale]}</small>
                    <span className="project-view">
                      {t.projects.view} <Arrow />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
