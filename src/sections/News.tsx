import { Arrow, Button, delay, Img, SectionHead } from '../components/ui';
import { articles } from '../content/articles';
import { useI18n } from '../i18n';
import { routePath } from '../routes';

/** News cards → article slugs (article texts exist in Uzbek). */
const slugFor: Record<string, string> = {
  acp: 'alyuminiy-kompozit-panel-nima',
  fire: 'pe-b1-a2-farqi',
  granule: 'b1-granula-ishlab-chiqarish',
  finish: 'fasad-qoplamasi-bino-qiyofasi',
};

const articleFor = (id: string) => articles.find((a) => a.slug === slugFor[id]) ?? articles[0];
// Articles are Uzbek-only, so every language links to the Uzbek pages.
const href = (id: string) => routePath('uz', { page: 'article', slug: articleFor(id).slug });

export function News() {
  const { t, locale } = useI18n();
  const { feature } = t.news;
  const lang = locale === 'uz' ? undefined : 'uz';
  return (
    <section className="section" id="news" aria-labelledby="news-title">
      <div className="container">
        <SectionHead index="05" title={t.news.title} titleId="news-title">
          <div className="right">
            {t.news.langNote && <p className="small-copy">{t.news.langNote}</p>}
            <Button href={routePath('uz', { page: 'articles' })} hrefLang={lang}>
              {t.news.cta}
            </Button>
          </div>
        </SectionHead>
        <div className="news-grid">
          <article className="news-feature reveal">
            <Img name={articleFor(feature.id).image} alt={feature.alt} sizes="(max-width: 1100px) 100vw, 56vw" />
            <div className="news-content">
              <div className="cat">{feature.cat}</div>
              <h3>{feature.title}</h3>
              <a href={href(feature.id)} hrefLang={lang} className="small-copy stretched">
                {t.news.readMore} <span className="sr-only">— {feature.title}</span>
                <Arrow />
              </a>
            </div>
          </article>
          <div className="article-list">
            {t.news.items.map((a, i) => (
              <article className="article reveal" style={delay(i * 100)} key={a.id}>
                <div className="thumb">
                  <Img name={articleFor(a.id).image} alt={a.alt} sizes="145px" />
                </div>
                <div className="article-copy">
                  <div className="cat">{a.cat}</div>
                  <h3>{a.title}</h3>
                  <a href={href(a.id)} hrefLang={lang} className="stretched">
                    {t.news.readMore} <span className="sr-only">— {a.title}</span>
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
