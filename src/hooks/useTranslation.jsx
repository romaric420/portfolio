import React, { useState, useEffect, createContext, useContext } from 'react';
import frTranslations from '../locales/fr.json';
import enTranslations from '../locales/en.json';

const translations = {
  fr: frTranslations,
  en: enTranslations
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang');
      return saved === 'en' || saved === 'fr' ? saved : 'fr';
    } catch {
      return 'fr';
    }
  });

  // Langue mémorisée entre les visites et reflétée sur <html lang>
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // stockage indisponible (navigation privée) : on ignore
    }
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const setLanguage = (newLang) => {
    setLang(newLang);
  };

  const value = {
    lang,
    toggleLang,
    setLanguage,
    translations: translations[lang],
    loading: false
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export default useTranslation;