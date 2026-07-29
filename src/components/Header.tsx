import React, { useState } from 'react';
import { Globe, MapPin, Sprout, Menu } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { KisanProfile } from './KisanProfile';

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
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0a1406]/95 via-[#0c1a2a]/90 to-[#0a1406]/95 backdrop-blur-xl border-b border-[#a3e635]/20 flex flex-col shadow-lg shadow-black/30">
      {/* Tagline */}
      <div className="w-full bg-[#a3e635] text-[#0a1406] text-center text-[10px] sm:text-xs font-bold py-1 uppercase tracking-[0.2em] shadow-sm">
        Jai Jawan Jai Kisan
      </div>
      <div className="px-4 lg:px-8 h-16 flex items-center w-full">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
        
        {/* Left Side: Hamburger & Brand */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Navigation - Hamburger Menu */}
          <div className="relative">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="p-2 rounded-xl bg-[#0e1a0b] border border-[#a3e635]/25 text-[#d9f99d] hover:bg-[#a3e635]/20 transition-all shadow-sm flex items-center gap-2"
            >
              <Menu className="w-5 h-5 text-[#a3e635]" />
            </button>

            {isNavOpen && (
              <>
                {/* Click-away overlay */}
                <div className="fixed inset-0 z-40" onClick={() => setIsNavOpen(false)} />

                <nav className="absolute top-full mt-3 left-0 w-60 z-50 flex flex-col gap-1.5 bg-gradient-to-b from-[#0e1a0b]/95 to-[#0c1a2a]/95 backdrop-blur-xl p-3 rounded-2xl border border-[#a3e635]/25 shadow-2xl animate-fadeIn">
                  <div className="px-2 pb-2 mb-1 text-[10px] font-mono text-[#a3e635]/70 uppercase tracking-widest border-b border-[#a3e635]/15">
                    Main Menu
                  </div>
                  <button
                    onClick={() => { setActiveTab('recommend'); setIsNavOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-3 ${
                      activeTab === 'recommend'
                        ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold shadow-md shadow-[#a3e635]/20'
                        : 'text-[#d9f99d] hover:bg-[#a3e635]/10 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">🌾</span> <span className="text-sm">{t.getRecommendation}</span>
                  </button>
                  
                  <button
                    onClick={() => { setActiveTab('weather'); setIsNavOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-3 ${
                      activeTab === 'weather'
                        ? 'bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-[#0a1406] font-bold shadow-md shadow-[#38bdf8]/20'
                        : 'text-[#d9f99d] hover:bg-[#38bdf8]/10 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">🌤️</span> <span className="text-sm">Weather</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('mandi'); setIsNavOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-3 ${
                      activeTab === 'mandi'
                        ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold shadow-md shadow-[#a3e635]/20'
                        : 'text-[#d9f99d] hover:bg-[#a3e635]/10 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">💰</span> <span className="text-sm">Mandi Rates</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('soil'); setIsNavOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-3 ${
                      activeTab === 'soil'
                        ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold shadow-md shadow-[#a3e635]/20'
                        : 'text-[#d9f99d] hover:bg-[#a3e635]/10 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">🧪</span> <span className="text-sm">Soil Card</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('learn'); setIsNavOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-3 ${
                      activeTab === 'learn'
                        ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold shadow-md shadow-[#a3e635]/20'
                        : 'text-[#d9f99d] hover:bg-[#a3e635]/10 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">📚</span> <span className="text-sm">AgriGyan</span>
                  </button>
                </nav>
              </>
            )}
          </div>

          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('recommend')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#84cc16] via-[#a3e635] to-[#38bdf8] p-0.5 shadow-md flex items-center justify-center">
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
                <span className="px-2 py-0.5 text-[10px] font-mono font-medium text-[#38bdf8] bg-[#0c1a2a] border border-[#38bdf8]/30 rounded-md">
                  SIH #25030
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Location, Language & Kisan Profile */}
        <div className="flex items-center gap-2.5 ml-auto">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e1a0b] border border-[#a3e635]/25 text-xs font-mono text-[#d9f99d] shadow-inner shadow-[#a3e635]/5">
            <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
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

          {/* Kisan Profile - Top Right Corner */}
          <KisanProfile farmerName="Harsh Vardhan" location={location} />
        </div>

        </div>
      </div>
    </header>
  );
};
