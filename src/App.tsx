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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-agri-500 selection:text-slate-950">
      
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

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500 glass-panel mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Smart India Hackathon 2025 | Problem ID: 25030 - AgriMitra Platform</span>
          <span className="text-agri-400 font-semibold">Empowering Indian Farmers with Multimodal AI</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
