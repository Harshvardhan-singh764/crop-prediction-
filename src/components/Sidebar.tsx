import React from 'react';
import { Sprout, Wheat, CloudSun, IndianRupee, FlaskConical, BookOpen, Tractor, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MENU_ITEMS = [
  { id: 'recommend', label: 'फसल सुझाव', subLabel: 'Crop Recommendation', icon: Wheat },
  { id: 'weather', label: 'मौसम', subLabel: 'Weather', icon: CloudSun },
  { id: 'mandi', label: 'मंडी भाव', subLabel: 'Mandi Prices', icon: IndianRupee },
  { id: 'soil', label: 'मिट्टी कार्ड', subLabel: 'Soil Health', icon: FlaskConical },
  { id: 'learn', label: 'कृषि ज्ञान', subLabel: 'AgriGyan', icon: BookOpen },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar-container fixed left-0 top-0 h-screen w-64 z-50 flex flex-col">

      {/* Brand Logo Section */}
      <div className="px-5 py-5 border-b border-[#facc15]/20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('recommend')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#facc15] via-[#eab308] to-[#a3e635] p-0.5 shadow-lg shadow-[#facc15]/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#1a1a08] rounded-[10px] flex items-center justify-center">
              <Sprout className="w-5 h-5 text-[#facc15]" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#facc15] tracking-tight leading-tight">
              AgriMitra
            </h1>
            <span className="text-[10px] font-mono text-[#fef08a]/70">▲ AI Engine • SIH #25030</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <span className="text-[10px] font-mono font-bold text-[#facc15]/50 uppercase tracking-widest px-3 mb-2 block">
          Main Menu
        </span>

        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                isActive
                  ? 'bg-[#facc15] text-[#1a1a08] shadow-lg shadow-[#facc15]/30'
                  : 'text-[#fef9c3] hover:bg-[#facc15]/12 hover:text-[#facc15]'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-[#1a1a08]/20'
                  : 'bg-[#facc15]/10 group-hover:bg-[#facc15]/20'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#1a1a08]' : 'text-[#facc15]'}`} />
              </div>
              <div>
                <span className={`text-sm font-bold block leading-tight ${
                  isActive ? 'text-[#1a1a08]' : 'text-[#fef9c3]'
                }`}>
                  {item.label}
                </span>
                <span className={`text-[10px] font-mono block leading-tight ${
                  isActive ? 'text-[#1a1a08]/70' : 'text-[#facc15]/50'
                }`}>
                  {item.subLabel}
                </span>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-[#1a1a08]/50" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section - Quick Stats */}
      <div className="px-4 py-4 border-t border-[#facc15]/15 space-y-2">
        <div className="flex items-center gap-2 px-2">
          <BarChart3 className="w-4 h-4 text-[#facc15]/60" />
          <span className="text-[10px] font-mono text-[#facc15]/50 uppercase tracking-wider">Quick Stats</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="px-3 py-2 rounded-lg bg-[#facc15]/8 border border-[#facc15]/15 text-center">
            <span className="text-lg font-extrabold text-[#facc15] block">16+</span>
            <span className="text-[9px] font-mono text-[#fef9c3]/60">Crops DB</span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-[#facc15]/8 border border-[#facc15]/15 text-center">
            <span className="text-lg font-extrabold text-[#facc15] block">AI</span>
            <span className="text-[9px] font-mono text-[#fef9c3]/60">Powered</span>
          </div>
        </div>

        {/* Tractor decoration */}
        <div className="flex items-center justify-center gap-2 pt-2 opacity-40">
          <Tractor className="w-5 h-5 text-[#facc15]" />
          <span className="text-[9px] font-mono text-[#fef9c3]">AgriMitra v1.0</span>
        </div>
      </div>
    </aside>
  );
};
