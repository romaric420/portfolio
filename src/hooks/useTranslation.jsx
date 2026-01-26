import React, { useState, createContext, useContext } from 'react';
import frTranslations from '../locales/fr.json';
import enTranslations from '../locales/en.json';

const translations = {
  fr: frTranslations,
  en: enTranslations
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('fr');

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