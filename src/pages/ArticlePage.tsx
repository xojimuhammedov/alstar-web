import { ArticleBody, headingsOf } from '../components/ArticleBody';
import { PageHero } from '../components/PageHero';
import { Arrow, Button, Img } from '../components/ui';
import { articleBySlug, articles } from '../content/articles';
import { useI18n } from '../i18n';
import { anchorHref, pageHref } from '../routes';
import { Cta } from '../sections/Cta';
import { formatDate } from './ArticlesPage';

export function ArticlePage({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const a = t.articles;
  const article = articleBySlug(slug) ?? articles[0];
  const index = pageHref(locale, { page: 'articles' });
  const related = articles.filter((x) => x.slug !== article.slug).slice(0, 3);
  const toc = headingsOf(article.body);

  return (
    <>
      <PageHero kicker={article.category} title={article.title} crumbs={[{ label: a.title, href: index }, { label: article.title }]}>
        <p className="page-meta">
          {a.published}: <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
      </PageHero>

      <article className="section post" aria-labelledby="post-title">
        <div className="container post-layout">
          <div className="post-main">
            <figure className="post-cover">
              <Img name={article.image} alt={article.imageAlt} sizes="(max-width: 1100px) 100vw, 860px" priority />
            </figure>
            <span id="post-title" className="sr-only">
              {article.title}
            </span>
            <ArticleBody body={article.body} />
            <div className="post-actions">
              <Button href={index} arrow={false}>
                ← {a.back}
              </Button>
              <Button variant="red" href={anchorHref(locale, 'contact')}>
                {a.cta}
              </Button>
            </div>
          </div>
          {toc.length > 0 && (
            <aside className="post-aside">
              <nav className="post-toc" aria-label={article.title}>
                <ol>
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>
      </article>

      <section className="section alt" aria-labelledby="related-title">
        <div className="container">
          <h2 className="title related-title" id="related-title">
            {a.related}
          </h2>
          <ul className="post-grid">
            {related.map((x) => (
              <li key={x.slug} className="post-card">
                <div className="post-media">
                  <Img name={x.image} alt={x.imageAlt} sizes="(max-width: 760px) 100vw, 33vw" />
                </div>
                <div className="post-body">
                  <div className="cat">{x.category}</div>
                  <h3>
                    <a href={pageHref(locale, { page: 'article', slug: x.slug })} className="stretched">
                      {x.title}
                    </a>
                  </h3>
                  <span className="post-more" aria-hidden="true">
                    {a.readMore} <Arrow />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Cta />
    </>
  );
}
