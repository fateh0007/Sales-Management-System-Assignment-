import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// normalize CSV header -> camelCase key
function normalizeKey(key) {
  return key
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ""));
}

/**
 * Load CSV but only keep up to `rowLimit` rows in memory
 */
export function loadSalesData(csvRelativePath, rowLimit = 50000) {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, "..", "..", csvRelativePath);

    const stream = fs.createReadStream(csvPath).pipe(csv());

    stream
      .on("data", (row) => {
        if (rowLimit && results.length >= rowLimit) {
          // stop reading more rows once we have enough
          stream.destroy();
          return;
        }

        const normalized = {};
        Object.entries(row).forEach(([k, v]) => {
          const nk = normalizeKey(k);
          normalized[nk] = v;
        });

        const numFields = [
          "age",
          "quantity",
          "pricePerUnit",
          "discountPercentage",
          "totalAmount",
          "finalAmount"
        ];
        numFields.forEach((f) => {
          if (normalized[f] !== undefined && normalized[f] !== "") {
            normalized[f] = Number(normalized[f]);
          }
        });

        if (normalized.date) {
          const d = new Date(normalized.date);
          if (!isNaN(d.getTime())) normalized.date = d;
        }

        results.push(normalized);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("close", () => {
        // handle the case where we destroyed the stream early
        resolve(results);
      })
      .on("error", reject);
  });
}
