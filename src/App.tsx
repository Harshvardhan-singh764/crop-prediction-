import React, { useState } from 'react';
import { Header } from './components/Header';
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

export function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('hi');
  const [activeTab, setActiveTab] = useState<string>('recommend');
  const [results, setResults] = useState<CropMatchResult[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<string>('Satara, Maharashtra');

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
      
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        location={userLocation}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        
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
      <footer className="border-t border-[#a3e635]/20 py-6 text-center text-xs text-[#d9f99d] bg-[#0e1a0b]/80 backdrop-blur-md mt-12 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Smart India Hackathon 2025 | Problem ID: 25030 - AgriMitra</span>
          </div>

          {/* Developer Credit */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1406] border border-[#a3e635]/30 shadow-md">
            <Code2 className="w-4 h-4 text-[#a3e635]" />
            <span>Developed by</span>
            <span className="font-extrabold text-white text-sm bg-gradient-to-r from-[#a3e635] via-[#facc15] to-[#4ade80] bg-clip-text text-transparent">
              Harsh Vardhan Singh
            </span>
          </div>

          <span className="text-[#a3e635] font-semibold">Empowering Farmers with AI</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
