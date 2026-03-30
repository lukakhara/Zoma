// context/LanguageContext.tsx
import { createContext, useContext, useState, type  ReactNode } from 'react';

interface LanguageContextType {
  languageGeorgian: boolean;
  setLanguageGeorgian: (value: boolean) => void;
  toggleLanguage: () => void;
}


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [languageGeorgian, setLanguageGeorgian] = useState(false);

  const toggleLanguage = () => {
    setLanguageGeorgian(prev => !prev);
  };

  return (
    <LanguageContext.Provider 
      value={{ languageGeorgian, setLanguageGeorgian, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};