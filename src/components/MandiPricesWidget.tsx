import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, Store } from 'lucide-react';
import { MandiPriceItem } from '../types';

export const MandiPricesWidget: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const mockMandiPrices: MandiPriceItem[] = [
    {
      id: '1',
      commodity: 'Cotton (Kapas)',
      hindiName: 'कपास',
      market: 'Rajkot Mandi',
      district: 'Rajkot',
      state: 'Gujarat',
      minPrice: 6800,
      maxPrice: 7500,
      modalPrice: 7200,
      trend: 'up',
      changePercentage: 4.2,
      updatedAt: 'Today 10:30 AM'
    },
    {
      id: '2',
      commodity: 'Chickpea (Chana)',
      hindiName: 'चना',
      market: 'Latur APMC',
      district: 'Latur',
      state: 'Maharashtra',
      minPrice: 5100,
      maxPrice: 5600,
      modalPrice: 5450,
      trend: 'up',
      changePercentage: 2.1,
      updatedAt: 'Today 11:15 AM'
    },
    {
      id: '3',
      commodity: 'Paddy (Dhan - Common)',
      hindiName: 'धान',
      market: 'Karnal Grain Market',
      district: 'Karnal',
      state: 'Haryana',
      minPrice: 2100,
      maxPrice: 2450,
      modalPrice: 2300,
      trend: 'stable',
      changePercentage: 0.0,
      updatedAt: 'Today 09:45 AM'
    },
    {
      id: '4',
      commodity: 'Maize (Yellow Corn)',
      hindiName: 'मक्का',
      market: 'Davangere Mandi',
      district: 'Davangere',
      state: 'Karnataka',
      minPrice: 1950,
      maxPrice: 2250,
      modalPrice: 2150,
      trend: 'down',
      changePercentage: -1.5,
      updatedAt: 'Today 12:00 PM'
    },
    {
      id: '5',
      commodity: 'Wheat (Sharbati)',
      hindiName: 'गेहूं',
      market: 'Indore APMC',
      district: 'Indore',
      state: 'Madhya Pradesh',
      minPrice: 2300,
      maxPrice: 2600,
      modalPrice: 2450,
      trend: 'up',
      changePercentage: 1.8,
      updatedAt: 'Today 10:00 AM'
    },
    {
      id: '6',
      commodity: 'Pomegranate (Anar)',
      hindiName: 'अनार',
      market: 'Solapur APMC',
      district: 'Solapur',
      state: 'Maharashtra',
      minPrice: 7500,
      maxPrice: 9500,
      modalPrice: 8500,
      trend: 'up',
      changePercentage: 5.4,
      updatedAt: 'Today 08:30 AM'
    }
  ];

  const filteredPrices = mockMandiPrices.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.hindiName.includes(searchTerm) ||
                          item.market.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'All' || item.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Search Header */}
      <div className="vercel-card p-6 border border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#f5a623] uppercase tracking-wider block mb-1">
            AGMARKNET Real-Time Telemetry
          </span>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-[#00dfd8]" />
            Regional Mandi Prices & Market Trends
          </h2>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto font-mono">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Mandi / Crop..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full vercel-input rounded-xl pl-9 pr-3 py-2 text-xs"
            />
          </div>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="vercel-input rounded-xl px-3 py-2 text-xs font-mono"
          >
            <option value="All" className="bg-[#0a0a0a]">All States</option>
            <option value="Maharashtra" className="bg-[#0a0a0a]">Maharashtra</option>
            <option value="Gujarat" className="bg-[#0a0a0a]">Gujarat</option>
            <option value="Haryana" className="bg-[#0a0a0a]">Haryana</option>
            <option value="Karnataka" className="bg-[#0a0a0a]">Karnataka</option>
            <option value="Madhya Pradesh" className="bg-[#0a0a0a]">Madhya Pradesh</option>
          </select>
        </div>
      </div>

      {/* Grid of Mandi Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrices.map((item) => (
          <div key={item.id} className="vercel-card p-5 border border-[#262626] space-y-3 font-mono">
            <div className="flex items-center justify-between text-[10px] text-[#888888]">
              <span>{item.state} • {item.district}</span>
              <span>{item.updatedAt}</span>
            </div>

            <div>
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                {item.commodity}
                {item.trend === 'up' ? (
                  <span className="text-[10px] text-[#50e3c2] bg-[#50e3c2]/10 px-2 py-0.5 rounded border border-[#50e3c2]/30 flex items-center gap-1 font-bold">
                    <TrendingUp className="w-3 h-3" /> +{item.changePercentage}%
                  </span>
                ) : item.trend === 'down' ? (
                  <span className="text-[10px] text-[#ff4d4d] bg-[#ff4d4d]/10 px-2 py-0.5 rounded border border-[#ff4d4d]/30 flex items-center gap-1 font-bold">
                    <TrendingDown className="w-3 h-3" /> {item.changePercentage}%
                  </span>
                ) : (
                  <span className="text-[10px] text-[#888888] bg-[#111111] px-2 py-0.5 rounded border border-[#262626] flex items-center gap-1 font-bold">
                    <Minus className="w-3 h-3" /> Stable
                  </span>
                )}
              </h3>
              <p className="text-xs text-[#888888]">{item.market}</p>
            </div>

            <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#888888] block">Min - Max Rate</span>
                <span className="text-xs text-[#ededed]">₹{item.minPrice} - ₹{item.maxPrice}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-[#00dfd8] block">Modal Rate / Qtl</span>
                <span className="text-lg font-extrabold text-[#f5a623]">₹{item.modalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
