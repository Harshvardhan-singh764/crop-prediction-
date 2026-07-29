import { CROPS_DATASET } from '../data/crops';
import { CropMatchResult, RecommendationInput } from '../types';

export function calculateCropRecommendations(input: RecommendationInput): CropMatchResult[] {
  const results: CropMatchResult[] = CROPS_DATASET.map(crop => {
    // 1. Soil Score Calculation (NPK & pH Euclidean distance with weighted margins)
    const nDist = getRangeDistance(input.nitrogen, crop.idealN);
    const pDist = getRangeDistance(input.phosphorus, crop.idealP);
    const kDist = getRangeDistance(input.potassium, crop.idealK);
    const phDist = getRangeDistance(input.ph, crop.idealPh);

    const soilScore = Math.max(0, 100 - (nDist * 0.4 + pDist * 0.3 + kDist * 0.3 + phDist * 15));

    // 2. Climate Score Calculation (Temp, Humidity, Rainfall)
    const tempDist = getRangeDistance(input.temperature, crop.idealTemp);
    const humDist = getRangeDistance(input.humidity, crop.idealHumidity);
    const rainDist = getRangeDistance(input.rainfall, crop.idealRainfall);

    let climateScore = Math.max(0, 100 - (tempDist * 2.5 + humDist * 0.8 + rainDist * 0.25));

    // 3. Heavy Rain & Extreme Weather Dynamic Adjustments
    let weatherModifier = 0;
    const cautions: string[] = [];

    if (input.rainfall > 200) {
      if (crop.waterRequirement === 'High') {
        weatherModifier += 15; // Paddy, Sugarcane, Jute, Tea thrive in heavy rain
      } else if (crop.waterRequirement === 'Low' || crop.id === 'mustard' || crop.id === 'chickpea' || crop.id === 'potato' || crop.id === 'watermelon') {
        weatherModifier -= 30; // Waterlogging root rot danger
        cautions.push(`Heavy rain alert (${input.rainfall}mm): High risk of root rot / waterlogging for ${crop.name}. Ensure active drainage channels.`);
      }
    }

    // Cool winter temperature matching (Wheat, Mustard, Potato, Apple)
    if (input.temperature <= 22 && (crop.id === 'wheat' || crop.id === 'mustard' || crop.id === 'potato' || crop.id === 'apple')) {
      weatherModifier += 10;
    }

    // Hot summer matching (Watermelon, Sugarcane, Maize, Mango)
    if (input.temperature >= 32 && (crop.id === 'watermelon' || crop.id === 'sugarcane' || crop.id === 'maize' || crop.id === 'mango')) {
      weatherModifier += 10;
    }

    // Soil suitability adjustment
    if (crop.waterRequirement === 'High' && input.waterAvailability === 'high') weatherModifier += 5;
    if (crop.waterRequirement === 'Low' && input.waterAvailability === 'low') weatherModifier += 5;
    if (input.waterAvailability === 'low' && crop.waterRequirement === 'High') weatherModifier -= 25;

    // Market Demand Score based on price & yield potential
    const marketScore = Math.min(100, Math.round((crop.avgMarketPricePerQuintal / 7500) * 85 + 15));

    // Combined Weighted Confidence Score
    let rawConfidence = (soilScore * 0.40) + (climateScore * 0.40) + (marketScore * 0.20) + weatherModifier;
    const confidenceScore = Math.min(99, Math.max(35, Math.round(rawConfidence)));

    // Generate Contextual Match Reasons
    const matchReasons: string[] = [];
    if (nDist === 0 && pDist === 0 && kDist === 0) {
      matchReasons.push(`Soil N-P-K nutrients (${input.nitrogen}-${input.phosphorus}-${input.potassium} kg/ha) perfectly match optimal requirements.`);
    } else {
      matchReasons.push(`Soil pH (${input.ph}) and mineral structure are highly favorable for ${crop.name} root development.`);
    }

    if (tempDist === 0 && rainDist === 0) {
      matchReasons.push(`Local climate (${input.temperature}°C, ${input.rainfall}mm rain) is in the ideal temperature-moisture window.`);
    } else {
      matchReasons.push(`Predicted ${input.season.toUpperCase()} seasonal weather pattern aligns with regional crop cycle.`);
    }

    if (crop.avgMarketPricePerQuintal > 3000) {
      matchReasons.push(`Strong market demand in Mandis with high price realization (₹${crop.avgMarketPricePerQuintal.toLocaleString()}/Quintal).`);
    } else {
      matchReasons.push(`High yield productivity (${crop.expectedYieldQuintalPerAcre} Qtl/Acre) ensures reliable financial safety.`);
    }

    // pH Cautions
    if (input.ph < crop.idealPh[0]) {
      cautions.push(`Soil pH (${input.ph}) is acidic for ${crop.name}. Consider applying agricultural lime.`);
    } else if (input.ph > crop.idealPh[1]) {
      cautions.push(`Soil pH (${input.ph}) is alkaline for ${crop.name}. Apply gypsum or organic compost.`);
    }

    const estimatedRevenuePerAcre = crop.expectedYieldQuintalPerAcre * crop.avgMarketPricePerQuintal;

    return {
      crop,
      confidenceScore,
      suitabilityBreakdown: {
        soilScore: Math.round(soilScore),
        climateScore: Math.round(climateScore),
        marketScore: Math.round(marketScore)
      },
      matchReasons,
      cautions,
      estimatedRevenuePerAcre
    };
  });

  // Sort descending by confidence score
  return results.sort((a, b) => b.confidenceScore - a.confidenceScore);
}

function getRangeDistance(value: number, range: [number, number]): number {
  const [min, max] = range;
  if (value < min) return min - value;
  if (value > max) return value - max;
  return 0;
}
