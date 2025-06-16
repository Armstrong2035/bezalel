import express from "express";
import { saveToMemory } from "../engines/decisionEngine/decisionContext.js";
import { createPrompt } from "../engines/canvasEngine/canvasSchema.js";
import { getUserContexts } from "../services/contextService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const onBoardData = req.body;
    // Hardcoded userId from our mock user
    const userId = "mock-user-1710864000000";

    const savedContext = await saveToMemory(userId, onBoardData);
    res.status(201).json(savedContext);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/canvas/prompt", async (req, res) => {
  try {
    const { context, userId, segment } = req.body;
    if (!context) {
      return res.status(400).json({ error: "context data is required" });
    }
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Create the prompt with context
    const prompt = createPrompt(context, segment);
    res.json({ prompt });
  } catch (error) {
    console.error("Error processing prompt request:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
