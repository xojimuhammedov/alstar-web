import { ArticleBody, headingsOf } from '../components/ArticleBody';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/ui';
import { installationGuide } from '../content/installation';
import { technicalPage } from '../content/technical';
import { useI18n } from '../i18n';
import { anchorHref, pageHref } from '../routes';
import { Cta } from '../sections/Cta';

/** /texnik-markaz/ornatish-qollanmasi/ — ALSTAR's installation guide (Uzbek only). */
export function InstallationPage() {
  const { t, locale } = useI18n();
  const p = technicalPage[locale];
  const center = pageHref(locale, { page: 'technical' });
  const toc = headingsOf(installationGuide.body);

  return (
    <>
      <PageHero
        kicker={p.kicker}
        title={p.installation.title}
        intro={p.installation.intro}
        crumbs={[{ label: t.nav.technical, href: center }, { label: p.installation.title }]}
      />

      <article className="section post" aria-labelledby="guide-title">
        <div className="container post-layout">
          <div className="post-main">
            <span id="guide-title" className="sr-only">
              {installationGuide.title}
            </span>
            <ArticleBody body={installationGuide.body} />
            <div className="post-actions">
              <Button href={center} arrow={false}>
                ← {t.nav.technical}
              </Button>
              <Button variant="red" href={anchorHref(locale, 'contact')}>
                {t.articles.cta}
              </Button>
            </div>
          </div>
          <aside className="post-aside">
            <nav className="post-toc" aria-label={installationGuide.title}>
              <ol>
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </article>

      <Cta />
    </>
  );
}
