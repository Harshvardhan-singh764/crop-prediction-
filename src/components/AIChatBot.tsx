import React, { useState } from 'react';
import { Send, X, Bot, Sprout } from 'lucide-react';
import { LanguageCode } from '../types';
import { SpeechService } from '../services/speechService';

interface ChatProps {
  currentLang: LanguageCode;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export const AIChatBot: React.FC<ChatProps> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Namaste! I am AgriMitra AI. Ask me anything about crop telemetry, fertilizers, or Mandi rates in your regional language!'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let botResponse = 'AgriMitra AI recommends conducting a soil NPK test at your nearest KVK (Krishi Vigyan Kendra) center for precise advice.';
      const lower = userMsg.toLowerCase();

      if (lower.includes('fertilizer') || lower.includes('खाद')) {
        botResponse = 'For Kharif crops like Paddy or Maize, apply 50% Nitrogen during basal land prep, and split remaining N at tillering and flowering stages.';
      } else if (lower.includes('rain') || lower.includes('weather') || lower.includes('बारिश')) {
        botResponse = 'Heavy rainfall is expected in Maharashtra & Gujarat over the next 48 hours. Ensure field drainage channels are clear.';
      } else if (lower.includes('cotton') || lower.includes('कपास')) {
        botResponse = 'For Cotton bollworm control, spray Neem Oil 10,000 PPM or install pheromone traps @ 5 per acre.';
      } else if (lower.includes('price') || lower.includes('भाव') || lower.includes('rate')) {
        botResponse = 'Current Cotton prices in Rajkot Mandi are ₹7,200/Qtl, while Chickpea in Latur APMC is ₹5,450/Qtl.';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      SpeechService.speak(botResponse, currentLang);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] shadow-lg shadow-[#a3e635]/30 hover:brightness-110 transition-all font-mono text-xs font-bold flex items-center gap-2 cursor-pointer border border-[#a3e635]/40"
      >
        <Sprout className="w-4 h-4 text-[#0a1406]" />
        <span className="hidden sm:inline">Ask AgriMitra ▲ AI</span>
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[90vw] sm:w-[380px] h-[480px] vercel-card border border-[#a3e635]/30 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-[#0e1a0b] border-b border-[#a3e635]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#a3e635]" />
              <h3 className="font-mono text-xs font-bold text-[#f7fee7] uppercase tracking-wider">AgriMitra Natural Telemetry AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#a3e635] hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-5 h-5 rounded-full bg-[#12210b] border border-[#a3e635]/30 text-[#a3e635] flex items-center justify-center shrink-0 text-[10px] font-mono">
                    🌿
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl max-w-[80%] ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0a1406] font-bold'
                      : 'bg-[#0b1408] text-[#f7fee7] border border-[#a3e635]/20'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-[#0e1a0b] border-t border-[#a3e635]/20 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 vercel-input rounded-lg px-3 py-2 text-xs font-sans"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-lg bg-[#a3e635] text-[#0a1406] hover:brightness-110 transition-all font-bold"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
