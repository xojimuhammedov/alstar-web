import { useCallback, useEffect, useState } from 'react';
import { API_URL, getJson, type FinishDto } from '../config/api';
import type { Locale } from '../i18n';

export type FinishesState =
  | { status: 'disabled' | 'loading' | 'error'; data: null }
  | { status: 'ready'; data: FinishDto[] };

/** Finishes with their colour variants from the API, fetched after hydration. */
export function useFinishes(locale: Locale) {
  const [state, setState] = useState<FinishesState>({ status: API_URL ? 'loading' : 'disabled', data: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!API_URL) return;
    let cancelled = false;
    const ctrl = new AbortController();
    // A slow API turns into the error state instead of an endless spinner.
    const timer = window.setTimeout(() => ctrl.abort(), 10_000);
    setState({ status: 'loading', data: null });
    getJson<FinishDto[]>(`/api/finishes/?lang=${locale}`, ctrl.signal)
      .then((data) => !cancelled && setState({ status: 'ready', data }))
      .catch(() => !cancelled && setState({ status: 'error', data: null }))
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
