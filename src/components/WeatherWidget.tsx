import React, { useMemo, useState } from 'react';
import { Sun, CloudRain, Cloud, Droplets, Wind, AlertCircle, Calendar, MapPin } from 'lucide-react';
import { WeatherInfo } from '../types';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const WeatherWidget: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');

  // Pseudo-randomize mock data based on state string length for variety
  const stateOffset = selectedState.length;

  const mockWeather: WeatherInfo = {
    temp: 22 + (stateOffset % 15),
    feelsLike: 24 + (stateOffset % 15),
    humidity: 50 + (stateOffset * 2 % 40),
    rainProbability: 20 + (stateOffset * 3 % 60),
    windSpeed: 10 + (stateOffset % 10),
    condition: stateOffset % 2 === 0 ? 'Partly Cloudy' : 'Sunny',
    locationName: `${selectedState}, India`,
    advisory: `Current agricultural advisory for ${selectedState}: Monitor soil moisture levels closely.`,
    forecast: [
      { day: 'Today', temp: 22 + (stateOffset % 15), condition: stateOffset % 2 === 0 ? 'Partly Cloudy' : 'Sunny', rainProb: 20 + (stateOffset * 3 % 60) },
      { day: 'Wed', temp: 24 + (stateOffset % 12), condition: 'Rainy', rainProb: 85 },
      { day: 'Thu', temp: 25 + (stateOffset % 10), condition: 'Sunny', rainProb: 10 },
      { day: 'Fri', temp: 27 + (stateOffset % 8), condition: 'Sunny', rainProb: 5 },
      { day: 'Sat', temp: 26 + (stateOffset % 11), condition: 'Cloudy', rainProb: 40 },
      { day: 'Sun', temp: 25 + (stateOffset % 14), condition: 'Rainy', rainProb: 75 },
      { day: 'Mon', temp: 23 + (stateOffset % 13), condition: 'Partly Cloudy', rainProb: 30 },
    ]
  };

  // Generate 35 animated raindrops for background layer
  const raindrops = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: `${(i * 2.85) + Math.random() * 1.5}%`,
      animationDuration: `${0.75 + Math.random() * 0.85}s`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: 0.35 + Math.random() * 0.55,
    }));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn relative">
      
      {/* Animated Raindrops Layer behind weather panel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl z-0">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="raindrop"
            style={{
              left: drop.left,
              animationDuration: drop.animationDuration,
              animationDelay: drop.animationDelay,
              opacity: drop.opacity,
            }}
          />
        ))}
      </div>

      {/* Main Weather Card - Sky-Blue Base with Reddish-Orange Cursor Hover Shift */}
      <div className="weather-card p-6 sm:p-8 relative overflow-hidden shadow-2xl z-10 cursor-pointer group">
        
        {/* Dynamic Glow Overlay on Hover */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#38bdf8]/20 to-[#f97316]/0 group-hover:to-[#f97316]/30 blur-3xl pointer-events-none transition-all duration-500 rounded-full" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10">
          <div>
            <span className="text-xs font-mono text-[#38bdf8] group-hover:text-[#f97316] uppercase tracking-wider block mb-1 font-bold transition-colors">
              Hyper-Local Sky-Blue Climate Telemetry
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h2 className="text-2xl font-extrabold text-white">{mockWeather.locationName}</h2>
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-[#0c1a2a] text-white text-sm px-3 py-1.5 border border-[#38bdf8]/30 hover:border-[#38bdf8] focus:border-[#38bdf8] rounded-md outline-none cursor-pointer transition-colors shadow-inner"
              >
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-[#0284c7]/20 group-hover:bg-[#ea580c]/25 text-[#38bdf8] group-hover:text-[#fb923c] border border-[#0284c7]/40 group-hover:border-[#ea580c]/50 text-xs font-mono font-bold flex items-center gap-2 transition-all">
            <CloudRain className="w-4 h-4 text-[#38bdf8] group-hover:text-[#f97316] animate-bounce" />
            <span>Active Monsoon Rain</span>
          </div>
        </div>

        {/* Current Weather Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
          
          <div className="flex items-center gap-4 weather-subcard p-5 rounded-xl">
            <Sun className="w-12 h-12 text-[#facc15] group-hover:text-[#fb923c] transition-colors" />
            <div>
              <span className="text-3xl font-extrabold text-white font-mono">{mockWeather.temp}°C</span>
              <p className="text-xs text-[#93c5fd] group-hover:text-[#fdba74] transition-colors">Feels like {mockWeather.feelsLike}°C • {mockWeather.condition}</p>
            </div>
          </div>

          <div className="weather-subcard p-5 rounded-xl flex items-center justify-around font-mono">
            <div className="text-center">
              <Droplets className="w-5 h-5 text-[#38bdf8] group-hover:text-[#f97316] mx-auto mb-1 transition-colors" />
              <span className="text-[10px] text-[#93c5fd] group-hover:text-[#fdba74] block transition-colors">Humidity</span>
              <span className="text-sm font-bold text-white">{mockWeather.humidity}%</span>
            </div>
            <div className="w-px h-8 bg-[#38bdf8]/30 group-hover:bg-[#f97316]/30 transition-colors" />
            <div className="text-center">
              <CloudRain className="w-5 h-5 text-[#38bdf8] group-hover:text-[#f97316] mx-auto mb-1 transition-colors" />
              <span className="text-[10px] text-[#93c5fd] group-hover:text-[#fdba74] block transition-colors">Rain Chance</span>
              <span className="text-sm font-bold text-white">{mockWeather.rainProbability}%</span>
            </div>
          </div>

          <div className="weather-subcard p-5 rounded-xl flex items-center justify-around font-mono">
            <div className="text-center">
              <Wind className="w-5 h-5 text-[#38bdf8] group-hover:text-[#f97316] mx-auto mb-1 transition-colors" />
              <span className="text-[10px] text-[#93c5fd] group-hover:text-[#fdba74] block transition-colors">Wind Velocity</span>
              <span className="text-sm font-bold text-white">{mockWeather.windSpeed} km/h</span>
            </div>
          </div>

        </div>

        {/* Advisory Box */}
        <div className="p-4 rounded-xl weather-subcard border-l-4 border-l-[#38bdf8] group-hover:border-l-[#f97316] flex items-start gap-3 relative z-10 transition-all">
          <AlertCircle className="w-4 h-4 text-[#38bdf8] group-hover:text-[#f97316] shrink-0 mt-0.5 transition-colors" />
          <div>
            <h4 className="text-xs font-mono font-bold text-[#38bdf8] group-hover:text-[#f97316] uppercase tracking-wider transition-colors">Irrigation Telemetry Notice</h4>
            <p className="text-xs text-[#e0f2fe] group-hover:text-[#ffedd5] mt-0.5 transition-colors">{mockWeather.advisory}</p>
          </div>
        </div>

      </div>

      {/* 7-Day Forecast */}
      <div className="weather-card p-6 relative z-10 cursor-pointer group">
        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#38bdf8] group-hover:text-[#f97316] transition-colors" />
          7-Day Forecast Outlook
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 font-mono">
          {mockWeather.forecast.map((day, idx) => (
            <div key={idx} className="weather-subcard p-3 rounded-xl text-center space-y-2">
              <span className="text-[10px] text-[#93c5fd] group-hover:text-[#fdba74] block transition-colors">{day.day}</span>
              <div className="my-1">
                {day.condition === 'Sunny' ? (
                  <Sun className="w-6 h-6 text-[#facc15] group-hover:text-[#f97316] mx-auto transition-colors" />
                ) : day.condition === 'Rainy' ? (
                  <CloudRain className="w-6 h-6 text-[#38bdf8] group-hover:text-[#ef4444] mx-auto transition-colors" />
                ) : (
                  <Cloud className="w-6 h-6 text-[#93c5fd] group-hover:text-[#fdba74] mx-auto transition-colors" />
                )}
              </div>
              <span className="text-xs font-bold text-white block">{day.temp}°C</span>
              <span className="text-[9px] text-[#38bdf8] group-hover:text-[#f97316] bg-[#38bdf8]/10 group-hover:bg-[#f97316]/10 px-1.5 py-0.5 rounded border border-[#38bdf8]/30 group-hover:border-[#f97316]/30 transition-all">
                💧 {day.rainProb}%
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
