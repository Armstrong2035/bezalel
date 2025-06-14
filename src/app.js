// src/app.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Import routes
import healthRoutes from "./routes/health.js";
import contextRoutes from "./routes/context.js";
import userRoutes from "./routes/users.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", healthRoutes);
app.use("/api/context", contextRoutes);
app.use("/api/users", userRoutes);

export default app;
