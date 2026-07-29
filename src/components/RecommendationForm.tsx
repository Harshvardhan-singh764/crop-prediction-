import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, Thermometer, Droplets, CloudRain, Sun, Leaf } from 'lucide-react';
import { LanguageCode, RecommendationInput } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpeechService } from '../services/speechService';

interface FormProps {
  currentLang: LanguageCode;
  onSubmit: (input: RecommendationInput) => void;
  isAnalyzing: boolean;
}

export const RecommendationForm: React.FC<FormProps> = ({
  currentLang,
  onSubmit,
  isAnalyzing
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const [nitrogen, setNitrogen] = useState<number>(90);
  const [phosphorus, setPhosphorus] = useState<number>(42);
  const [potassium, setPotassium] = useState<number>(43);
  const [ph, setPh] = useState<number>(6.5);
  const [temperature, setTemperature] = useState<number>(26);
  const [humidity, setHumidity] = useState<number>(80);
  const [rainfall, setRainfall] = useState<number>(180);
  const [season, setSeason] = useState<'kharif' | 'rabi' | 'zaid'>('kharif');
  const [soilType, setSoilType] = useState<'black' | 'alluvial' | 'red' | 'clayey' | 'sandy' | 'loamy'>('alluvial');
  const [waterAvailability, setWaterAvailability] = useState<'high' | 'medium' | 'low'>('high');
  const [location, setLocation] = useState<string>('Pune, Maharashtra');

  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [voiceError, setVoiceError] = useState<string>('');

  const handleVoiceToggle = () => {
    if (isListening) {
      SpeechService.stopListening();
      setIsListening(false);
    } else {
      setVoiceError('');
      setIsListening(true);
      SpeechService.startListening(
        currentLang,
        (text) => {
          setTranscript(text);
          parseVoiceTranscript(text);
        },
        (err) => {
          setVoiceError(err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  const parseVoiceTranscript = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('black') || lower.includes('काली') || lower.includes('काळी')) setSoilType('black');
    if (lower.includes('red') || lower.includes('लाल')) setSoilType('red');
    if (lower.includes('sandy') || lower.includes('रेतीली')) setSoilType('sandy');

    if (lower.includes('high rain') || lower.includes('भारी बारिश') || lower.includes('जास्त पाऊस')) setRainfall(240);
    if (lower.includes('low rain') || lower.includes('कम बारिश') || lower.includes('कमी पाऊस')) setRainfall(60);

    if (lower.includes('kharif') || lower.includes('खरीफ')) setSeason('kharif');
    if (lower.includes('rabi') || lower.includes('रबी')) setSeason('rabi');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      nitrogen,
      phosphorus,
      potassium,
      ph,
      temperature,
      humidity,
      rainfall,
      season,
      soilType,
      waterAvailability,
      location,
      state: location.split(',')[1]?.trim() || 'Maharashtra'
    });
  };

  return (
    <div className="vercel-card p-6 lg:p-10 w-full min-h-[calc(100vh-200px)] mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Natural Greenish Yellow Mesh Backdrop */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-gradient-to-r from-[#a3e635]/25 via-[#facc15]/20 to-[#4ade80]/20 blur-[110px] pointer-events-none rounded-full" />

      {/* Hero Header Section */}
      <div className="mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e1a0b] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
          <span>Natural Farm AI Telemetry Engine</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f7fee7] mb-3">
          AI Crop Recommendation Platform
        </h2>

        <p className="text-sm text-[#d9f99d] max-w-xl mx-auto font-sans">
          State-of-the-art agricultural decision pipeline integrating soil NPK composition, real-time climate telemetry, and market demand vectors.
        </p>

        {/* Voice Input Container */}
        <div className="mt-8 p-6 rounded-2xl bg-[#0b1408] border border-[#a3e635]/25 max-w-2xl mx-auto relative overflow-hidden shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-xs font-mono text-[#a3e635] font-semibold uppercase tracking-wider block mb-1">
                Voice Telemetry Input
              </span>
              <p className="text-xs text-[#f7fee7] font-medium">
                {t.voicePrompt}
              </p>
            </div>

            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                isListening
                  ? 'bg-[#ee0000] text-white voice-active-vercel'
                  : 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] hover:brightness-110 shadow-md shadow-[#a3e635]/25'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 animate-bounce" />
                  <span>Recording...</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>{t.speakNow}</span>
                </>
              )}
            </button>
          </div>

          {transcript && (
            <div className="mt-4 p-3 rounded-xl bg-[#0a1406] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635] text-left">
              <span className="text-[#facc15]">Transcript: </span> "{transcript}"
            </div>
          )}

          {voiceError && (
            <p className="mt-3 text-xs font-mono text-[#f87171] text-left">
              {voiceError}
            </p>
          )}
        </div>
      </div>

      {/* Manual Controls */}
      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        
        {/* Soil NPK & pH Matrix */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-4 h-4 text-[#a3e635]" />
            <h3 className="text-sm font-bold text-[#f7fee7] uppercase tracking-wider font-mono">{t.soilDetails}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl bg-[#0b1408] border border-[#a3e635]/20">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="text-[#d9f99d]">{t.nitrogen}</label>
                <span className="text-[#a3e635] font-bold">{nitrogen} kg/ha</span>
              </div>
              <input
                type="range"
                min="0"
                max="140"
                value={nitrogen}
                onChange={(e) => setNitrogen(Number(e.target.value))}
                className="w-full accent-[#a3e635] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#0b1408] border border-[#a3e635]/20">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="text-[#d9f99d]">{t.phosphorus}</label>
                <span className="text-[#facc15] font-bold">{phosphorus} kg/ha</span>
              </div>
              <input
                type="range"
                min="5"
                max="145"
                value={phosphorus}
                onChange={(e) => setPhosphorus(Number(e.target.value))}
                className="w-full accent-[#facc15] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#0b1408] border border-[#a3e635]/20">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="text-[#d9f99d]">{t.potassium}</label>
                <span className="text-[#4ade80] font-bold">{potassium} kg/ha</span>
              </div>
              <input
                type="range"
                min="5"
                max="205"
                value={potassium}
                onChange={(e) => setPotassium(Number(e.target.value))}
                className="w-full accent-[#4ade80] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#0b1408] border border-[#a3e635]/20">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="text-[#d9f99d]">{t.phLevel}</label>
                <span className="text-[#facc15] font-bold">pH {ph}</span>
              </div>
              <input
                type="range"
                min="3.5"
                max="9.0"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                className="w-full accent-[#facc15] cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Climate & Weather */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-4 h-4 text-[#facc15]" />
            <h3 className="text-sm font-bold text-[#f7fee7] uppercase tracking-wider font-mono">{t.climateDetails}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-[#0b1408] border border-[#a3e635]/20">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="text-[#d9f99d] flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#facc15]" />
                  {t.temperature}
                </label>
                <span className="text-white font-bold">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-[#facc15] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#0b1408] border border-[#a3e635]/20">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="text-[#d9f99d] flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-[#a3e635]" />
                  {t.humidity}
                </label>
                <span className="text-white font-bold">{humidity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full accent-[#a3e635] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#0b1408] border border-[#a3e635]/20">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="text-[#d9f99d] flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-[#4ade80]" />
                  {t.rainfall}
                </label>
                <span className="text-white font-bold">{rainfall} mm</span>
              </div>
              <input
                type="range"
                min="30"
                max="350"
                value={rainfall}
                onChange={(e) => setRainfall(Number(e.target.value))}
                className="w-full accent-[#4ade80] cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#d9f99d] mb-1.5">{t.season}</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value as any)}
                className="w-full vercel-input rounded-xl p-3 text-xs font-mono focus:outline-none"
              >
                <option value="kharif" className="bg-[#0a1406]">Kharif (Monsoon / June - Oct)</option>
                <option value="rabi" className="bg-[#0a1406]">Rabi (Winter / Nov - April)</option>
                <option value="zaid" className="bg-[#0a1406]">Zaid (Summer / March - June)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#d9f99d] mb-1.5">{t.soilType}</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value as any)}
                className="w-full vercel-input rounded-xl p-3 text-xs font-mono focus:outline-none"
              >
                <option value="alluvial" className="bg-[#0a1406]">Alluvial Soil (जलोढ़)</option>
                <option value="black" className="bg-[#0a1406]">Black Soil / Regur (काली)</option>
                <option value="red" className="bg-[#0a1406]">Red & Yellow Soil (लाल)</option>
                <option value="clayey" className="bg-[#0a1406]">Clayey Soil (चिकनी)</option>
                <option value="sandy" className="bg-[#0a1406]">Sandy Loam (बलुई)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#d9f99d] mb-1.5">{t.waterSource}</label>
              <select
                value={waterAvailability}
                onChange={(e) => setWaterAvailability(e.target.value as any)}
                className="w-full vercel-input rounded-xl p-3 text-xs font-mono focus:outline-none"
              >
                <option value="high" className="bg-[#0a1406]">High (Canal / Continuous Drip)</option>
                <option value="medium" className="bg-[#0a1406]">Medium (Borewell / Moderate)</option>
                <option value="low" className="bg-[#0a1406]">Low (Rainfed / Dryland)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full py-4 rounded-full vercel-button-primary text-sm tracking-wide active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0a1406] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-xs uppercase tracking-wider">{t.analyzing}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#0a1406]" />
              <span>{t.analyzeButton}</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
};
