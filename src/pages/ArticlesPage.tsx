import { PageHero } from '../components/PageHero';
import { Arrow, delay, Img } from '../components/ui';
import { articles } from '../content/articles';
import { useI18n } from '../i18n';
import { routePath } from '../routes';
import { Cta } from '../sections/Cta';

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
};

export function ArticlesPage() {
  const { t, locale } = useI18n();
  const a = t.articles;
  const [first, ...rest] = articles;
  const href = (slug: string) => routePath(locale, { page: 'article', slug });

  return (
    <>
      <PageHero kicker={a.kicker} title={a.title} intro={a.intro} crumbs={[{ label: a.title }]} />
      <section className="section articles-index" aria-label={a.title}>
        <div className="container">
          <article className="post-feature">
            <a className="post-feature-media" href={href(first.slug)} tabIndex={-1} aria-hidden="true">
              <Img name={first.image} alt="" sizes="(max-width: 900px) 100vw, 60vw" priority />
            </a>
            <div className="post-feature-copy">
              <div className="cat">{first.category}</div>
              <h2>
                <a href={href(first.slug)}>{first.title}</a>
              </h2>
              <p>{first.excerpt}</p>
              <a className="btn" href={href(first.slug)}>
                {a.readMore} <span className="sr-only">— {first.title}</span>
                <Arrow />
              </a>
            </div>
          </article>

          <ul className="post-grid">
            {rest.map((x, i) => (
              <li key={x.slug} className="post-card reveal" style={delay((i % 3) * 90)}>
                <div className="post-media">
                  <Img name={x.image} alt={x.imageAlt} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                </div>
                <div className="post-body">
                  <div className="cat">{x.category}</div>
                  <h3>
                    <a href={href(x.slug)} className="stretched">
                      {x.title}
                    </a>
                  </h3>
                  <p>{x.excerpt}</p>
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
