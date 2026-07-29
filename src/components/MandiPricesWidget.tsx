import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, Store } from 'lucide-react';
import { MandiPriceItem } from '../types';
import { CROPS_DATASET } from '../data/crops';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const MandiPricesWidget: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const mockMandiPrices: MandiPriceItem[] = useMemo(() => {
    return CROPS_DATASET.map((crop, index) => {
      // Generate some deterministic random-looking data based on index
      const stateIndex = (index * 7) % INDIAN_STATES.length;
      const basePrice = crop.avgMarketPricePerQuintal || (1500 + (index * 100) % 5000);
      const isUp = index % 3 !== 0;
      const trendStr = index % 5 === 0 ? 'stable' : isUp ? 'up' : 'down';
      const change = (index % 10) / 2 + 0.5;
      
      return {
        id: crop.id || String(index),
        commodity: crop.name,
        hindiName: crop.hindiName || '',
        market: `${INDIAN_STATES[stateIndex]} Main APMC`,
        district: `${INDIAN_STATES[stateIndex]} District`,
        state: INDIAN_STATES[stateIndex],
        minPrice: Math.floor(basePrice * 0.9),
        maxPrice: Math.floor(basePrice * 1.1),
        modalPrice: basePrice,
        trend: trendStr as 'up' | 'down' | 'stable',
        changePercentage: trendStr === 'stable' ? 0.0 : isUp ? change : -change,
        updatedAt: 'Today 10:30 AM'
      };
    });
  }, []);

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
            {INDIAN_STATES.map(state => (
              <option key={state} value={state} className="bg-[#0a0a0a]">{state}</option>
            ))}
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
