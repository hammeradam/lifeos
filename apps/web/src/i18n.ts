import en from '@/locales/en.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// manage translations separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    translation: en,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
