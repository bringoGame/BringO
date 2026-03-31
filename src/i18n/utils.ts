import { ui, defaultLang, type Lang } from './ui';

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let result: any = ui[lang];
    for (const k of keys) {
      result = result?.[k];
    }
    if (result === undefined) {
      // Fallback to default language
      let fallback: any = ui[defaultLang];
      for (const k of keys) {
        fallback = fallback?.[k];
      }
      return fallback ?? key;
    }
    return result;
  };
}

export function useTranslatedArray(lang: Lang) {
  return function ta(key: string): any[] {
    const keys = key.split('.');
    let result: any = ui[lang];
    for (const k of keys) {
      result = result?.[k];
    }
    if (result === undefined) {
      let fallback: any = ui[defaultLang];
      for (const k of keys) {
        fallback = fallback?.[k];
      }
      return fallback ?? [];
    }
    return result;
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path || '/';
  return `/${lang}${path || '/'}`;
}

export const languages: Record<Lang, string> = {
  en: 'EN',
  ru: 'RU',
  ro: 'RO',
};
