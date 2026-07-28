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

    const climateScore = Math.max(0, 100 - (tempDist * 2.5 + humDist * 0.8 + rainDist * 0.25));

    // 3. Water & Soil Type multiplier
    let suitabilityBonus = 0;
    if (crop.waterRequirement === 'High' && input.waterAvailability === 'high') suitabilityBonus += 5;
    if (crop.waterRequirement === 'Low' && input.waterAvailability === 'low') suitabilityBonus += 5;
    if (input.waterAvailability === 'low' && crop.waterRequirement === 'High') suitabilityBonus -= 25;

    // Market Demand Score based on price & yield potential
    const marketScore = Math.min(100, Math.round((crop.avgMarketPricePerQuintal / 6500) * 85 + 15));

    // Combined Weighted Confidence Score
    let rawConfidence = (soilScore * 0.40) + (climateScore * 0.45) + (marketScore * 0.15) + suitabilityBonus;
    const confidenceScore = Math.min(99, Math.max(45, Math.round(rawConfidence)));

    // Generate Contextual Match Reasons
    const matchReasons: string[] = [];
    if (nDist === 0 && pDist === 0 && kDist === 0) {
      matchReasons.push('Your soil N-P-K nutrient levels perfectly align with optimal requirements.');
    } else {
      matchReasons.push(`Soil pH (${input.ph}) and mineral structure are highly favorable for root growth.`);
    }

    if (tempDist === 0 && rainDist === 0) {
      matchReasons.push(`Local climate (${input.temperature}°C, ${input.rainfall}mm rain) is in the ideal temperature-moisture window.`);
    } else {
      matchReasons.push(`Predicted ${input.season.toUpperCase()} seasonal weather pattern supports crop development.`);
    }

    if (crop.avgMarketPricePerQuintal > 3000) {
      matchReasons.push(`High commercial value in Mandis with strong market demand (₹${crop.avgMarketPricePerQuintal.toLocaleString()}/Quintal).`);
    } else {
      matchReasons.push('High yield productivity per acre ensures reliable financial safety.');
    }

    // Cautions
    const cautions: string[] = [];
    if (crop.waterRequirement === 'High' && input.waterAvailability !== 'high') {
      cautions.push('Requires supplemental drip or canal irrigation as rainfall alone may fall short.');
    }
    if (input.ph < crop.idealPh[0]) {
      cautions.push(`Soil is slightly acidic for ${crop.name}. Consider applying agricultural lime.`);
    } else if (input.ph > crop.idealPh[1]) {
      cautions.push(`Soil is alkaline. Apply gypsum or organic compost to optimize nutrient uptake.`);
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
