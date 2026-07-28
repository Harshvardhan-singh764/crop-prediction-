import React, { useState } from 'react';
import { BookOpen, Award } from 'lucide-react';
import { QuizQuestion } from '../types';

export const AgriGyan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Which nutrient is primarily responsible for encouraging rapid vegetative stem and leaf growth in crops?',
      options: ['Potassium (K)', 'Nitrogen (N)', 'Zinc (Zn)', 'Phosphorus (P)'],
      correctAnswer: 1,
      explanation: 'Nitrogen (N) promotes rich chlorophyll synthesis, rapid leafy growth, and biomass production in paddy, wheat, and maize.'
    },
    {
      id: 2,
      question: 'What is the optimal soil pH range for most cereal and pulse crops in India?',
      options: ['pH 3.0 - 4.5', 'pH 6.0 - 7.5', 'pH 8.5 - 10.0', 'pH 1.0 - 2.5'],
      correctAnswer: 1,
      explanation: 'Slightly acidic to neutral pH (6.0 - 7.5) ensures maximum availability of essential macro and micro nutrients to root systems.'
    },
    {
      id: 3,
      question: 'Why are leguminous pulse crops like Chickpea (Chana) and Groundnut beneficial for crop rotation?',
      options: ['They consume maximum water', 'They fix atmospheric nitrogen in soil', 'They require high synthetic fertilizer', 'They reduce soil carbon'],
      correctAnswer: 1,
      explanation: 'Pulse crops form symbiotic root nodule associations with Rhizobium bacteria, naturally enriching soil nitrogen reserves.'
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOpt(index);
    if (index === quizQuestions[currentQ].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOpt(null);
    } else {
      setShowResult(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn font-sans">
      
      {/* Tab Switcher */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setActiveTab('learn')}
          className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'learn'
              ? 'bg-white text-black font-bold shadow-sm'
              : 'bg-[#0a0a0a] text-[#888888] border border-[#262626]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Agri-Gyan Telemetry Guides
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-white text-black font-bold shadow-sm'
              : 'bg-[#0a0a0a] text-[#888888] border border-[#262626]'
          }`}
        >
          <Award className="w-4 h-4 text-[#f5a623]" />
          Interactive Farmer Quiz
        </button>
      </div>

      {activeTab === 'learn' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="vercel-card p-6 border border-[#262626] space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-[#111111] border border-[#262626] text-[10px] font-mono font-bold text-[#50e3c2] inline-block">
              🌱 Soil Mineral Chemistry
            </span>
            <h3 className="font-bold text-white text-base">Understanding N-P-K Mineral Balance</h3>
            <p className="text-xs text-[#a1a1a1] leading-relaxed">
              Nitrogen (N) builds leaf stems, Phosphorus (P) fuels strong root establishment, and Potassium (K) boosts disease resistance and fruit/grain filling.
            </p>
          </div>

          <div className="vercel-card p-6 border border-[#262626] space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-[#111111] border border-[#262626] text-[10px] font-mono font-bold text-[#0070f3] inline-block">
              💧 Drip Telemetry & Irrigation
            </span>
            <h3 className="font-bold text-white text-base">Drip & Fertigation Efficiency</h3>
            <p className="text-xs text-[#a1a1a1] leading-relaxed">
              Drip irrigation delivers up to 90% water use efficiency compared to flood irrigation, saving electricity pumping costs and reducing weed growth.
            </p>
          </div>

          <div className="vercel-card p-6 border border-[#262626] space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-[#111111] border border-[#262626] text-[10px] font-mono font-bold text-[#f5a623] inline-block">
              🌤️ Climate Smart Farming
            </span>
            <h3 className="font-bold text-white text-base">Weather-Resilient Crop Selection</h3>
            <p className="text-xs text-[#a1a1a1] leading-relaxed">
              Selecting crops suited to local rainfall trends prevents economic loss during erratic monsoon delays.
            </p>
          </div>

          <div className="vercel-card p-6 border border-[#262626] space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-[#111111] border border-[#262626] text-[10px] font-mono font-bold text-[#7928ca] inline-block">
              🐛 Integrated Pest Management
            </span>
            <h3 className="font-bold text-white text-base">Biological & Organic Pest Defense</h3>
            <p className="text-xs text-[#a1a1a1] leading-relaxed">
              Use Neem oil spray (10,000 ppm) and yellow sticky traps for early whitefly and aphid management without soil chemical toxicity.
            </p>
          </div>

        </div>
      ) : (
        <div className="vercel-card p-6 sm:p-8 border border-[#262626] max-w-2xl mx-auto shadow-2xl">
          
          {!showResult ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-mono text-[#888888] border-b border-[#262626] pb-4">
                <span>Question {currentQ + 1} of {quizQuestions.length}</span>
                <span className="text-[#f5a623]">Score: {score}</span>
              </div>

              <h3 className="text-base font-extrabold text-white">
                {quizQuestions[currentQ].question}
              </h3>

              <div className="space-y-3">
                {quizQuestions[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={selectedOpt !== null}
                    className={`w-full text-left p-4 rounded-xl text-xs font-medium transition-all border ${
                      selectedOpt === idx
                        ? idx === quizQuestions[currentQ].correctAnswer
                          ? 'bg-[#0070f3] text-white border-[#0070f3]'
                          : 'bg-[#ee0000] text-white border-[#ee0000]'
                        : 'bg-[#000000] text-[#ededed] border-[#262626] hover:border-[#444444]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {selectedOpt !== null && (
                <div className="p-4 rounded-xl bg-[#000000] border border-[#262626] text-xs space-y-3">
                  <p className="text-[#a1a1a1]">
                    <span className="font-mono font-bold text-[#f5a623]">Explanation: </span>
                    {quizQuestions[currentQ].explanation}
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-2.5 rounded-full bg-white text-black font-mono font-bold text-xs"
                  >
                    Next Question →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <span className="text-4xl">🏆</span>
              <h3 className="text-2xl font-extrabold text-white">Quiz Completed!</h3>
              <p className="text-xs font-mono text-[#a1a1a1]">
                Score: <span className="text-[#50e3c2] font-bold">{score}</span> / {quizQuestions.length}
              </p>
              <button
                onClick={handleResetQuiz}
                className="vercel-button-primary px-6 py-2 text-xs font-mono font-bold"
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
