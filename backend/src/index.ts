
// console.log("📌 BEFORE IMPORTS");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth";

import analyzeRoute from "./routes/analyze";
// console.log("📌 AFTER analyzeRoute IMPORT");

import propertyRoutes from "./routes/property";

// console.log("📌 AFTER propertyRoutes IMPORT", propertyRoutes);

const app = express();
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
  res.send("EstateShield.AI backend running...");
});

// Register Routes BEFORE listen()
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoute);
app.use("/api/property", propertyRoutes);

// console.log("📌 MOUNTED /api/property");

// Server Start (MUST be last)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Add global type for Request.user
declare global {
  namespace Express {
    interface Request {
      user?: number;
    }
  }
}
