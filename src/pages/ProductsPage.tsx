import { Fragment } from 'react';
import { PageHero } from '../components/PageHero';
import { Arrow, Button, delay, Img } from '../components/ui';
import type { ImageName } from '../config/images';
import { productsPage } from '../content/products';
import { useI18n } from '../i18n';
import { anchorHref } from '../routes';
import { Cta } from '../sections/Cta';

const dotClass: Record<string, string> = { pe: '', b1: 'yellow', a2: 'red' };

/** Multi-line table cells ("a\nb") keep their line breaks. */
const lines = (text: string) =>
  text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));

/** /mahsulotlar/ — the three products again, their full characteristics and the catalog specification. */
export function ProductsPage() {
  const { t, locale } = useI18n();
  const p = productsPage[locale];
  const items = t.products.items;

  return (
    <>
      <PageHero kicker={p.kicker} title={p.title} intro={p.intro} crumbs={[{ label: t.nav.products }]} />

      <section className="section alt" aria-label={p.title}>
        <div className="container">
          <div className="products-grid">
            {items.map((item, i) => (
              <article className="product-card reveal" style={delay(i * 110)} key={item.id}>
                <div className="product-image">
                  <Img name={`product-${item.id}` as ImageName} alt={item.imageAlt} sizes="(max-width: 1100px) 100vw, 33vw" priority={i === 0} />
                </div>
                <div className="product-body">
                  <div className="product-type">
                    <span className={`dot ${dotClass[item.id] ?? ''}`} aria-hidden="true" />
                    {item.type}
                  </div>
                  <h2 className="product-name">{item.name}</h2>
                  <p>{item.desc}</p>
                  <div className="fire">{item.spec}</div>
                  <a className="product-link" href={`#${item.id}`}>
                    {t.products.details} <span className="sr-only">— {item.name}</span>
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="product-details-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">01 /</p>
              <h2 className="title" id="product-details-title">
                {p.detailsTitle}
              </h2>
            </div>
          </div>

          <div className="product-details">
            {p.products.map((d) => {
              const item = items.find((x) => x.id === d.id)!;
              return (
                <article className="product-detail" id={d.id} key={d.id} aria-labelledby={`${d.id}-title`}>
                  <div className="product-detail-media">
                    <Img name={`product-${d.id}` as ImageName} alt={item.imageAlt} sizes="(max-width: 1100px) 100vw, 40vw" />
                  </div>
                  <div className="product-detail-body">
                    <div className="product-type">
                      <span className={`dot ${dotClass[d.id] ?? ''}`} aria-hidden="true" />
                      {d.standard}
                    </div>
                    <h3 id={`${d.id}-title`}>{item.name}</h3>
                    <p className="product-detail-summary">{d.summary}</p>
                    <p>{d.compliance}</p>
                    <h4>{p.meaningLabel}</h4>
                    <p>{d.meaning}</p>
                    <h4>{p.specsLabel}</h4>
                    <dl className="product-specs">
                      {d.specs.map((s) => (
                        <div key={s.label}>
                          <dt>{s.label}</dt>
                          <dd>{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <Button href={anchorHref(locale, 'contact')}>{p.ask}</Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section alt" id="spec" aria-labelledby="spec-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">02 /</p>
              <h2 className="title" id="spec-title">
                {p.specTitle}
              </h2>
              <p className="small-copy section-intro">{p.specIntro}</p>
            </div>
          </div>
          <div className="spec-grid">
            {p.tables.map((table, ti) => (
              <div className={`spec-card spec-card-${ti + 1}`} key={table.title}>
                <h3>{table.title}</h3>
                <div className="spec-scroll">
                  <table className="spec-table">
                    <thead>
                      <tr>
                        {table.head.map((h) => (
                          <th scope="col" key={h}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, ci) =>
                            ci === 0 ? (
                              <th scope="row" key={ci}>
                                {lines(cell)}
                              </th>
                            ) : (
                              <td key={ci}>{lines(cell)}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
