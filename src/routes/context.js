import express from "express";
import { saveToMemory } from "../engines/decisionEngine/decisionContext.js";
import { createPrompt } from "../engines/canvasEngine/canvasSchema.js";

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

router.post("/canvas/prompt", (req, res) => {
  try {
    const { segment } = req.body;
    const prompt = createPrompt(segment);
    res.json({ prompt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
