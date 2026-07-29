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
    },
    {
        "id": "barley", "name": "Barley", "hindiName": "Barley",
        "idealN": [20,96], "idealP": [36,77], "idealK": [17,42],
        "idealPh": [5.9,7.4], "idealTemp": [19,25], "idealHumidity": [43,80], "idealRainfall": [94,176],
        "waterRequirement": "Medium", "expectedYield": 31, "avgPrice": 1940
    },
    {
        "id": "sorghum", "name": "Sorghum", "hindiName": "Sorghum",
        "idealN": [54,117], "idealP": [38,43], "idealK": [22,49],
        "idealPh": [5.8,6.6], "idealTemp": [15,26], "idealHumidity": [48,83], "idealRainfall": [94,166],
        "waterRequirement": "Medium", "expectedYield": 38, "avgPrice": 6788
    },
    {
        "id": "pearl_millet", "name": "Pearl Millet", "hindiName": "Pearl Millet",
        "idealN": [51,60], "idealP": [32,54], "idealK": [20,30],
        "idealPh": [5.5,7.2], "idealTemp": [15,25], "idealHumidity": [43,85], "idealRainfall": [84,154],
        "waterRequirement": "Medium", "expectedYield": 67, "avgPrice": 7830
    },
    {
        "id": "finger_millet", "name": "Finger Millet", "hindiName": "Finger Millet",
        "idealN": [39,85], "idealP": [29,48], "idealK": [30,53],
        "idealPh": [5.7,8.0], "idealTemp": [18,35], "idealHumidity": [54,74], "idealRainfall": [84,219],
        "waterRequirement": "Low", "expectedYield": 43, "avgPrice": 3735
    },
    {
        "id": "pigeon_pea", "name": "Pigeon Pea", "hindiName": "Pigeon Pea",
        "idealN": [41,63], "idealP": [21,60], "idealK": [27,44],
        "idealPh": [5.7,6.6], "idealTemp": [18,26], "idealHumidity": [50,75], "idealRainfall": [97,237],
        "waterRequirement": "Low", "expectedYield": 32, "avgPrice": 1858
    },
    {
        "id": "green_gram", "name": "Green Gram", "hindiName": "Green Gram",
        "idealN": [27,62], "idealP": [21,80], "idealK": [16,34],
        "idealPh": [5.7,7.9], "idealTemp": [18,26], "idealHumidity": [57,86], "idealRainfall": [44,226],
        "waterRequirement": "High", "expectedYield": 38, "avgPrice": 6203
    },
    {
        "id": "black_gram", "name": "Black Gram", "hindiName": "Black Gram",
        "idealN": [29,79], "idealP": [39,73], "idealK": [26,59],
        "idealPh": [5.9,6.8], "idealTemp": [18,32], "idealHumidity": [44,74], "idealRainfall": [40,184],
        "waterRequirement": "Low", "expectedYield": 23, "avgPrice": 6802
    },
    {
        "id": "lentil", "name": "Lentil", "hindiName": "Lentil",
        "idealN": [30,99], "idealP": [23,47], "idealK": [21,34],
        "idealPh": [5.8,7.7], "idealTemp": [18,25], "idealHumidity": [50,83], "idealRainfall": [72,135],
        "waterRequirement": "Low", "expectedYield": 26, "avgPrice": 7387
    },
    {
        "id": "groundnut", "name": "Groundnut", "hindiName": "Groundnut",
        "idealN": [37,96], "idealP": [38,69], "idealK": [17,65],
        "idealPh": [5.6,6.6], "idealTemp": [17,35], "idealHumidity": [50,89], "idealRainfall": [62,152],
        "waterRequirement": "Medium", "expectedYield": 71, "avgPrice": 6168
    },
    {
        "id": "sunflower", "name": "Sunflower", "hindiName": "Sunflower",
        "idealN": [38,101], "idealP": [21,40], "idealK": [16,47],
        "idealPh": [5.8,6.7], "idealTemp": [17,30], "idealHumidity": [41,83], "idealRainfall": [78,161],
        "waterRequirement": "High", "expectedYield": 69, "avgPrice": 4749
    },
    {
        "id": "safflower", "name": "Safflower", "hindiName": "Safflower",
        "idealN": [28,106], "idealP": [36,42], "idealK": [20,47],
        "idealPh": [6.0,7.6], "idealTemp": [18,30], "idealHumidity": [45,86], "idealRainfall": [56,248],
        "waterRequirement": "Low", "expectedYield": 11, "avgPrice": 4711
    },
    {
        "id": "castor", "name": "Castor", "hindiName": "Castor",
        "idealN": [48,103], "idealP": [30,67], "idealK": [20,49],
        "idealPh": [5.7,7.8], "idealTemp": [19,29], "idealHumidity": [43,76], "idealRainfall": [68,199],
        "waterRequirement": "Medium", "expectedYield": 56, "avgPrice": 3857
    },
    {
        "id": "linseed", "name": "Linseed", "hindiName": "Linseed",
        "idealN": [30,103], "idealP": [33,80], "idealK": [29,40],
        "idealPh": [5.6,8.0], "idealTemp": [16,32], "idealHumidity": [53,76], "idealRainfall": [98,150],
        "waterRequirement": "High", "expectedYield": 11, "avgPrice": 5469
    },
    {
        "id": "sesame", "name": "Sesame", "hindiName": "Sesame",
        "idealN": [50,77], "idealP": [25,57], "idealK": [21,31],
        "idealPh": [5.9,6.8], "idealTemp": [20,25], "idealHumidity": [51,73], "idealRainfall": [50,122],
        "waterRequirement": "Low", "expectedYield": 49, "avgPrice": 5881
    },
    {
        "id": "jute", "name": "Jute", "hindiName": "Jute",
        "idealN": [55,60], "idealP": [35,67], "idealK": [16,47],
        "idealPh": [5.6,6.6], "idealTemp": [18,34], "idealHumidity": [57,85], "idealRainfall": [48,243],
        "waterRequirement": "Medium", "expectedYield": 78, "avgPrice": 6894
    },
    {
        "id": "mesta", "name": "Mesta", "hindiName": "Mesta",
        "idealN": [57,100], "idealP": [36,59], "idealK": [28,50],
        "idealPh": [5.5,7.4], "idealTemp": [19,35], "idealHumidity": [59,78], "idealRainfall": [68,218],
        "waterRequirement": "High", "expectedYield": 10, "avgPrice": 2630
    },
    {
        "id": "tobacco", "name": "Tobacco", "hindiName": "Tobacco",
        "idealN": [35,77], "idealP": [36,42], "idealK": [30,62],
        "idealPh": [5.5,7.9], "idealTemp": [18,29], "idealHumidity": [51,86], "idealRainfall": [47,221],
        "waterRequirement": "Medium", "expectedYield": 53, "avgPrice": 7537
    },
    {
        "id": "cluster_bean", "name": "Cluster Bean", "hindiName": "Cluster Bean",
        "idealN": [33,97], "idealP": [37,50], "idealK": [17,64],
        "idealPh": [6.0,7.4], "idealTemp": [19,35], "idealHumidity": [58,84], "idealRainfall": [67,237],
        "waterRequirement": "High", "expectedYield": 14, "avgPrice": 3456
    },
    {
        "id": "cowpea", "name": "Cowpea", "hindiName": "Cowpea",
        "idealN": [42,111], "idealP": [29,53], "idealK": [21,48],
        "idealPh": [5.7,7.6], "idealTemp": [18,29], "idealHumidity": [56,90], "idealRainfall": [48,140],
        "waterRequirement": "Low", "expectedYield": 65, "avgPrice": 1699
    },
    {
        "id": "moth_bean", "name": "Moth Bean", "hindiName": "Moth Bean",
        "idealN": [38,113], "idealP": [35,68], "idealK": [19,49],
        "idealPh": [5.8,6.8], "idealTemp": [15,34], "idealHumidity": [53,80], "idealRainfall": [100,194],
        "waterRequirement": "Low", "expectedYield": 56, "avgPrice": 2496
    },
    {
        "id": "horse_gram", "name": "Horse Gram", "hindiName": "Horse Gram",
        "idealN": [37,88], "idealP": [35,53], "idealK": [21,56],
        "idealPh": [5.6,6.6], "idealTemp": [19,35], "idealHumidity": [56,84], "idealRainfall": [73,146],
        "waterRequirement": "Medium", "expectedYield": 59, "avgPrice": 5154
    },
    {
        "id": "oat", "name": "Oat", "hindiName": "Oat",
        "idealN": [32,68], "idealP": [37,65], "idealK": [17,32],
        "idealPh": [5.5,8.0], "idealTemp": [20,34], "idealHumidity": [55,89], "idealRainfall": [92,153],
        "waterRequirement": "Medium", "expectedYield": 69, "avgPrice": 2880
    },
    {
        "id": "buckwheat", "name": "Buckwheat", "hindiName": "Buckwheat",
        "idealN": [50,64], "idealP": [26,46], "idealK": [26,39],
        "idealPh": [5.9,7.4], "idealTemp": [18,32], "idealHumidity": [41,82], "idealRainfall": [84,211],
        "waterRequirement": "Low", "expectedYield": 66, "avgPrice": 4963
    },
    {
        "id": "amaranth", "name": "Amaranth", "hindiName": "Amaranth",
        "idealN": [36,109], "idealP": [39,76], "idealK": [27,30],
        "idealPh": [5.7,6.9], "idealTemp": [17,28], "idealHumidity": [49,87], "idealRainfall": [95,125],
        "waterRequirement": "Medium", "expectedYield": 51, "avgPrice": 7978
    },
    {
        "id": "quinoa", "name": "Quinoa", "hindiName": "Quinoa",
        "idealN": [37,85], "idealP": [40,49], "idealK": [30,52],
        "idealPh": [5.8,7.5], "idealTemp": [20,33], "idealHumidity": [58,87], "idealRainfall": [79,228],
        "waterRequirement": "Medium", "expectedYield": 22, "avgPrice": 5236
    },
    {
        "id": "sweet_potato", "name": "Sweet Potato", "hindiName": "Sweet Potato",
        "idealN": [43,96], "idealP": [27,47], "idealK": [23,52],
        "idealPh": [5.7,7.1], "idealTemp": [19,33], "idealHumidity": [58,82], "idealRainfall": [72,175],
        "waterRequirement": "Low", "expectedYield": 63, "avgPrice": 1689
    },
    {
        "id": "cassava", "name": "Cassava", "hindiName": "Cassava",
        "idealN": [41,65], "idealP": [21,69], "idealK": [26,47],
        "idealPh": [5.7,7.2], "idealTemp": [17,29], "idealHumidity": [52,82], "idealRainfall": [71,196],
        "waterRequirement": "High", "expectedYield": 35, "avgPrice": 2628
    },
    {
        "id": "yam", "name": "Yam", "hindiName": "Yam",
        "idealN": [58,97], "idealP": [34,51], "idealK": [25,41],
        "idealPh": [5.9,7.1], "idealTemp": [16,26], "idealHumidity": [46,90], "idealRainfall": [95,166],
        "waterRequirement": "Medium", "expectedYield": 33, "avgPrice": 2087
    },
    {
        "id": "taro", "name": "Taro", "hindiName": "Taro",
        "idealN": [24,89], "idealP": [40,78], "idealK": [17,62],
        "idealPh": [5.9,7.5], "idealTemp": [18,33], "idealHumidity": [44,78], "idealRainfall": [54,125],
        "waterRequirement": "Low", "expectedYield": 24, "avgPrice": 2816
    },
    {
        "id": "garlic", "name": "Garlic", "hindiName": "Garlic",
        "idealN": [30,85], "idealP": [40,40], "idealK": [16,33],
        "idealPh": [6.0,7.1], "idealTemp": [15,35], "idealHumidity": [58,79], "idealRainfall": [70,165],
        "waterRequirement": "Low", "expectedYield": 42, "avgPrice": 5382
    },
    {
        "id": "ginger", "name": "Ginger", "hindiName": "Ginger",
        "idealN": [59,99], "idealP": [31,62], "idealK": [16,58],
        "idealPh": [5.6,6.9], "idealTemp": [18,34], "idealHumidity": [52,80], "idealRainfall": [40,121],
        "waterRequirement": "Low", "expectedYield": 16, "avgPrice": 6432
    },
    {
        "id": "turmeric", "name": "Turmeric", "hindiName": "Turmeric",
        "idealN": [29,89], "idealP": [37,78], "idealK": [26,67],
        "idealPh": [5.8,7.4], "idealTemp": [19,28], "idealHumidity": [42,77], "idealRainfall": [71,193],
        "waterRequirement": "Medium", "expectedYield": 14, "avgPrice": 2995
    },
    {
        "id": "coriander", "name": "Coriander", "hindiName": "Coriander",
        "idealN": [53,106], "idealP": [33,52], "idealK": [22,39],
        "idealPh": [5.7,6.8], "idealTemp": [19,31], "idealHumidity": [57,89], "idealRainfall": [71,248],
        "waterRequirement": "High", "expectedYield": 28, "avgPrice": 6220
    },
    {
        "id": "cumin", "name": "Cumin", "hindiName": "Cumin",
        "idealN": [21,65], "idealP": [34,57], "idealK": [27,41],
        "idealPh": [5.8,7.8], "idealTemp": [18,34], "idealHumidity": [57,90], "idealRainfall": [60,221],
        "waterRequirement": "Low", "expectedYield": 40, "avgPrice": 6354
    },
    {
        "id": "fennel", "name": "Fennel", "hindiName": "Fennel",
        "idealN": [31,120], "idealP": [29,57], "idealK": [19,44],
        "idealPh": [5.8,7.7], "idealTemp": [16,31], "idealHumidity": [42,75], "idealRainfall": [77,250],
        "waterRequirement": "Low", "expectedYield": 54, "avgPrice": 7669
    },
    {
        "id": "fenugreek", "name": "Fenugreek", "hindiName": "Fenugreek",
        "idealN": [50,62], "idealP": [22,77], "idealK": [16,48],
        "idealPh": [5.9,7.8], "idealTemp": [18,29], "idealHumidity": [49,79], "idealRainfall": [56,178],
        "waterRequirement": "High", "expectedYield": 51, "avgPrice": 2336
    },
    {
        "id": "carrot", "name": "Carrot", "hindiName": "Carrot",
        "idealN": [56,80], "idealP": [37,64], "idealK": [17,31],
        "idealPh": [5.6,7.6], "idealTemp": [17,28], "idealHumidity": [51,90], "idealRainfall": [53,167],
        "waterRequirement": "High", "expectedYield": 34, "avgPrice": 5330
    },
    {
        "id": "radish", "name": "Radish", "hindiName": "Radish",
        "idealN": [26,105], "idealP": [38,75], "idealK": [23,64],
        "idealPh": [5.9,7.3], "idealTemp": [19,35], "idealHumidity": [58,84], "idealRainfall": [50,136],
        "waterRequirement": "Medium", "expectedYield": 50, "avgPrice": 7174
    },
    {
        "id": "turnip", "name": "Turnip", "hindiName": "Turnip",
        "idealN": [54,69], "idealP": [40,47], "idealK": [21,30],
        "idealPh": [5.7,7.5], "idealTemp": [19,30], "idealHumidity": [41,86], "idealRainfall": [77,218],
        "waterRequirement": "Low", "expectedYield": 33, "avgPrice": 2237
    },
    {
        "id": "beetroot", "name": "Beetroot", "hindiName": "Beetroot",
        "idealN": [39,109], "idealP": [35,68], "idealK": [28,60],
        "idealPh": [5.8,7.1], "idealTemp": [17,34], "idealHumidity": [46,85], "idealRainfall": [86,184],
        "waterRequirement": "Low", "expectedYield": 39, "avgPrice": 3832
    },
    {
        "id": "cabbage", "name": "Cabbage", "hindiName": "Cabbage",
        "idealN": [47,74], "idealP": [35,76], "idealK": [19,46],
        "idealPh": [6.0,7.2], "idealTemp": [19,28], "idealHumidity": [45,79], "idealRainfall": [99,219],
        "waterRequirement": "High", "expectedYield": 19, "avgPrice": 4304
    },
    {
        "id": "cauliflower", "name": "Cauliflower", "hindiName": "Cauliflower",
        "idealN": [36,61], "idealP": [30,77], "idealK": [30,61],
        "idealPh": [5.5,7.4], "idealTemp": [17,32], "idealHumidity": [60,70], "idealRainfall": [99,227],
        "waterRequirement": "High", "expectedYield": 27, "avgPrice": 3589
    },
    {
        "id": "broccoli", "name": "Broccoli", "hindiName": "Broccoli",
        "idealN": [27,99], "idealP": [25,68], "idealK": [15,56],
        "idealPh": [5.9,6.6], "idealTemp": [18,31], "idealHumidity": [48,90], "idealRainfall": [47,190],
        "waterRequirement": "High", "expectedYield": 26, "avgPrice": 2294
    },
    {
        "id": "peas", "name": "Peas", "hindiName": "Peas",
        "idealN": [23,114], "idealP": [32,78], "idealK": [27,36],
        "idealPh": [5.6,7.0], "idealTemp": [16,27], "idealHumidity": [40,78], "idealRainfall": [80,135],
        "waterRequirement": "Medium", "expectedYield": 14, "avgPrice": 7280
    },
    {
        "id": "spinach", "name": "Spinach", "hindiName": "Spinach",
        "idealN": [47,68], "idealP": [26,46], "idealK": [25,65],
        "idealPh": [5.5,7.1], "idealTemp": [20,34], "idealHumidity": [49,82], "idealRainfall": [87,187],
        "waterRequirement": "Medium", "expectedYield": 38, "avgPrice": 1654
    },
    {
        "id": "lettuce", "name": "Lettuce", "hindiName": "Lettuce",
        "idealN": [57,117], "idealP": [31,68], "idealK": [24,42],
        "idealPh": [5.7,7.7], "idealTemp": [19,28], "idealHumidity": [48,70], "idealRainfall": [76,124],
        "waterRequirement": "Low", "expectedYield": 22, "avgPrice": 7625
    },
    {
        "id": "capsicum", "name": "Capsicum", "hindiName": "Capsicum",
        "idealN": [57,87], "idealP": [30,76], "idealK": [28,58],
        "idealPh": [6.0,7.9], "idealTemp": [19,30], "idealHumidity": [41,81], "idealRainfall": [94,132],
        "waterRequirement": "Medium", "expectedYield": 41, "avgPrice": 5835
    },
    {
        "id": "chilli", "name": "Chilli", "hindiName": "Chilli",
        "idealN": [28,112], "idealP": [20,43], "idealK": [23,43],
        "idealPh": [5.6,7.4], "idealTemp": [17,35], "idealHumidity": [47,89], "idealRainfall": [45,167],
        "waterRequirement": "Medium", "expectedYield": 17, "avgPrice": 6852
    },
    {
        "id": "brinjal", "name": "Brinjal", "hindiName": "Brinjal",
        "idealN": [42,106], "idealP": [22,41], "idealK": [30,66],
        "idealPh": [5.9,6.5], "idealTemp": [17,27], "idealHumidity": [45,90], "idealRainfall": [82,191],
        "waterRequirement": "High", "expectedYield": 56, "avgPrice": 7406
    },
    {
        "id": "okra", "name": "Okra", "hindiName": "Okra",
        "idealN": [44,101], "idealP": [23,78], "idealK": [26,62],
        "idealPh": [5.9,7.1], "idealTemp": [17,35], "idealHumidity": [57,79], "idealRainfall": [85,163],
        "waterRequirement": "High", "expectedYield": 25, "avgPrice": 4954
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
