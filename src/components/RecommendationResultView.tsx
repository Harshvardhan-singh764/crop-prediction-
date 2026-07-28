import React from 'react';
import { Volume2, VolumeX, CheckCircle, AlertTriangle, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { CropMatchResult, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpeechService } from '../services/speechService';

interface ResultViewProps {
  results: CropMatchResult[];
  currentLang: LanguageCode;
  onReset: () => void;
}

export const RecommendationResultView: React.FC<ResultViewProps> = ({
  results,
  currentLang,
  onReset
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
  const topMatch = results[0];
  const alternatives = results.slice(1, 4);

  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const handleSpeakRecommendation = () => {
    if (isSpeaking) {
      SpeechService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const cropName = currentLang === 'hi' ? topMatch.crop.hindiName : (currentLang === 'mr' ? topMatch.crop.marathiName : topMatch.crop.name);
      const speechText = `आपके खेत के लिए सबसे उपयुक्त फसल ${cropName} है। AI मैच स्कोर ${topMatch.confidenceScore} प्रतिशत है।`;
      SpeechService.speak(speechText, currentLang);
    }
  };

  if (!topMatch) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Primary Result Banner Card */}
      <div className="vercel-card p-6 sm:p-8 border border-[#262626] relative overflow-hidden shadow-2xl">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#0070f3]/20 via-[#7928ca]/15 to-[#ff0080]/10 blur-[90px] pointer-events-none" />

        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#262626]">
          <div>
            <span className="text-xs font-mono text-[#00dfd8] uppercase tracking-wider block mb-1">
              Top AI Telemetry Match
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2">
              <span className="text-gradient-develop">{topMatch.crop.name}</span>
              <span className="text-sm font-normal text-[#888888]">
                ({topMatch.crop.hindiName})
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right font-mono">
              <span className="text-[10px] text-[#888888] block uppercase">AI Match Score</span>
              <div className="text-2xl font-extrabold text-[#50e3c2] flex items-center justify-end gap-1">
                <Award className="w-5 h-5 text-[#f5a623]" />
                {topMatch.confidenceScore}%
              </div>
            </div>

            <button
              onClick={handleSpeakRecommendation}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 font-mono text-xs font-semibold ${
                isSpeaking
                  ? 'bg-[#f5a623] text-black scale-105'
                  : 'bg-white text-black hover:bg-[#ccc]'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{t.speakResult}</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Crop Image View */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-[#262626]">
            <img
              src={topMatch.crop.image}
              alt={topMatch.crop.name}
              className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
              <span className="text-[10px] font-mono text-[#50e3c2] uppercase tracking-wider">
                {topMatch.crop.category} • {topMatch.crop.scientificName}
              </span>
              <p className="text-xs text-[#ededed] mt-1 line-clamp-2">
                {topMatch.crop.description}
              </p>
            </div>
          </div>

          {/* Metric Cards & Reasons */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                <span className="text-[10px] font-mono text-[#888888] block mb-1">{t.expectedYield}</span>
                <span className="text-lg font-bold text-white font-mono">
                  🌾 {topMatch.crop.expectedYieldQuintalPerAcre} Qtl
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                <span className="text-[10px] font-mono text-[#888888] block mb-1">{t.marketPrice}</span>
                <span className="text-lg font-bold text-[#f5a623] font-mono">
                  ₹{topMatch.crop.avgMarketPricePerQuintal.toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#0070f3]/50 bg-[#0070f3]/10">
                <span className="text-[10px] font-mono text-[#00dfd8] block mb-1">{t.estRevenue}</span>
                <span className="text-lg font-extrabold text-[#00dfd8] font-mono">
                  ₹{topMatch.estimatedRevenuePerAcre.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Reasoning List */}
            <div className="p-5 rounded-xl bg-[#0a0a0a] border border-[#262626] space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#a1a1a1] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#50e3c2]" />
                {t.whyThisCrop}
              </h4>
              <ul className="space-y-2 text-xs text-[#ededed]">
                {topMatch.matchReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#50e3c2] shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Farm Advisory */}
            {topMatch.cautions.length > 0 && (
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#f5a623]/40 space-y-1">
                <h4 className="text-xs font-mono font-bold text-[#f5a623] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Telemetry Advisory Notice
                </h4>
                {topMatch.cautions.map((caution, idx) => (
                  <p key={idx} className="text-xs text-[#f5a623]/90">
                    • {caution}
                  </p>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Soil & Fertilizer Guide */}
        <div className="p-5 rounded-xl bg-[#0a0a0a] border border-[#262626]">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            🧪 {t.fertilizerGuide} ({topMatch.crop.name})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-3.5 rounded-xl bg-[#000000] border border-[#262626]">
              <span className="font-mono text-[#00dfd8] block mb-1 font-bold">Basal Sowing Dose</span>
              <p className="text-[#a1a1a1]">{topMatch.crop.fertilizerAdvisory.basal}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#000000] border border-[#262626]">
              <span className="font-mono text-[#f5a623] block mb-1 font-bold">Growth Top Dressing</span>
              <p className="text-[#a1a1a1]">{topMatch.crop.fertilizerAdvisory.topDressing}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#000000] border border-[#262626]">
              <span className="font-mono text-[#50e3c2] block mb-1 font-bold">FYM Organic Compost</span>
              <p className="text-[#a1a1a1]">{topMatch.crop.fertilizerAdvisory.organic}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Alternative Options Grid */}
      <div>
        <h3 className="text-base font-mono font-bold text-white mb-4">
          Alternative Crop Choices
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternatives.map((item, idx) => (
            <div key={idx} className="vercel-card p-5 border border-[#262626] space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-[#111111] text-[10px] font-mono text-[#888888] border border-[#262626]">
                  Option #{idx + 2}
                </span>
                <span className="text-xs font-mono font-bold text-[#50e3c2]">
                  {item.confidenceScore}% Match
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={item.crop.image}
                  alt={item.crop.name}
                  className="w-12 h-12 rounded-lg object-cover border border-[#262626]"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{item.crop.name}</h4>
                  <span className="text-xs text-[#888888]">{item.crop.hindiName}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs font-mono text-[#a1a1a1] pt-2 border-t border-[#262626]">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="text-white font-bold">{item.crop.growingDurationDays} Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Rate:</span>
                  <span className="text-[#f5a623] font-bold">₹{item.crop.avgMarketPricePerQuintal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recalculate Button */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="vercel-button-secondary px-6 py-2.5 text-xs font-mono font-semibold"
        >
          ← Adjust Parameters & Re-run Telemetry
        </button>
      </div>

    </div>
  );
};
