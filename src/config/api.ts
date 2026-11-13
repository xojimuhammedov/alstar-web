// Content API (alstar-backend, Django). The pre-rendered HTML never depends on it:
// sections render their static i18n content first and refresh from the API in the
// browser, so the site still works when the API is down or not configured.

const fromEnv = (import.meta.env.VITE_API_URL as string | undefined)?.trim().replace(/\/$/, '');

/** Empty string = no API configured (production build without VITE_API_URL). */
export const API_URL = fromEnv ?? (import.meta.env.DEV ? 'http://localhost:8000' : '');

export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

/** `/api/finish-variants/` item (with `?lang=`). */
export interface FinishVariantDto {
  id: string;
  slug: string;
  finish: string;
  code: string;
  ral: string;
  image: string | null;
  order: number;
  name: string;
}

/** `/api/finishes/` item (with `?lang=`). */
export interface FinishDto {
  id: string;
  slug: string;
  order: number;
  image: string | null;
  name: string;
  featured: FinishVariantDto | null;
  variants_count: number;
  variants: FinishVariantDto[];
}
