import React, { useState } from 'react';
import LanguageContext from './LanguageContext';
import EN from './locale/en';
import FR from './locale/fr';

const translations = {
  en: EN,
  fr: FR,
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
