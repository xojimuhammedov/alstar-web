import { Download, FileText } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Arrow, Button, delay, Img } from '../components/ui';
import type { ImageName } from '../config/images';
import { certificates } from '../content/certificates';
import { productsPage } from '../content/products';
import { certificateFile, fireCertificateIds, technicalPage } from '../content/technical';
import { defaultLocale, useI18n } from '../i18n';
import { pageHref, withBase } from '../routes';
import { Certificates } from '../sections/Certificates';
import { Cta } from '../sections/Cta';

const fireClass: Record<string, string> = { pe: '—', b1: 'B-s1, d0', a2: 'A2-s1, d0' };

/** /texnik-markaz/ — datasheets, installation guide, certificates, fire documents and downloads. */
export function TechnicalPage() {
  const { t, locale } = useI18n();
  const p = technicalPage[locale];
  const products = pageHref(locale, { page: 'products' });
  const guide = pageHref(defaultLocale, { page: 'installation' });
  const fireDocs = certificates.filter((c) => fireCertificateIds.includes(c.id));

  return (
    <>
      <PageHero kicker={p.kicker} title={p.title} intro={p.intro} crumbs={[{ label: t.nav.technical }]}>
        <nav className="tech-jump" aria-label={p.title}>
          {t.technical.items.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* 01 — Datasheets */}
      <section className="section alt" id="datasheets" aria-labelledby="datasheets-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">01 /</p>
              <h2 className="title" id="datasheets-title">
                {p.datasheets.title}
              </h2>
              <p className="small-copy section-intro">{p.datasheets.intro}</p>
            </div>
            <div className="right">
              <Button href={`${products}#spec`}>{p.datasheets.specLink}</Button>
            </div>
          </div>
          <ul className="sheet-grid" role="list">
            {productsPage[locale].products.map((d, i) => {
              const item = t.products.items.find((x) => x.id === d.id)!;
              return (
                <li className="sheet-card reveal" style={delay(i * 90)} key={d.id}>
                  <div className="sheet-media">
                    <Img name={`product-${d.id}` as ImageName} alt="" sizes="(max-width: 760px) 100vw, 33vw" />
                  </div>
                  <div className="sheet-body">
                    <h3>{item.name}</h3>
                    <p>{d.standard}</p>
                    <dl>
                      <div>
                        <dt>{p.datasheets.fireClass}</dt>
                        <dd>{fireClass[d.id]}</dd>
                      </div>
                      {d.specs.slice(2, 4).map((s) => (
                        <div key={s.label}>
                          <dt>{s.label}</dt>
                          <dd>{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <a className="product-link" href={`${products}#${d.id}`}>
                      {p.datasheets.more} <span className="sr-only">— {item.name}</span>
                      <Arrow />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 02 — Installation guide (Uzbek text) */}
      <section className="section" id="installation" aria-labelledby="installation-title">
        <div className="container guide-teaser">
          <div>
            <p className="eyebrow">02 /</p>
            <h2 className="title" id="installation-title">
              {p.installation.title}
            </h2>
            <p className="small-copy section-intro">{p.installation.intro}</p>
            <Button variant="red" href={guide}>
              {p.installation.open}
              {p.installation.langNote && <span className="btn-note"> ({p.installation.langNote})</span>}
            </Button>
          </div>
          <ol className="guide-steps">
            {p.installation.steps.map((step, i) => (
              <li key={step}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 — Certificates (same carousel as the home page; "#cert-<id>" opens one) */}
      <Certificates index="03" />

      {/* 04 — Fire-safety documents */}
      <section className="section alt" id="fire" aria-labelledby="fire-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">04 /</p>
              <h2 className="title" id="fire-title">
                {p.fire.title}
              </h2>
              <p className="small-copy section-intro">{p.fire.intro}</p>
            </div>
          </div>
          <ul className="doc-grid" role="list">
            {fireDocs.map((c) => (
              <li className="doc-card" key={c.id}>
                <a className="doc-thumb" href={`#cert-${c.id}`} aria-label={`${p.open}: ${c.title[locale]}`}>
                  <Img name={c.image} alt="" sizes="160px" />
                </a>
                <div className="doc-body">
                  <span className={`cert-kind kind-${c.kind}`}>{t.certificates.kinds[c.kind]}</span>
                  <h3>{c.title[locale]}</h3>
                  <p>
                    {c.issuer[locale]}
                    {c.valid[locale] && ` · ${c.valid[locale]}`}
                  </p>
                  <div className="doc-actions">
                    <a className="doc-link" href={`#cert-${c.id}`}>
                      <FileText size={15} strokeWidth={1.6} aria-hidden="true" /> {p.open}
                    </a>
                    <a className="doc-link" href={withBase(certificateFile(c.id))} download>
                      <Download size={15} strokeWidth={1.6} aria-hidden="true" /> {p.download}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Downloads */}
      <section className="section" id="downloads" aria-labelledby="downloads-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">05 /</p>
              <h2 className="title" id="downloads-title">
                {p.downloads.title}
              </h2>
              <p className="small-copy section-intro">{p.downloads.intro}</p>
            </div>
          </div>
          <ul className="download-list" role="list">
            <li>
              <a className="download-row" href={`${products}#spec`}>
                <FileText size={20} strokeWidth={1.4} aria-hidden="true" />
                <span className="download-name">
                  {p.downloads.spec}
                  <small>{p.downloads.specSub}</small>
                </span>
                <span className="download-meta">{p.open}</span>
                <Arrow />
              </a>
            </li>
            {certificates.map((c) => (
              <li key={c.id}>
                <a className="download-row" href={withBase(certificateFile(c.id))} download>
                  <Download size={20} strokeWidth={1.4} aria-hidden="true" />
                  <span className="download-name">
                    {c.title[locale]}
                    <small>
                      {c.issuer[locale]}
                      {c.valid[locale] && ` · ${c.valid[locale]}`}
                    </small>
                  </span>
                  <span className="download-meta">{p.imageNote}</span>
                  <span className="sr-only">{p.download}</span>
                  <Arrow />
                </a>
              </li>
            ))}
            <li>
              <div className="download-row is-soon" aria-disabled="true">
                <FileText size={20} strokeWidth={1.4} aria-hidden="true" />
                <span className="download-name">
                  {p.downloads.catalog}
                  <small>{p.downloads.catalogSub}</small>
                </span>
                <span className="download-meta">{p.downloads.soon}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <Cta />
    </>
  );
}
