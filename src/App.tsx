import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useReveal } from './hooks/useReveal';
import { getDictionary, I18nContext, type Locale } from './i18n';
import { Colours } from './sections/Colours';
import { Cta } from './sections/Cta';
import { Faq } from './sections/Faq';
import { Hero } from './sections/Hero';
import { News } from './sections/News';
import { Products } from './sections/Products';
import { Projects } from './sections/Projects';
import { Technical } from './sections/Technical';
import { Why } from './sections/Why';

export function App({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  useReveal();

  return (
    <I18nContext.Provider value={{ locale, t }}>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <Hero />
        <Why />
        <Products />
        <Colours />
        <Projects />
        <News />
        <Technical />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </I18nContext.Provider>
  );
}
