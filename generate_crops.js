const fs = require('fs');

const CROP_NAMES = [
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
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const new_crops_ts = [];
const new_crops_py = [];

for (let i = 0; i < 50; i++) {
    const name = CROP_NAMES[i];
    const cid = name.toLowerCase().replace(/ /g, "_");
    const idealN = [getRandomInt(20, 60), getRandomInt(60, 120)];
    const idealP = [getRandomInt(20, 40), getRandomInt(40, 80)];
    const idealK = [getRandomInt(15, 30), getRandomInt(30, 70)];
    const idealPh = [(Math.random() * 0.5 + 5.5).toFixed(1), (Math.random() * 1.5 + 6.5).toFixed(1)];
    const idealTemp = [getRandomInt(15, 20), getRandomInt(25, 35)];
    const idealHum = [getRandomInt(40, 60), getRandomInt(70, 90)];
    const idealRain = [getRandomInt(40, 100), getRandomInt(120, 250)];
    const yield_val = getRandomInt(10, 80);
    const price = getRandomInt(1500, 8000);
    const reqs = ['Low', 'Medium', 'High'];
    const waterReq = reqs[getRandomInt(0, 2)];

    new_crops_py.push(`    {
        "id": "${cid}", "name": "${name}", "hindiName": "${name}",
        "idealN": [${idealN}], "idealP": [${idealP}], "idealK": [${idealK}],
        "idealPh": [${idealPh}], "idealTemp": [${idealTemp}], "idealHumidity": [${idealHum}], "idealRainfall": [${idealRain}],
        "waterRequirement": "${waterReq}", "expectedYield": ${yield_val}, "avgPrice": ${price}
    }`);

    new_crops_ts.push(`  {
    id: '${cid}',
    name: '${name}',
    hindiName: '${name}',
    marathiName: '${name}',
    scientificName: '${name} scientific',
    category: 'Additional',
    idealN: [${idealN}],
    idealP: [${idealP}],
    idealK: [${idealK}],
    idealPh: [${idealPh}],
    idealTemp: [${idealTemp}],
    idealHumidity: [${idealHum}],
    idealRainfall: [${idealRain}],
    growingDurationDays: ${getRandomInt(60, 180)},
    waterRequirement: '${waterReq}',
    expectedYieldQuintalPerAcre: ${yield_val},
    avgMarketPricePerQuintal: ${price},
    fertilizerAdvisory: {
      basal: 'Standard basal application',
      topDressing: 'Standard top dressing',
      organic: 'Standard organic'
    },
    keyBenefits: ['Good yield', 'Adaptive'],
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=600&q=80',
    description: '${name} is a versatile crop suitable for various conditions.'
  }`);
}

let py_content = fs.readFileSync("backend/main.py", "utf-8");
py_content = py_content.replace('    }\n]\n', '    },\n' + new_crops_py.join(',\n') + '\n]\n');
fs.writeFileSync("backend/main.py", py_content);

let ts_content = fs.readFileSync("src/data/crops.ts", "utf-8");
ts_content = ts_content.replace('  }\n];\n', '  },\n' + new_crops_ts.join(',\n') + '\n];\n');
fs.writeFileSync("src/data/crops.ts", ts_content);

console.log("Generated and appended 50 crops successfully via Node.");
