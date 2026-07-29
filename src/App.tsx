import React, { useState } from 'react';
import { Header } from './components/Header';
import { FarmMarquee } from './components/FarmMarquee';
import { RecommendationForm } from './components/RecommendationForm';
import { RecommendationResultView } from './components/RecommendationResultView';
import { WeatherWidget } from './components/WeatherWidget';
import { MandiPricesWidget } from './components/MandiPricesWidget';
import { SoilHealthCard } from './components/SoilHealthCard';
import { AgriGyan } from './components/AgriGyan';
import { AIChatBot } from './components/AIChatBot';
import { CropMatchResult, LanguageCode, RecommendationInput } from './types';
import { calculateCropRecommendations } from './services/recommendationEngine';
import { Heart, Code2 } from 'lucide-react';
import { RedTractor } from './components/RedTractor';
import { CursorEffect } from './components/CursorEffect';

export function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('hi');
  const [activeTab, setActiveTab] = useState<string>('recommend');
  const [results, setResults] = useState<CropMatchResult[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<string>('village ayela agra');

  const handleFormSubmit = (input: RecommendationInput) => {
    setIsAnalyzing(true);
    setUserLocation(input.location);

    setTimeout(() => {
      const recs = calculateCropRecommendations(input);
      setResults(recs);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen text-[#f7fee7] flex flex-col selection:bg-[#a3e635] selection:text-[#0a1406]">
      
      {/* Top Header with Kisan Profile */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        location={userLocation}
      />

      {/* Continuously Scrolling Farm Equipment & Crops Image Marquee */}
      <FarmMarquee />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-none px-4 lg:px-8 py-8 h-full flex flex-col">
        
        {activeTab === 'recommend' && (
          <>
            {!results ? (
              <RecommendationForm
                currentLang={currentLang}
                onSubmit={handleFormSubmit}
                isAnalyzing={isAnalyzing}
              />
            ) : (
              <RecommendationResultView
                results={results}
                currentLang={currentLang}
                onReset={handleReset}
              />
            )}
          </>
        )}

        {activeTab === 'weather' && <WeatherWidget />}

        {activeTab === 'mandi' && <MandiPricesWidget />}

        {activeTab === 'soil' && <SoilHealthCard />}

        {activeTab === 'learn' && <AgriGyan />}

      </main>

      {/* Persistent AI Chatbot Drawer */}
      <AIChatBot currentLang={currentLang} />

      {/* Footer with Developer Name */}
      <footer className="border-t border-[#a3e635]/20 py-6 text-center text-xs text-[#d9f99d] bg-gradient-to-r from-[#0e1a0b]/90 via-[#0c1a2a]/80 to-[#0e1a0b]/90 backdrop-blur-md mt-12 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Smart India Hackathon 2025 | Problem ID: 25030 - AgriMitra</span>
          </div>

          {/* Developer Credit */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1406] border border-[#a3e635]/30 shadow-md">
            <Code2 className="w-4 h-4 text-[#a3e635]" />
            <span>Developed by</span>
            <span className="font-extrabold text-white text-sm bg-gradient-to-r from-[#a3e635] via-[#facc15] to-[#38bdf8] bg-clip-text text-transparent">
              Harsh Vardhan Singh
            </span>
          </div>

          <span className="text-[#38bdf8] font-semibold">Empowering Farmers with AI</span>
        </div>
      </footer>

      {/* Cursor Animation */}
      <CursorEffect />

      {/* Continuously moving red tractor at the bottom */}
      <RedTractor />

    </div>
  );
}

export default App;
