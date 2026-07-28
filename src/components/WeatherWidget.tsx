import React from 'react';
import { Sun, CloudRain, Cloud, Droplets, Wind, AlertCircle, Calendar } from 'lucide-react';
import { WeatherInfo } from '../types';

export const WeatherWidget: React.FC = () => {
  const mockWeather: WeatherInfo = {
    temp: 28,
    feelsLike: 30,
    humidity: 78,
    rainProbability: 65,
    windSpeed: 14,
    condition: 'Partly Cloudy',
    locationName: 'Satara District, Maharashtra',
    advisory: 'Moderate rainfall predicted over the next 48 hours. Postpone foliar pesticide sprays until Friday.',
    forecast: [
      { day: 'Today', temp: 28, condition: 'Partly Cloudy', rainProb: 65 },
      { day: 'Wed', temp: 27, condition: 'Rainy', rainProb: 85 },
      { day: 'Thu', temp: 29, condition: 'Rainy', rainProb: 70 },
      { day: 'Fri', temp: 31, condition: 'Sunny', rainProb: 20 },
      { day: 'Sat', temp: 32, condition: 'Sunny', rainProb: 10 },
      { day: 'Sun', temp: 30, condition: 'Cloudy', rainProb: 40 },
      { day: 'Mon', temp: 29, condition: 'Partly Cloudy', rainProb: 30 },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Weather Header Card */}
      <div className="vercel-card p-6 sm:p-8 border border-[#262626] relative overflow-hidden shadow-2xl">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono text-[#00dfd8] uppercase tracking-wider block mb-1">
              Hyper-Local Climate Telemetry
            </span>
            <h2 className="text-2xl font-extrabold text-white">{mockWeather.locationName}</h2>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-[#0070f3]/15 text-[#0070f3] border border-[#0070f3]/40 text-xs font-mono font-semibold flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-[#0070f3]" />
            <span>Monsoon Telemetry: Active</span>
          </div>
        </div>

        {/* Current Weather Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="flex items-center gap-4 bg-[#000000] p-5 rounded-xl border border-[#262626]">
            <Sun className="w-12 h-12 text-[#f5a623]" />
            <div>
              <span className="text-3xl font-extrabold text-white font-mono">{mockWeather.temp}°C</span>
              <p className="text-xs text-[#888888]">Feels like {mockWeather.feelsLike}°C • {mockWeather.condition}</p>
            </div>
          </div>

          <div className="bg-[#000000] p-5 rounded-xl border border-[#262626] flex items-center justify-around font-mono">
            <div className="text-center">
              <Droplets className="w-5 h-5 text-[#0070f3] mx-auto mb-1" />
              <span className="text-[10px] text-[#888888] block">Humidity</span>
              <span className="text-sm font-bold text-white">{mockWeather.humidity}%</span>
            </div>
            <div className="w-px h-8 bg-[#262626]" />
            <div className="text-center">
              <CloudRain className="w-5 h-5 text-[#50e3c2] mx-auto mb-1" />
              <span className="text-[10px] text-[#888888] block">Rain Chance</span>
              <span className="text-sm font-bold text-white">{mockWeather.rainProbability}%</span>
            </div>
          </div>

          <div className="bg-[#000000] p-5 rounded-xl border border-[#262626] flex items-center justify-around font-mono">
            <div className="text-center">
              <Wind className="w-5 h-5 text-[#50e3c2] mx-auto mb-1" />
              <span className="text-[10px] text-[#888888] block">Wind Velocity</span>
              <span className="text-sm font-bold text-white">{mockWeather.windSpeed} km/h</span>
            </div>
          </div>

        </div>

        {/* Advisory Box */}
        <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#f5a623]/40 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-[#f5a623] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-mono font-bold text-[#f5a623] uppercase tracking-wider">Irrigation Telemetry Notice</h4>
            <p className="text-xs text-[#f5a623]/90 mt-0.5">{mockWeather.advisory}</p>
          </div>
        </div>

      </div>

      {/* 7-Day Forecast */}
      <div className="vercel-card p-6 border border-[#262626]">
        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#00dfd8]" />
          7-Day Forecast Outlook
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 font-mono">
          {mockWeather.forecast.map((day, idx) => (
            <div key={idx} className="bg-[#000000] p-3 rounded-xl border border-[#262626] text-center space-y-2">
              <span className="text-[10px] text-[#888888] block">{day.day}</span>
              <div className="my-1">
                {day.condition === 'Sunny' ? (
                  <Sun className="w-6 h-6 text-[#f5a623] mx-auto" />
                ) : day.condition === 'Rainy' ? (
                  <CloudRain className="w-6 h-6 text-[#50e3c2] mx-auto" />
                ) : (
                  <Cloud className="w-6 h-6 text-[#888888] mx-auto" />
                )}
              </div>
              <span className="text-xs font-bold text-white block">{day.temp}°C</span>
              <span className="text-[9px] text-[#00dfd8] bg-[#00dfd8]/10 px-1.5 py-0.5 rounded border border-[#00dfd8]/30">
                💧 {day.rainProb}%
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
