import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useReveal } from './hooks/useReveal';
import { getDictionary, I18nContext, type Locale } from './i18n';
import { ArticlePage } from './pages/ArticlePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { FactoryPage } from './pages/FactoryPage';
import { HomePage } from './pages/HomePage';
import { InstallationPage } from './pages/InstallationPage';
import { ProductsPage } from './pages/ProductsPage';
import { TechnicalPage } from './pages/TechnicalPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { RouteContext, type Route } from './routes';

function Page({ route }: { route: Route }) {
  switch (route.page) {
    case 'products':
      return <ProductsPage />;
    case 'technical':
      return <TechnicalPage />;
    case 'installation':
      return <InstallationPage />;
    case 'projects':
      return <ProjectsPage />;
    case 'factory':
      return <FactoryPage />;
    case 'articles':
      return <ArticlesPage />;
    case 'article':
      return <ArticlePage slug={route.slug} />;
    default:
      return <HomePage />;
  }
}

export function App({ locale, route }: { locale: Locale; route: Route }) {
  const t = getDictionary(locale);
  useReveal();

  return (
    <I18nContext.Provider value={{ locale, t }}>
      <RouteContext.Provider value={route}>
        <a className="skip-link" href="#main">
          {t.nav.skip}
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          <span id="top" />
          <Page route={route} />
        </main>
        <Footer />
      </RouteContext.Provider>
    </I18nContext.Provider>
  );
}
