import { useCallback, useEffect, useState } from 'react';
import { API_URL, getJson, type FinishDto } from '../config/api';
import { staticFinishes } from '../content/colourCatalog';
import type { Locale } from '../i18n';

/**
 * `source: 'static'` = the bundled catalogue (src/content/colourCatalog.ts), used
 * when no API is configured or the API fails, so the colours always show.
 */
export type FinishesState =
  | { status: 'loading'; data: null; source: 'api' }
  | { status: 'ready'; data: FinishDto[]; source: 'api' | 'static' };

const fallback = (locale: Locale): FinishesState => ({ status: 'ready', data: staticFinishes(locale), source: 'static' });

/** Finishes with their colour variants from the API, fetched after hydration. */
export function useFinishes(locale: Locale) {
  const [state, setState] = useState<FinishesState>(() =>
    API_URL ? { status: 'loading', data: null, source: 'api' } : fallback(locale),
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!API_URL) {
      setState(fallback(locale));
      return;
    }
    let cancelled = false;
    const ctrl = new AbortController();
    // A slow API turns into the static catalogue instead of an endless spinner.
    const timer = window.setTimeout(() => ctrl.abort(), 10_000);
    setState({ status: 'loading', data: null, source: 'api' });
    getJson<FinishDto[]>(`/api/finishes/?lang=${locale}`, ctrl.signal)
      .then((data) => !cancelled && setState({ status: 'ready', data, source: 'api' }))
      .catch(() => !cancelled && setState(fallback(locale)))
      .finally(() => window.clearTimeout(timer));
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      ctrl.abort();
    };
  }, [locale, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}
