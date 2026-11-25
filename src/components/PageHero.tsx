import type { ReactNode } from 'react';
import { localePath, useI18n } from '../i18n';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  kicker: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}

/** Title block for sub-pages: breadcrumb, kicker, h1 and intro. */
export function PageHero({ kicker, title, intro, crumbs, children }: PageHeroProps) {
  const { t, locale } = useI18n();
  const trail: Crumb[] = [{ label: t.nav.homeShort, href: localePath(locale) }, ...crumbs];
  return (
    <header className="page-hero">
      <div className="container">
        <nav aria-label={t.nav.breadcrumb}>
          <ol className="crumbs">
            {trail.map((c, i) => (
              <li key={i}>
                {c.href && i < trail.length - 1 ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow">{kicker}</p>
        <h1 className="page-title">{title}</h1>
        {intro && <p className="page-intro">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
