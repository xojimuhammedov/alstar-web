import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { Img } from '../components/ui';
import { galleryImage, projects } from '../content/projects';
import type { ImageName } from '../config/images';
import { useApiProjects, type ApiProject } from '../hooks/useApiProjects';
import { useI18n } from '../i18n';
import { Cta } from '../sections/Cta';

type Photo = { name?: ImageName; src?: string; alt: string };

/** Editorial Gallery: 01 — whole building (large, left), 02–03 — façade / ACP details (stacked, right). */
function Gallery({
  index,
  id,
  title,
  meta,
  photos,
  onOpen,
}: {
  index: number;
  id: string;
  title: string;
  meta?: string;
  photos: Photo[];
  onOpen: (p: Photo) => void;
}) {
  const { t } = useI18n();
  const [main, ...details] = photos;
  const photo = (p: Photo, i: number, sizes: string) => (
    <button
      type="button"
      key={i}
      className={`eg-photo ${i === 0 ? 'eg-main' : 'eg-detail'}`}
      onClick={() => onOpen(p)}
      aria-label={`${t.projects.page.open}: ${p.alt}`}
    >
      {p.name ? <Img name={p.name} alt={p.alt} sizes={sizes} /> : <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />}
      <span className="eg-num" aria-hidden="true">
        {String(i + 1).padStart(2, '0')}
      </span>
    </button>
  );
  return (
    <article className="eg" id={id} aria-labelledby={`${id}-title`}>
      <div className="eg-grid">
        {main && photo(main, 0, '(max-width: 900px) 100vw, 66vw')}
        {details.length > 0 && (
          <div className="eg-side">{details.slice(0, 2).map((p, i) => photo(p, i + 1, '(max-width: 900px) 50vw, 33vw'))}</div>
        )}
      </div>
      <div className="eg-caption">
        <span className="eg-index">{String(index).padStart(2, '0')}</span>
        <h2 id={`${id}-title`}>{title}</h2>
        {meta && <p>{meta}</p>}
      </div>
    </article>
  );
}

export function ProjectsPage() {
  const { t, locale } = useI18n();
  const p = t.projects.page;
  const [open, setOpen] = useState<Photo | null>(null);
  const extra: ApiProject[] = useApiProjects(
    locale,
    projects.map((x) => x.slug),
  );
  const total = projects.length + extra.length;

  return (
    <>
      <PageHero kicker={p.kicker} title={p.title} intro={p.intro} crumbs={[{ label: t.projects.title }]}>
        <p className="page-count">{p.count.replace('{n}', String(total))}</p>
      </PageHero>

      <section className="section eg-list" aria-label={p.title}>
        <div className="container">
          {projects.map((x, i) => {
            const name = x.title[locale];
            return (
              <Gallery
                key={x.slug}
                index={i + 1}
                id={x.slug}
                title={name}
                meta={`${p.finish}: ${x.finish[locale]}`}
                onOpen={setOpen}
                photos={[
                  { name: galleryImage(x.slug, 1), alt: p.mainAlt.replace('{name}', name) },
                  { name: galleryImage(x.slug, 2), alt: p.detailAlt.replace('{name}', name) },
                  { name: galleryImage(x.slug, 3), alt: p.detailAlt.replace('{name}', name) },
                ]}
              />
            );
          })}
          {extra.map((x, i) => (
            <Gallery
              key={x.slug}
              index={projects.length + i + 1}
              id={x.slug}
              title={x.title}
              meta={x.location || undefined}
              onOpen={setOpen}
              photos={x.images.map((src, j) => ({
                src,
                alt: (j === 0 ? p.mainAlt : p.detailAlt).replace('{name}', x.title),
              }))}
            />
          ))}
        </div>
      </section>

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="lightbox-overlay" />
          <Dialog.Content className="lightbox photo-lightbox" aria-describedby={undefined}>
            <Dialog.Title className="sr-only">{open?.alt}</Dialog.Title>
            <div className="lightbox-media">
              {open?.name ? (
                <Img name={open.name} alt={open.alt} sizes="92vw" priority />
              ) : (
                open && <img src={open.src} alt={open.alt} />
              )}
            </div>
            <Dialog.Close className="cert-btn lightbox-close" aria-label={p.close}>
              <X size={18} strokeWidth={1.5} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Cta />
    </>
  );
}
