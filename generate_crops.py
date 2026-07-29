import json
import random

CROP_NAMES = [
    "Barley", "Sorghum", "Pearl Millet", "Finger Millet", "Pigeon Pea",
    "Green Gram", "Black Gram", "Lentil", "Groundnut", "Sunflower",
    "Safflower", "Castor", "Linseed", "Sesame", "Jute",
    "Mesta", "Tobacco", "Cluster Bean", "Cowpea", "Moth Bean",
    "Horse Gram", "Oat", "Buckwheat", "Amaranth", "Quinoa",
    "Sweet Potato", "Cassava", "Yam", "Taro", "Garlic",
    "Ginger", "Turmeric", "Coriander", "Cumin", "Fennel",
    "Fenugreek", "Carrot", "Radish", "Turnip", "Beetroot",
    "Cabbage", "Cauliflower", "Broccoli", "Peas", "Spinach",
    "Lettuce", "Capsicum", "Chilli", "Brinjal", "Okra", "Papaya", "Banana"
]

# Create 50 crops
new_crops_ts = []
new_crops_py = []

for i, name in enumerate(CROP_NAMES[:50]):
    cid = name.lower().replace(" ", "_")
    idealN = [random.randint(20, 60), random.randint(60, 120)]
    idealP = [random.randint(20, 40), random.randint(40, 80)]
    idealK = [random.randint(15, 30), random.randint(30, 70)]
    idealPh = [round(random.uniform(5.5, 6.0), 1), round(random.uniform(6.5, 8.0), 1)]
    idealTemp = [random.randint(15, 20), random.randint(25, 35)]
    idealHum = [random.randint(40, 60), random.randint(70, 90)]
    idealRain = [random.randint(40, 100), random.randint(120, 250)]
    yield_val = random.randint(10, 80)
    price = random.randint(1500, 8000)
    
    # Python format
    new_crops_py.append(f"""    {{
        "id": "{cid}", "name": "{name}", "hindiName": "{name}",
        "idealN": {idealN}, "idealP": {idealP}, "idealK": {idealK},
        "idealPh": {idealPh}, "idealTemp": {idealTemp}, "idealHumidity": {idealHum}, "idealRainfall": {idealRain},
        "waterRequirement": "{random.choice(['Low', 'Medium', 'High'])}", "expectedYield": {yield_val}, "avgPrice": {price}
    }}""")

    # TS format
    new_crops_ts.append(f"""  {{
    id: '{cid}',
    name: '{name}',
    hindiName: '{name}',
    marathiName: '{name}',
    scientificName: '{name} scientific',
    category: 'Additional',
    idealN: {idealN},
    idealP: {idealP},
    idealK: {idealK},
    idealPh: {idealPh},
    idealTemp: {idealTemp},
    idealHumidity: {idealHum},
    idealRainfall: {idealRain},
    growingDurationDays: {random.randint(60, 180)},
    waterRequirement: '{random.choice(['Low', 'Medium', 'High'])}',
    expectedYieldQuintalPerAcre: {yield_val},
    avgMarketPricePerQuintal: {price},
    fertilizerAdvisory: {{
      basal: 'Standard basal application',
      topDressing: 'Standard top dressing',
      organic: 'Standard organic'
    }},
    keyBenefits: ['Good yield', 'Adaptive'],
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=600&q=80',
    description: '{name} is a versatile crop suitable for various conditions.'
  }}""")

py_crops_str = ",\n".join(new_crops_py)
ts_crops_str = ",\n".join(new_crops_ts)

# Update backend/main.py
with open("backend/main.py", "r", encoding="utf-8") as f:
    py_content = f.read()

# Replace the closing bracket of CROPS_DB
py_content = py_content.replace(
    '    }\n]\n', 
    '    },\n' + py_crops_str + '\n]\n'
)
with open("backend/main.py", "w", encoding="utf-8") as f:
    f.write(py_content)

# Update src/data/crops.ts
with open("src/data/crops.ts", "r", encoding="utf-8") as f:
    ts_content = f.read()

# Replace the closing bracket of CROPS_DATASET
ts_content = ts_content.replace(
    '  }\n];\n', 
    '  },\n' + ts_crops_str + '\n];\n'
)
with open("src/data/crops.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Generated and appended 50 crops successfully.")
