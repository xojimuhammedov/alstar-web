import { delay, SectionHead } from '../components/ui';
import { useI18n } from '../i18n';

/**
 * Visible FAQ — mirrors the FAQPage JSON-LD (Google requires the marked-up
 * answers to be on the page) and gives AI assistants quotable answers.
 * Native <details> keeps every answer in the HTML and works without JS.
 */
export function Faq() {
  const { t } = useI18n();
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <SectionHead index="07" title={t.faq.title} titleId="faq-title" intro={t.faq.intro} />
        <div className="faq-list">
          {t.faq.items.map((item, i) => (
            <details className="faq-item reveal" style={delay(i * 60)} key={item.q} open={i === 0}>
              <summary>
                <h3>{item.q}</h3>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
