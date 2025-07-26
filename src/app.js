// src/app.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

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

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Bezalel API",
    version: "1.0.0",
    description: "API documentation for the Bezalel backend",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.js", // Path to the API docs
  ],
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



export default app;
