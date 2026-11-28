import { Arrow, Button, delay, Img, SectionHead } from '../components/ui';
import type { ImageName } from '../config/images';
import { useI18n } from '../i18n';
import { pageHref } from '../routes';
import { CertificateStrip } from './Certificates';

const dotClass: Record<string, string> = { pe: '', b1: 'yellow', a2: 'red' };

export function Products() {
  const { t, locale } = useI18n();
  const page = pageHref(locale, { page: 'products' });
  return (
    <section className="section alt" id="products" aria-labelledby="products-title">
      <div className="container">
        <SectionHead index="02" title={t.products.title} titleId="products-title">
          <div className="right">
            <p className="small-copy">
              {t.products.aside.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <Button href={page}>{t.products.cta}</Button>
          </div>
        </SectionHead>
        <div className="products-grid">
          {t.products.items.map((p, i) => (
            <article className="product-card reveal" style={delay(i * 110)} key={p.id} id={`product-${p.id}`}>
              <div className="product-image">
                <Img
                  name={`product-${p.id}` as ImageName}
                  alt={p.imageAlt}
                  sizes="(max-width: 1100px) 100vw, 33vw"
                />
              </div>
              <div className="product-body">
                <div className="product-type">
                  <span className={`dot ${dotClass[p.id] ?? ''}`} aria-hidden="true" />
                  {p.type}
                </div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="fire">{p.spec}</div>
                <a className="product-link" href={`${page}#${p.id}`}>
                  {t.products.details} <span className="sr-only">— {p.name}</span>
                  <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
        <CertificateStrip />
      </div>
    </section>
  );
}
