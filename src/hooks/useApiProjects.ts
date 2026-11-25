import { useEffect, useState } from 'react';
import { API_URL, getJson, type ProjectDetailDto, type ProjectListDto } from '../config/api';
import type { Locale } from '../i18n';

export interface ApiProject {
  slug: string;
  title: string;
  location: string;
  /** Main image first, then the gallery. */
  images: string[];
}

/**
 * Projects added in the admin panel (alstar-backend → Loyihalar) that are not part
 * of the built-in list. Loaded after hydration; the static page never waits for it.
 */
export function useApiProjects(locale: Locale, knownSlugs: string[]) {
  const [items, setItems] = useState<ApiProject[]>([]);
  const known = knownSlugs.join('|');

  useEffect(() => {
    if (!API_URL) return;
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 10_000);
    const skip = new Set(known.split('|'));
    (async () => {
      const list = await getJson<{ results: ProjectListDto[] }>(`/api/projects/?lang=${locale}&page_size=50`, ctrl.signal);
      const extra = list.results.filter((p) => !skip.has(p.slug) && !p.is_concept);
      const details = await Promise.all(
        extra.map((p) => getJson<ProjectDetailDto>(`/api/projects/${p.slug}/?lang=${locale}`, ctrl.signal)),
      );
      setItems(
        details
          .map((d) => ({
            slug: d.slug,
            title: d.title,
            location: d.location,
            images: [d.image, ...d.images.map((i) => i.image)].filter((x): x is string => Boolean(x)),
          }))
          .filter((p) => p.images.length > 0),
      );
    })()
      .catch(() => {
        /* API unavailable — the built-in projects are enough. */
      })
      .finally(() => window.clearTimeout(timer));
    return () => {
      window.clearTimeout(timer);
      ctrl.abort();
    };
  }, [locale, known]);

  return items;
}
