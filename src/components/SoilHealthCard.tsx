import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const SoilHealthCard: React.FC = () => {
  const nutrients = [
    { name: 'Nitrogen (N)', val: '90 kg/ha', status: 'Optimal', score: 85, color: 'text-[#50e3c2] border-[#50e3c2]/30 bg-[#50e3c2]/10' },
    { name: 'Phosphorus (P)', val: '42 kg/ha', status: 'Moderate', score: 65, color: 'text-[#f5a623] border-[#f5a623]/30 bg-[#f5a623]/10' },
    { name: 'Potassium (K)', val: '43 kg/ha', status: 'Deficient', score: 40, color: 'text-[#ff4d4d] border-[#ff4d4d]/30 bg-[#ff4d4d]/10' },
    { name: 'Soil pH', val: '6.5 pH', status: 'Neutral (Ideal)', score: 92, color: 'text-[#00dfd8] border-[#00dfd8]/30 bg-[#00dfd8]/10' },
    { name: 'Organic Carbon (OC)', val: '0.65 %', status: 'Moderate', score: 60, color: 'text-[#f5a623] border-[#f5a623]/30 bg-[#f5a623]/10' },
    { name: 'Electrical Cond (EC)', val: '0.4 dS/m', status: 'Normal', score: 90, color: 'text-[#50e3c2] border-[#50e3c2]/30 bg-[#50e3c2]/10' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      <div className="vercel-card p-6 sm:p-8 border border-[#262626] relative overflow-hidden shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-[#262626] pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-[#111111] text-[#f5a623] border border-[#262626]">
                🧪
              </span>
              <h2 className="text-xl font-extrabold text-white">Digital Soil Health Card Digitizer</h2>
            </div>
            <p className="text-xs font-mono text-[#888888] mt-1">Farm ID: MH-SAT-2025-88421 • Registered Owner: Satara Cooperative</p>
          </div>

          <div className="px-3 py-1 rounded-full bg-[#50e3c2]/10 border border-[#50e3c2]/30 text-xs font-mono text-[#50e3c2] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#50e3c2]" />
            Verified Soil Status
          </div>
        </div>

        {/* Nutrient Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 font-mono">
          {nutrients.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#000000] border border-[#262626] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#ededed] font-bold">{item.name}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${item.color}`}>
                  {item.status}
                </span>
              </div>

              <div className="text-lg font-extrabold text-white">{item.val}</div>

              <div className="w-full bg-[#111111] h-1.5 rounded-full overflow-hidden border border-[#262626]">
                <div
                  className="bg-gradient-to-r from-[#0070f3] to-[#00dfd8] h-full rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Soil Advisory */}
        <div className="p-4 rounded-xl bg-[#000000] border border-[#262626] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#0070f3] shrink-0 mt-0.5" />
          <div className="text-xs font-sans">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-1">Soil Doctor Telemetry Recommendation</h4>
            <p className="text-[#a1a1a1]">
              Potassium (K) levels are deficient. Apply Muriate of Potash (MoP) @ 30 kg/acre prior to sowing. Organic carbon is moderate; incorporate 4-5 trolley loads of FYM compost.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
