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

/** `/api/projects/` item (with `?lang=`). */
export interface ProjectListDto {
  id: string;
  slug: string;
  order: number;
  image: string | null;
  location: string;
  year: number | null;
  is_featured: boolean;
  is_concept: boolean;
  title: string;
  image_alt: string;
}

/** `/api/projects/<slug>/` (with `?lang=`). */
export interface ProjectDetailDto extends ProjectListDto {
  description: string;
  products: string[];
  images: { id: string; image: string; order: number }[];
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
