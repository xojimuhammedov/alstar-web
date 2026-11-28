import { site, telHref } from '../config/site';
import { useI18n } from '../i18n';
import { Brand } from './Brand';
import { SocialLinks } from './SocialLinks';
import { navItems } from './navItems';

export function Footer() {
  const { t, locale } = useI18n();

  return (
    <footer>
      <div className="footer-grid">
        <Brand />
        <nav className="footer-nav" aria-label={t.footer.navLabel}>
          {navItems(t, locale).map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <address className="footer-contact">
          {site.phones.map((p) => (
            <a key={p} href={telHref(p)}>
              {p}
            </a>
          ))}
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
            {site.addressText[locale]}
          </a>
          <SocialLinks label={t.cta.socialLabel} className="footer-social" />
        </address>
      </div>
      <p className="footer-legal">
        © {site.foundingYear}–{new Date().getFullYear()} {site.name} · {site.legalName}. {t.footer.rights}
      </p>
    </footer>
  );
}
