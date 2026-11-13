import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button, delay, Img, SectionHead } from '../components/ui';
import { getJson, type FinishVariantDto } from '../config/api';
import manifest from '../config/image-manifest.json';
import type { ImageName } from '../config/images';
import { useFinishes } from '../hooks/useFinishes';
import { useI18n, type Dictionary, type Locale } from '../i18n';

const ALL = 'all';
/** Colours shown under "All" before "show more" (a category always shows all). */
const PREVIEW_COUNT = 12;

interface Card {
  id: string;
  name: string;
  sub: string;
  count: number | null;
  image: string | null;
}

type Variant = FinishVariantDto & { finishName: string };

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

function countLabel(c: Dictionary['colours'], locale: Locale, n: number) {
  let word = c.colourMany;
  if (locale === 'ru') {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) word = c.colourOne;
    else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) word = c.colourFew;
  } else if (n === 1) {
    word = c.colourOne;
  }
  return fill(c.countTemplate, { n, word });
}

/**
 * Server-side search (`/api/finish-variants/?search=`): matches the code, RAL and
 * the name in every language, so "мрамор" also finds marble on the uz/en page.
 * Returns the matching ids, or null while there is no query or no answer yet.
 */
function useVariantSearch(query: string, locale: Locale) {
  const [result, setResult] = useState<{ query: string; ids: Set<string> } | null>(null);
  const q = query.trim();

  useEffect(() => {
    if (!q) return;
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => {
      getJson<FinishVariantDto[]>(`/api/finish-variants/?lang=${locale}&search=${encodeURIComponent(q)}`, ctrl.signal)
        .then((rows) => setResult({ query: q, ids: new Set(rows.map((r) => r.id)) }))
        // On failure show nothing rather than a dimmed, unfiltered grid forever.
        .catch(() => !ctrl.signal.aborted && setResult({ query: q, ids: new Set() }));
    }, 220);
    return () => {
      window.clearTimeout(timer);
      ctrl.abort();
    };
  }, [q, locale]);

  return q && result ? result : null;
}

/** A finish card drawn as a standing panel with a floor reflection. */
function PanelImage({ card, alt }: { card: Card; alt: string }) {
  const bundled = `finish-${card.id}`;
  const img = (decorative: boolean) =>
    card.image ? (
      <img src={card.image} alt={decorative ? '' : alt} width={911} height={502} loading="lazy" decoding="async" />
    ) : bundled in manifest ? (
      <Img
        name={bundled as ImageName}
        alt={decorative ? '' : alt}
        sizes="(max-width: 760px) 50vw, (max-width: 1100px) 45vw, 300px"
      />
    ) : null; // A category added in the admin without a cover: plain panel.
  return (
    <>
      <span className="finish-panel">{img(false)}</span>
      <span className="finish-reflection" aria-hidden="true">
        <span className="finish-panel">{img(true)}</span>
      </span>
    </>
  );
}

export function Colours() {
  const { t, locale } = useI18n();
  const c = t.colours;
  const finishes = useFinishes(locale);
  const [filter, setFilter] = useState(ALL);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);
  const hasCatalog = finishes.status !== 'disabled';

  const cards: Card[] =
    finishes.status === 'ready'
      ? finishes.data.map((f) => ({
          id: f.slug,
          name: f.name,
          sub: f.featured?.name ?? '',
          count: f.variants_count,
          // No cover uploaded: fall back to the featured colour's swatch.
          image: f.image ?? f.featured?.image ?? null,
        }))
      : c.items.map((i) => ({ id: i.id, name: i.name, sub: i.sub, count: null, image: null }));

  const variants: Variant[] = useMemo(
    () =>
      finishes.status === 'ready'
        ? finishes.data.flatMap((f) => f.variants.map((v) => ({ ...v, finishName: f.name })))
        : [],
    [finishes],
  );

  const search = useVariantSearch(query, locale);
  const searching = query.trim() !== '' && search?.query !== query.trim();
  const filtered = variants.filter(
    (v) => (filter === ALL || v.finish === filter) && (!query.trim() || !search || search.ids.has(v.id)),
  );
  const limited = filter === ALL && !query.trim() && !expanded;
  const visible = limited ? filtered.slice(0, PREVIEW_COUNT) : filtered;
  const hidden = filtered.length - visible.length;

  const select = (id: string) => {
    setFilter(id);
    setQuery('');
    setExpanded(false);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    catalogRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const chips = [
    { id: ALL, name: c.all, count: variants.length },
    ...cards.map((card) => ({ id: card.id, name: card.name, count: card.count ?? 0 })),
  ];

  return (
    <section className="section finishes" id="colours" aria-labelledby="colours-title">
      <div className="container">
        <SectionHead index="03" title={c.title} titleId="colours-title" intro={c.copy}>
          <Button
            href={hasCatalog ? '#colour-catalog' : '#contact'}
            onClick={
              hasCatalog
                ? (e) => {
                    e.preventDefault();
                    select(ALL);
                  }
                : undefined
            }
          >
            {c.cta}
          </Button>
        </SectionHead>

        <ul className="finish-grid" role="list">
          {cards.map((card, i) => {
            const active = filter === card.id && finishes.status === 'ready';
            // Only cards present at page load are watched by useReveal; ones that
            // exist only in the API (added in the admin) render visible straight away.
            const isStatic = c.items.some((item) => item.id === card.id);
            return (
              <li className={isStatic ? 'reveal' : undefined} style={isStatic ? delay((i % 4) * 70) : undefined} key={card.id}>
                <button
                  type="button"
                  className={`finish-card${active ? ' is-active' : ''}`}
                  onClick={() => hasCatalog && select(card.id)}
                  aria-controls={hasCatalog ? 'colour-catalog' : undefined}
                  aria-label={hasCatalog ? fill(c.open, { name: card.name }) : undefined}
                >
                  <PanelImage card={card} alt={`${card.name} ${c.altSuffix}`} />
                  <span className="finish-label">
                    <span className="finish-name">{card.name}</span>
                    {card.sub && <span className="finish-sub">{card.sub}</span>}
                    {card.count != null && <span className="finish-count">{countLabel(c, locale, card.count)}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {hasCatalog && (
          <div className="finish-catalog" id="colour-catalog" ref={catalogRef}>
            <div className="catalog-head">
              <h3 className="catalog-title">{c.catalogTitle}</h3>
              {finishes.status === 'ready' && (
                <label className="catalog-search">
                  <Search size={16} aria-hidden="true" />
                  <span className="sr-only">{c.search}</span>
                  <input
                    type="search"
                    value={query}
                    placeholder={c.search}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {query && (
                    <button type="button" className="catalog-clear" onClick={() => setQuery('')} aria-label={c.clear}>
                      <X size={14} aria-hidden="true" />
                    </button>
                  )}
                </label>
              )}
            </div>

            {finishes.status === 'loading' && <p className="catalog-status">{c.loading}</p>}

            {finishes.status === 'error' && (
              <p className="catalog-status">
                {c.error}{' '}
                <button type="button" className="catalog-retry" onClick={finishes.retry}>
                  {c.retry}
                </button>
              </p>
            )}

            {finishes.status === 'ready' && (
              <>
                <div className="chip-row" role="group" aria-label={c.filterLabel}>
                  {chips.map((chip) => (
                    <button
                      type="button"
                      key={chip.id}
                      className="chip"
                      aria-pressed={filter === chip.id}
                      onClick={() => {
                        setFilter(chip.id);
                        setExpanded(false);
                      }}
                    >
                      {chip.name}
                      <span className="n">{chip.count}</span>
                    </button>
                  ))}
                </div>

                <p className="sr-only" aria-live="polite">
                  {countLabel(c, locale, filtered.length)}
                </p>

                {filtered.length === 0 && !searching ? (
                  <p className="catalog-status">{c.empty}</p>
                ) : (
                  <ul className={`swatch-grid${searching ? ' is-searching' : ''}`} role="list">
                    {visible.map((v) => (
                      <li className="swatch" key={v.id}>
                        <div className="swatch-img">
                          {v.image && (
                            <img
                              src={v.image}
                              alt={`${v.code} ${v.name} ${c.altSuffix}`}
                              width={911}
                              height={502}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                        <span className="swatch-code">{v.code}</span>
                        <span className="swatch-name">{v.name}</span>
                        <span className="swatch-meta">
                          {[v.ral, filter === ALL ? v.finishName : ''].filter(Boolean).join(' · ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {hidden > 0 && (
                  <button type="button" className="btn catalog-more" onClick={() => setExpanded(true)}>
                    {fill(c.showMore, { n: hidden })}
                    <span aria-hidden="true">↓</span>
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
