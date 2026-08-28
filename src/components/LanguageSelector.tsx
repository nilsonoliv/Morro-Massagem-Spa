import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language, LANGUAGES } from '../i18n/translations';
import { FlagIcon } from './FlagIcon';

interface LanguageSelectorProps {
  variant?: 'compact' | 'full' | 'dropdown';
  className?: string;
  onSelect?: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'compact', 
  className = '',
  onSelect
}) => {
  const { language, setLanguage, t } = useLanguage();

  const handleSelect = (langCode: Language) => {
    setLanguage(langCode);
    if (onSelect) onSelect();
  };

  if (variant === 'full') {
    return (
      <div className={`space-y-2 ${className}`}>
        <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
          {t.nav.selectLanguage}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                id={`btn-lang-${lang.code}`}
                onClick={() => handleSelect(lang.code)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center ${
                  isSelected
                    ? 'bg-[#2C3639] text-[#F5F2ED] border-[#2C3639] shadow-xs scale-105'
                    : 'bg-white/80 hover:bg-white text-stone-700 border-black/5 hover:border-black/15'
                }`}
                title={`${lang.country} (${lang.nativeName})`}
                aria-label={`Traduzir para ${lang.name} (${lang.country})`}
              >
                <div className="w-6 h-4 mb-1 flex items-center justify-center">
                  <FlagIcon language={lang.code} className="w-5 h-3.5" />
                </div>
                <span className="text-[11px] font-semibold leading-none">{lang.nativeName}</span>
                <span className={`text-[9px] opacity-70 mt-0.5 leading-none ${isSelected ? 'text-[#78A1BB]' : 'text-stone-500'}`}>
                  {lang.country}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact variant for Navbar header
  return (
    <div className={`flex items-center gap-1.5 p-1 rounded-full bg-white/70 backdrop-blur-xs border border-black/5 ${className}`}>
      {LANGUAGES.map((lang) => {
        const isSelected = language === lang.code;
        return (
          <button
            key={lang.code}
            id={`nav-flag-btn-${lang.code}`}
            onClick={() => handleSelect(lang.code)}
            className={`relative group flex items-center justify-center p-1.5 rounded-full transition-all duration-200 ${
              isSelected
                ? 'bg-[#2C3639] ring-2 ring-[#4A5D4E] scale-110 shadow-xs'
                : 'hover:bg-black/5 hover:scale-105 opacity-75 hover:opacity-100'
            }`}
            title={`${lang.country} - ${lang.nativeName}`}
            aria-label={`Traduzir para ${lang.name} (${lang.country})`}
          >
            <div className="w-5 h-3.5 flex items-center justify-center pointer-events-none">
              <FlagIcon language={lang.code} className="w-5 h-3.5" />
            </div>

            {/* Micro tooltip */}
            <span className="sr-only sm:not-sr-only pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2C3639] text-[#F5F2ED] text-[10px] font-medium px-2 py-0.5 rounded shadow-md whitespace-nowrap z-50">
              {lang.nativeName}
            </span>
          </button>
        );
      })}
    </div>
  );
};
