import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import { site, telHref } from '../config/site';
import { useScrollFrame } from '../hooks/useScrollFrame';
import { useI18n } from '../i18n';
import { anchorHref, useRoute } from '../routes';
import { Brand } from './Brand';
import { LanguageSwitcher } from './LanguageSwitcher';
import { navItems } from './navItems';
import { Arrow, Button } from './ui';

export function Header() {
  const { t, locale } = useI18n();
  const route = useRoute();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useScrollFrame(() => ref.current?.classList.toggle('scrolled', window.scrollY > 80));

  return (
    <header className="site-header" ref={ref}>
      <div className="nav">
        <Brand />
        <nav className="navlinks" aria-label={t.nav.label}>
          {navItems(t, locale, { withFaq: false }).map((item) => (
            <a key={item.href} href={item.href} aria-current={item.key === route.page ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher className="lang-desktop" />
          <Button className="nav-cta" href={anchorHref(locale, 'contact')}>
            {t.nav.cta}
          </Button>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="menu" aria-label={t.nav.openMenu}>
              <span />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="drawer-overlay" />
              <Dialog.Content className="drawer" aria-describedby={undefined}>
                <div className="drawer-top">
                  <Dialog.Title asChild>
                    <span className="drawer-title">{site.name}</span>
                  </Dialog.Title>
                  <Dialog.Close className="drawer-close" aria-label={t.nav.closeMenu}>
                    <X size={18} strokeWidth={1.5} />
                  </Dialog.Close>
                </div>
                <nav className="drawer-links" aria-label={t.nav.label}>
                  {navItems(t, locale).map((item, i) => (
                    <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                      <small>{String(i + 1).padStart(2, '0')}</small>
                      {item.label}
                      <Arrow />
                    </a>
                  ))}
                </nav>
                <div className="drawer-bottom">
                  <LanguageSwitcher />
                  {site.phones.map((p) => (
                    <a key={p} href={telHref(p)}>
                      {p}
                    </a>
                  ))}
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
