import React, { useState } from 'react';
import { User, ChevronDown, Phone, MapPin, Tractor } from 'lucide-react';

interface KisanProfileProps {
  farmerName: string;
  location: string;
}

export const KisanProfile: React.FC<KisanProfileProps> = ({ farmerName, location }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#1a2e12]/90 to-[#0c1f2e]/90 border border-[#a3e635]/30 hover:border-[#a3e635]/60 transition-all group cursor-pointer"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a3e635] via-[#84cc16] to-[#38bdf8] p-0.5 shadow-md shadow-[#a3e635]/20">
          <div className="w-full h-full rounded-full bg-[#0a1406] flex items-center justify-center">
            <User className="w-4 h-4 text-[#a3e635]" />
          </div>
        </div>
        <div className="hidden sm:block text-left">
          <span className="text-[10px] font-mono text-[#7dd3fc] block leading-none">किसान प्रोफाइल</span>
          <span className="text-xs font-bold text-[#f7fee7] leading-tight">{farmerName}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-[#a3e635] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Click-away overlay */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 top-full mt-2 w-[350px] sm:w-[450px] z-50 rounded-2xl overflow-hidden shadow-2xl border border-[#a3e635]/25 animate-fadeIn max-h-[85vh] overflow-y-auto vercel-scrollbar">
            <div className="bg-gradient-to-b from-[#0e1a0b]/95 to-[#0c1a2a]/95 backdrop-blur-xl p-5">
              
              {/* Profile Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#a3e635]/15">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#a3e635] via-[#facc15] to-[#38bdf8] p-0.5 shadow-lg shrink-0">
                  <div className="w-full h-full rounded-full bg-[#0a1406] flex items-center justify-center">
                    <Tractor className="w-7 h-7 text-[#a3e635]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-white flex justify-between">
                    {farmerName}
                    <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/40">KYC Verified</span>
                  </h3>
                  <span className="text-[10px] font-mono text-[#7dd3fc]">Kisan ID: AGRI-2025-UP-4821</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                    <span className="text-[10px] text-[#d9f99d]">Active Kisan • Age: 42 • exp: 20 Yrs</span>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-2.5 rounded-xl bg-[#0a1406]/80 border border-[#a3e635]/15 text-center">
                  <span className="text-[10px] text-[#7dd3fc] font-mono block">भूमि क्षेत्र (Land Area)</span>
                  <span className="text-sm font-bold text-white">4.5 एकड़ (Acre)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0a1406]/80 border border-[#38bdf8]/15 text-center">
                  <span className="text-[10px] text-[#7dd3fc] font-mono block">फसल चक्र (Season)</span>
                  <span className="text-sm font-bold text-white">खरीफ (Kharif)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0a1406]/80 border border-[#a3e635]/15 text-center">
                  <span className="text-[10px] text-[#7dd3fc] font-mono block">मिट्टी प्रकार (Soil)</span>
                  <span className="text-sm font-bold text-white">जलोढ़ (Alluvial)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0a1406]/80 border border-[#38bdf8]/15 text-center">
                  <span className="text-[10px] text-[#7dd3fc] font-mono block">सिंचाई (Irrigation)</span>
                  <span className="text-sm font-bold text-white">नहर + ट्यूबवेल</span>
                </div>
              </div>

              {/* Financial & Schemes */}
              <div className="mb-4 space-y-2">
                <h4 className="text-[10px] font-mono text-[#facc15] uppercase tracking-wider mb-1">Government Schemes & Finance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-[#1a2e12]/60 border border-[#4ade80]/20 flex justify-between items-center">
                    <span className="text-[10px] text-[#d9f99d]">PM-Kisan Samman</span>
                    <span className="text-[10px] font-bold text-[#4ade80]">Active (14th Installment)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#1a2e12]/60 border border-[#4ade80]/20 flex justify-between items-center">
                    <span className="text-[10px] text-[#d9f99d]">Kisan Credit Card (KCC)</span>
                    <span className="text-[10px] font-bold text-[#4ade80]">Linked • Limit: ₹1.5L</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#1a2e12]/60 border border-[#4ade80]/20 flex justify-between items-center">
                    <span className="text-[10px] text-[#d9f99d]">Fasal Bima Yojana</span>
                    <span className="text-[10px] font-bold text-[#facc15]">Enrolled (Kharif 2026)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#1a2e12]/60 border border-[#4ade80]/20 flex justify-between items-center">
                    <span className="text-[10px] text-[#d9f99d]">Soil Health Card</span>
                    <span className="text-[10px] font-bold text-[#38bdf8]">Valid till 2027</span>
                  </div>
                </div>
              </div>

              {/* Current Crop Status */}
              <div className="mb-4">
                <h4 className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider mb-2">Current Crop Status</h4>
                <div className="bg-[#0c1a2a]/80 p-3 rounded-xl border border-[#38bdf8]/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white">Wheat (Sharbati)</span>
                    <span className="text-[10px] text-[#7dd3fc]">Day 45 (Vegetative Stage)</span>
                  </div>
                  <div className="w-full bg-[#0a1406] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#a3e635] to-[#38bdf8] h-full w-[45%]" />
                  </div>
                  <div className="flex justify-between text-[9px] text-[#93c5fd] mt-1">
                    <span>Sown: 15 Nov</span>
                    <span>Est. Harvest: 10 Apr</span>
                  </div>
                </div>
              </div>

              {/* Location & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0a1406]/80 border border-[#a3e635]/10">
                  <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#7dd3fc] font-mono block">पंजीकृत पता (Address)</span>
                    <span className="text-xs font-medium text-white">{location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0a1406]/80 border border-[#a3e635]/10">
                  <Phone className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#7dd3fc] font-mono block">किसान हेल्पलाइन (Helpline)</span>
                    <span className="text-xs font-bold text-[#a3e635]">1800-180-1551</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};
