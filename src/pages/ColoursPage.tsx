import { PageHero } from '../components/PageHero';
import { useI18n } from '../i18n';
import { ColourCatalog } from '../sections/Colours';
import { Cta } from '../sections/Cta';

/** /ranglar/ — the whole colour catalogue on its own page. */
export function ColoursPage() {
  const { t } = useI18n();
  const c = t.colours;
  return (
    <>
      <PageHero kicker={c.page.kicker} title={c.catalogTitle} intro={c.page.intro} crumbs={[{ label: t.nav.colours }]} />
      <section className="section finishes catalog-page" aria-label={c.catalogTitle}>
        <div className="container">
          <ColourCatalog />
        </div>
      </section>
      <Cta />
    </>
  );
}
