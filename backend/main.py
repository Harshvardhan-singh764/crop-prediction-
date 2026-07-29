from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import math

app = FastAPI(
    title="AgriMitra AI Backend Engine API",
    description="Smart India Hackathon 2025 #25030 - High precision crop recommendation REST API",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TelemetryInput(BaseModel):
    nitrogen: float = Field(..., ge=0, le=140, description="Nitrogen content in soil (kg/ha)")
    phosphorus: float = Field(..., ge=0, le=145, description="Phosphorus content in soil (kg/ha)")
    potassium: float = Field(..., ge=0, le=205, description="Potassium content in soil (kg/ha)")
    ph: float = Field(..., ge=3.0, le=10.0, description="Soil pH level")
    temperature: float = Field(..., ge=-5, le=50, description="Ambient temperature (°C)")
    humidity: float = Field(..., ge=10, le=100, description="Relative humidity (%)")
    rainfall: float = Field(..., ge=0, le=500, description="Seasonal rainfall (mm)")
    season: str = Field("kharif", description="Season: kharif, rabi, zaid")
    soilType: str = Field("alluvial", description="Soil type: alluvial, black, red, clayey, sandy")
    waterAvailability: str = Field("high", description="Water availability: high, medium, low")
    location: Optional[str] = "North India"

CROPS_DB = [
    {
        "id": "rice",
        "name": "Rice (Paddy / Dhan)",
        "hindiName": "चावल / धान",
        "idealN": [80, 120], "idealP": [35, 60], "idealK": [35, 55],
        "idealPh": [5.5, 7.2], "idealTemp": [20, 34], "idealHumidity": [70, 95], "idealRainfall": [150, 350],
        "waterRequirement": "High", "expectedYield": 22, "avgPrice": 2300
    },
    {
        "id": "wheat",
        "name": "Wheat (Gehun)",
        "hindiName": "गेहूं",
        "idealN": [40, 75], "idealP": [40, 65], "idealK": [15, 35],
        "idealPh": [6.0, 7.5], "idealTemp": [12, 25], "idealHumidity": [50, 75], "idealRainfall": [40, 95],
        "waterRequirement": "Medium", "expectedYield": 20, "avgPrice": 2400
    },
    {
        "id": "mustard",
        "name": "Mustard (Sarson)",
        "hindiName": "सरसों / राई",
        "idealN": [30, 60], "idealP": [20, 45], "idealK": [15, 35],
        "idealPh": [6.0, 7.8], "idealTemp": [10, 24], "idealHumidity": [45, 70], "idealRainfall": [30, 80],
        "waterRequirement": "Low", "expectedYield": 8, "avgPrice": 5650
    },
    {
        "id": "potato",
        "name": "Potato (Aloo)",
        "hindiName": "आलू",
        "idealN": [70, 110], "idealP": [50, 80], "idealK": [60, 95],
        "idealPh": [5.2, 6.8], "idealTemp": [15, 24], "idealHumidity": [60, 85], "idealRainfall": [40, 90],
        "waterRequirement": "Medium", "expectedYield": 100, "avgPrice": 1450
    },
    {
        "id": "maize",
        "name": "Maize (Corn / Makka)",
        "hindiName": "मक्का",
        "idealN": [70, 100], "idealP": [40, 60], "idealK": [15, 35],
        "idealPh": [5.5, 7.5], "idealTemp": [18, 30], "idealHumidity": [55, 80], "idealRainfall": [60, 120],
        "waterRequirement": "Medium", "expectedYield": 25, "avgPrice": 2150
    },
    {
        "id": "chickpea",
        "name": "Chickpea (Gram / Chana)",
        "hindiName": "चना",
        "idealN": [35, 55], "idealP": [55, 80], "idealK": [75, 90],
        "idealPh": [6.0, 8.0], "idealTemp": [17, 28], "idealHumidity": [40, 68], "idealRainfall": [40, 80],
        "waterRequirement": "Low", "expectedYield": 12, "avgPrice": 5450
    },
    {
        "id": "sugarcane",
        "name": "Sugarcane (Ganna)",
        "hindiName": "गन्ना",
        "idealN": [80, 110], "idealP": [60, 90], "idealK": [40, 60],
        "idealPh": [6.0, 7.8], "idealTemp": [24, 38], "idealHumidity": [70, 90], "idealRainfall": [150, 260],
        "waterRequirement": "High", "expectedYield": 350, "avgPrice": 340
    },
    {
        "id": "cotton",
        "name": "Cotton (Kapas)",
        "hindiName": "कपास",
        "idealN": [110, 140], "idealP": [35, 60], "idealK": [15, 30],
        "idealPh": [6.5, 8.2], "idealTemp": [22, 35], "idealHumidity": [55, 80], "idealRainfall": [60, 110],
        "waterRequirement": "Medium", "expectedYield": 10, "avgPrice": 7200
    }
]

def get_dist(val, rng):
    if val < rng[0]: return rng[0] - val
    if val > rng[1]: return val - rng[1]
    return 0

@app.get("/api/v1/health")
def health_check():
    return {"status": "online", "system": "AgriMitra AI Core Backend v1.0.0", "sihId": "25030"}

@app.get("/api/v1/crops")
def list_crops():
    return {"total": len(CROPS_DB), "crops": CROPS_DB}

@app.post("/api/v1/recommend")
def predict_crop(data: TelemetryInput):
    recommendations = []
    
    for crop in CROPS_DB:
        n_d = get_dist(data.nitrogen, crop["idealN"])
        p_d = get_dist(data.phosphorus, crop["idealP"])
        k_d = get_dist(data.potassium, crop["idealK"])
        ph_d = get_dist(data.ph, crop["idealPh"])
        
        soil_score = max(0, 100 - (n_d*0.4 + p_d*0.3 + k_d*0.3 + ph_d*15))
        
        t_d = get_dist(data.temperature, crop["idealTemp"])
        h_d = get_dist(data.humidity, crop["idealHumidity"])
        r_d = get_dist(data.rainfall, crop["idealRainfall"])
        
        climate_score = max(0, 100 - (t_d*2.5 + h_d*0.8 + r_d*0.25))
        
        modifier = 0
        cautions = []
        
        # Heavy rain rule handling
        if data.rainfall > 200:
            if crop["waterRequirement"] == "High":
                modifier += 15
            elif crop["waterRequirement"] == "Low" or crop["id"] in ["mustard", "chickpea", "potato"]:
                modifier -= 30
                cautions.append(f"Heavy rainfall warning ({data.rainfall}mm): Risk of waterlogging for {crop['name']}.")

        score = min(99, max(35, round(soil_score*0.4 + climate_score*0.4 + 15 + modifier)))
        
        recommendations.append({
            "crop": crop["name"],
            "hindiName": crop["hindiName"],
            "confidenceScore": score,
            "expectedYieldQtlPerAcre": crop["expectedYield"],
            "avgPricePerQtl": crop["avgPrice"],
            "estimatedRevenue": crop["expectedYield"] * crop["avgPrice"],
            "cautions": cautions
        })

    recommendations.sort(key=lambda x: x["confidenceScore"], reverse=True)
    return {
        "status": "success",
        "inputTelemetry": data.dict(),
        "recommendations": recommendations
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
