import React from 'react';
import { Globe, MapPin, Sprout } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  location: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  setActiveTab,
  location
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  return (
    <header className="sticky top-0 z-50 bg-[#0a1406]/90 backdrop-blur-md border-b border-[#a3e635]/20 px-4 lg:px-8 h-16 flex items-center shadow-lg">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('recommend')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#84cc16] via-[#a3e635] to-[#facc15] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#0a1406] rounded-[6px] flex items-center justify-center">
              <Sprout className="w-4 h-4 text-[#a3e635] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-[#f7fee7] flex items-center gap-1.5">
                {t.appTitle}
                <span className="text-gradient-develop text-xs font-mono font-semibold">▲ AI</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-medium text-[#a3e635] bg-[#12210b] border border-[#a3e635]/30 rounded-md">
                SIH #25030
              </span>
            </div>
          </div>
        </div>

        {/* Natural Greenish Yellow Segmented Tabs */}
        <nav className="flex items-center gap-1 bg-[#0e1a0b] p-1 rounded-full border border-[#a3e635]/25 text-xs font-medium">
          <button
            onClick={() => setActiveTab('recommend')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'recommend'
                ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold shadow-md shadow-[#a3e635]/20'
                : 'text-[#d9f99d] hover:text-white'
            }`}
          >
            🌾 {t.getRecommendation}
          </button>
          
          <button
            onClick={() => setActiveTab('weather')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'weather'
                ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold shadow-md shadow-[#a3e635]/20'
                : 'text-[#d9f99d] hover:text-white'
            }`}
          >
            🌤️ Weather
          </button>

          <button
            onClick={() => setActiveTab('mandi')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'mandi'
                ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold shadow-md shadow-[#a3e635]/20'
                : 'text-[#d9f99d] hover:text-white'
            }`}
          >
            💰 Mandi Rates
          </button>

          <button
            onClick={() => setActiveTab('soil')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'soil'
                ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold shadow-md shadow-[#a3e635]/20'
                : 'text-[#d9f99d] hover:text-white'
            }`}
          >
            🧪 Soil Card
          </button>

          <button
            onClick={() => setActiveTab('learn')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'learn'
                ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold shadow-md shadow-[#a3e635]/20'
                : 'text-[#d9f99d] hover:text-white'
            }`}
          >
            📚 AgriGyan
          </button>
        </nav>

        {/* Location & Language Pill */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e1a0b] border border-[#a3e635]/25 text-xs font-mono text-[#d9f99d]">
            <MapPin className="w-3.5 h-3.5 text-[#a3e635]" />
            <span>{location}</span>
          </div>

          <div className="relative flex items-center bg-[#0e1a0b] border border-[#a3e635]/25 rounded-full px-3 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-[#facc15] mr-1.5" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className="bg-transparent text-[#f7fee7] font-medium focus:outline-none cursor-pointer pr-1 text-xs"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#0a1406] text-[#f7fee7]">
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </header>
  );
};
