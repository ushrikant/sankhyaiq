import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const csvPath = 'C:/Users/Shrikant/Downloads/child-mortality-gdp-per-capita.csv';
const outPath = path.join(__dirname, '../lib/mortality-data.json');

const csv = fs.readFileSync(csvPath, 'utf8');
const lines = csv.split('\n').slice(1); // skip header

const data = {};

for (const line of lines) {
  if (!line.trim()) continue;
  const parts = line.split(',');
  const code = parts[1]?.trim();
  const year = parseInt(parts[2]?.trim());
  const rate = parseFloat(parts[3]?.trim());

  if (!code || code === '' || isNaN(year) || isNaN(rate)) continue;
  // Skip aggregate regions (they don't have standard ISO3 codes that start with letters only and are 3 chars)
  if (code.length !== 3) continue;

  if (!data[code]) data[code] = {};
  data[code][year] = Math.round(rate * 10) / 10; // 1 decimal place
}

// Find year range
let minYear = 9999, maxYear = 0;
for (const code of Object.keys(data)) {
  for (const y of Object.keys(data[code])) {
    const yr = parseInt(y);
    if (yr < minYear) minYear = yr;
    if (yr > maxYear) maxYear = yr;
  }
}

const output = { minYear, maxYear, countries: data };
fs.writeFileSync(outPath, JSON.stringify(output));

const countryCount = Object.keys(data).length;
const totalPoints = Object.values(data).reduce((s, d) => s + Object.keys(d).length, 0);
console.log(`Done. ${countryCount} countries, ${totalPoints} data points, years ${minYear}–${maxYear}`);
console.log(`Output: ${outPath} (${Math.round(fs.statSync(outPath).size / 1024)}KB)`);
