import { createContext, useContext } from 'react';
import { en, type Dictionary } from './en';
import { ru } from './ru';
import { uz } from './uz';

export type { Dictionary };

export const locales = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

/** The default locale is served from "/", the others from "/<locale>/". */
export const defaultLocale: Locale = 'uz';

export const localeInfo: Record<Locale, { label: string; name: string; ogLocale: string; hreflang: string }> = {
  uz: { label: 'UZ', name: 'O‘zbekcha', ogLocale: 'uz_UZ', hreflang: 'uz' },
  ru: { label: 'RU', name: 'Русский', ogLocale: 'ru_RU', hreflang: 'ru' },
  en: { label: 'EN', name: 'English', ogLocale: 'en_US', hreflang: 'en' },
};

const dictionaries: Record<Locale, Dictionary> = { uz, ru, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];

export const localePath = (locale: Locale) => (locale === defaultLocale ? '/' : `/${locale}/`);

export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return (locales as readonly string[]).includes(first) ? (first as Locale) : defaultLocale;
}

interface I18nValue {
  locale: Locale;
  t: Dictionary;
}

export const I18nContext = createContext<I18nValue>({ locale: defaultLocale, t: uz });

export const useI18n = () => useContext(I18nContext);
