import { site, telHref } from '../config/site';
import { useI18n } from '../i18n';
import { Brand } from './Brand';
import { navItems } from './navItems';

export function Footer() {
  const { t, locale } = useI18n();
  const { address } = site;
  const addressLine = [address.street, address.city, address.postalCode].filter(Boolean).join(', ');

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
          {addressLine && <span>{addressLine}</span>}
        </address>
      </div>
      <p className="footer-legal">
        © {site.foundingYear}–{new Date().getFullYear()} {site.legalName}. {t.footer.rights}
      </p>
    </footer>
  );
}
