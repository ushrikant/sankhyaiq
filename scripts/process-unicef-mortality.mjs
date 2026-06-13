import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use xlsx package (installed at user root)
const { createRequire } = await import('module');
const require = createRequire(import.meta.url);
const XLSX = require('C:/Users/Shrikant/node_modules/xlsx');

const xlsxPath = 'C:/Users/Shrikant/Downloads/Under-five_Mortality_Rates_2025-1.xlsx';
const outPath = path.join(__dirname, '../lib/mortality-data.json');

const wb = XLSX.readFile(xlsxPath);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

// Row 14 (index 14) is the header row
const headers = rows[14];

// Find year column indices (columns labelled "YYYY.5")
const yearCols = [];
for (let i = 7; i < headers.length; i++) {
  const h = headers[i];
  if (typeof h === 'string' && h.match(/^\d{4}\.5$/)) {
    yearCols.push({ index: i, year: parseInt(h) }); // 1950.5 → 1950
  } else if (typeof h === 'number' && String(h).match(/^\d{4}\.5$/)) {
    yearCols.push({ index: i, year: Math.floor(h) });
  }
}

const data = {};

// Process only Median rows (row[6] === 'Median')
for (const row of rows.slice(15)) {
  if (row[6] !== 'Median') continue;
  const iso3 = String(row[0]).trim();
  if (!iso3 || iso3.length !== 3) continue;

  data[iso3] = {};
  for (const { index, year } of yearCols) {
    const val = row[index];
    if (val !== '' && val !== null && !isNaN(Number(val))) {
      // Convert from per-1,000 to per-100 (percentage), 1 decimal place
      data[iso3][year] = Math.round(Number(val) / 10 * 10) / 10;
    }
  }

  // Remove entry if no data at all
  if (Object.keys(data[iso3]).length === 0) delete data[iso3];
}

const years = yearCols.map(y => y.year);
const minYear = Math.min(...years);
const maxYear = Math.max(...years);

const output = { minYear, maxYear, countries: data };
fs.writeFileSync(outPath, JSON.stringify(output));

const countryCount = Object.keys(data).length;
const totalPoints = Object.values(data).reduce((s, d) => s + Object.keys(d).length, 0);
console.log(`Done. ${countryCount} countries, ${totalPoints} data points, years ${minYear}–${maxYear}`);
console.log(`Output: ${outPath} (${Math.round(fs.statSync(outPath).size / 1024)}KB)`);

// Spot check
console.log('India 2024:', data['IND']?.[2024], '% (should be ~2.7%)');
console.log('Afghanistan 1957:', data['AFG']?.[1957], '% (should be ~36.8%)');
