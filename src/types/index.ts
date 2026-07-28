export type LanguageCode = 'hi' | 'mr' | 'pa' | 'te' | 'ta' | 'bn' | 'en';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface SoilParameters {
  nitrogen: number; // N in kg/ha (0 - 140)
  phosphorus: number; // P in kg/ha (5 - 145)
  potassium: number; // K in kg/ha (5 - 205)
  ph: number; // pH (3.5 - 9.0)
  soilType: 'black' | 'alluvial' | 'red' | 'clayey' | 'sandy' | 'loamy';
  waterAvailability: 'high' | 'medium' | 'low';
}

export interface ClimateParameters {
  temperature: number; // °C
  humidity: number; // %
  rainfall: number; // mm
  season: 'kharif' | 'rabi' | 'zaid';
  location: string;
  state: string;
}

export interface RecommendationInput extends SoilParameters, ClimateParameters {}

export interface CropInfo {
  id: string;
  name: string;
  hindiName: string;
  marathiName: string;
  scientificName: string;
  category: 'Cereals' | 'Pulses' | 'Cash Crops' | 'Fruits' | 'Vegetables' | 'Spices' | 'Commercial';
  idealN: [number, number]; // [min, max]
  idealP: [number, number];
  idealK: [number, number];
  idealPh: [number, number];
  idealTemp: [number, number];
  idealHumidity: [number, number];
  idealRainfall: [number, number];
  growingDurationDays: number;
  waterRequirement: 'High' | 'Medium' | 'Low';
  expectedYieldQuintalPerAcre: number;
  avgMarketPricePerQuintal: number; // INR
  fertilizerAdvisory: {
    basal: string;
    topDressing: string;
    organic: string;
  };
  keyBenefits: string[];
  image: string;
  description: string;
}

export interface CropMatchResult {
  crop: CropInfo;
  confidenceScore: number; // 0 - 100%
  suitabilityBreakdown: {
    soilScore: number;
    climateScore: number;
    marketScore: number;
  };
  matchReasons: string[];
  cautions: string[];
  estimatedRevenuePerAcre: number;
}

export interface MandiPriceItem {
  id: string;
  commodity: string;
  hindiName: string;
  market: string;
  state: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number; // INR / Quintal
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  updatedAt: string;
}

export interface WeatherInfo {
  temp: number;
  feelsLike: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Thunderstorm' | 'Cloudy';
  locationName: string;
  advisory: string;
  forecast: Array<{
    day: string;
    temp: number;
    condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Cloudy';
    rainProb: number;
  }>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
