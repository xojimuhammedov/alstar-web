import { Arrow, Button, delay, Img, SectionHead } from '../components/ui';
import type { ImageName } from '../config/images';
import { useI18n } from '../i18n';

// Articles link to the most relevant on-page section until article pages exist.
const targets: Record<string, string> = { fire: '#faq', manufacturing: '#technical', finish: '#colours' };

export function News() {
  const { t } = useI18n();
  const { feature } = t.news;
  return (
    <section className="section" id="news" aria-labelledby="news-title">
      <div className="container">
        <SectionHead index="05" title={t.news.title} titleId="news-title">
          <Button href="#contact">{t.news.cta}</Button>
        </SectionHead>
        <div className="news-grid">
          <article className="news-feature reveal">
            <Img name="news-acp" alt={feature.alt} sizes="(max-width: 1100px) 100vw, 56vw" />
            <div className="news-content">
              <div className="cat">{feature.cat}</div>
              <h3>{feature.title}</h3>
              <a href="#faq" className="small-copy">
                {t.news.readMore} <span className="sr-only">— {feature.title}</span>
                <Arrow />
              </a>
            </div>
          </article>
          <div className="article-list">
            {t.news.items.map((a, i) => (
              <article className="article reveal" style={delay(i * 100)} key={a.id}>
                <div className="thumb">
                  <Img name={`news-${a.id}` as ImageName} alt={a.alt} sizes="145px" />
                </div>
                <div className="article-copy">
                  <div className="cat">{a.cat}</div>
                  <h3>{a.title}</h3>
                  <a href={targets[a.id] ?? '#technical'}>
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
