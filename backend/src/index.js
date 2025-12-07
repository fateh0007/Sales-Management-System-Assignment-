import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import salesRoutes from "./routes/salesRoutes.js";
import { loadSalesData } from "./utils/dataLoader.js";
import { setSalesData } from "./services/salesService.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/sales", salesRoutes);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    const DATASET_PATH = process.env.DATASET_PATH || "sample_dataset.csv";
    console.log(`Loading dataset from: ${DATASET_PATH}`);
    const data = await loadSalesData(DATASET_PATH);
    setSalesData(data);

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to load dataset:", err);
    process.exit(1);
  }
})();
