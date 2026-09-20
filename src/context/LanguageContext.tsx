import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, LanguageOption, TRANSLATIONS, TranslationSchema } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  currentOption: LanguageOption;
  languages: LanguageOption[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'massoterapia_selected_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      // 1. Check URL query param ?lang= for search engine indexing & direct links
      if (typeof window !== 'undefined' && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang')?.toLowerCase();
        if (urlLang && ['pt', 'es', 'en', 'it', 'fr', 'he'].includes(urlLang)) {
          return urlLang as Language;
        }
      }

      // 2. Check saved preference
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ['pt', 'es', 'en', 'it', 'fr', 'he'].includes(saved)) {
        return saved as Language;
      }
      // 3. Check browser navigator language
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (browserLang === 'es') return 'es';
      if (browserLang === 'en') return 'en';
      if (browserLang === 'it') return 'it';
      if (browserLang === 'fr') return 'fr';
      if (browserLang === 'he') return 'he';
    } catch {
      // ignore
    }
    return 'pt';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  const isRTL = language === 'he';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.pt;
  const currentOption = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentOption,
        languages: LANGUAGES,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
