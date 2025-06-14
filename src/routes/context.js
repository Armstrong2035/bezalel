import express from "express";
import { saveToMemory } from "../engines/decisionEngine/decisionContext.js";
import { createPrompt } from "../engines/canvasEngine/canvasSchema.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const onBoardData = req.body;
    saveToMemory(onBoardData);
    res.json({ message: "Context saved successfully" });
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
