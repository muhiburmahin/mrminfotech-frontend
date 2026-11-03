'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'bn' : 'en');
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-300 hover:text-white bg-[#0B1E3B] border border-[#1E3557] hover:border-[#00C2FF]/40 transition-colors"
      aria-label="Toggle language"
      title="Switch English / বাংলা"
    >
      <Languages className="w-3.5 h-3.5 text-[#00C2FF]" />
      <span>{locale === 'en' ? 'বাংলা' : 'EN'}</span>
    </button>
  );
}
