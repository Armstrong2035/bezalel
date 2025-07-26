// src/index.ts
import app from "./app.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
const result = dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (result.error) {
  console.error("Error loading .env:", result.error);
  process.exit(1);
}

// Verify required environment variables
const requiredEnvVars = ["ANTHROPIC_API_KEY"];

console.log(process.env.ANTHROPIC_API_KEY);

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);
if (missingEnvVars.length > 0) {
  console.error(
    "Missing required environment variables:",
    missingEnvVars.join(", ")
  );
  process.exit(1);
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Bezalel backend running on port ${PORT}`);
  console.log(`Swagger Documentation is running on http://localhost:4000/api-docs/`)
});
