import express from "express";
import { saveToMemory } from "../engines/decisionEngine/decisionContext.js";
import { createPrompt } from "../engines/canvasEngine/canvasSchema.js";
import { getUserContexts } from "../services/contextService.js";
import { generateCanvasSegment } from "../services/llmService.js";
import {
  saveCanvasSegment,
  getCanvasSegment,
  getUserCanvas,
  getUserCanvasSegments,
  updateOptionStatus,
  createNewCanvas,
} from "../services/canvasSegmentService.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Context
 *   description: Context and Canvas management
 */

/**
 * @swagger
 * /api/context:
 *   post:
 *     summary: Save onboarding context
 *     tags: [Context]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Context saved
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/context/canvas/prompt:
 *   post:
 *     summary: Generate a canvas segment using LLM
 *     tags: [Context]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Canvas segment generated
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/canvas/prompt", async (req, res) => {
  try {
    const { context, userId, segment } = req.body;
    if (!context) {
      return res.status(400).json({ error: "context data is required" });
    }
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    if (!segment) {
      return res.status(400).json({ error: "segment is required" });
    }

    // Check if we have a cached response for this segment
    const existingCanvas = await getUserCanvas(userId);
    if (existingCanvas && existingCanvas.segments[segment]) {
      // Return the existing segment data
      return res.json({
        canvasId: existingCanvas.id,
        segment: existingCanvas.segments[segment],
        decisions: existingCanvas.decisions,
      });
    }

    // Create the prompt with context and previous decisions
    const prompt = await createPrompt(context, segment, userId);

    // Generate response using LLM
    const response = await generateCanvasSegment(prompt);

    // Save the response to the user's canvas
    const savedCanvas = await saveCanvasSegment(
      userId,
      segment,
      response.response.options
    );

    res.json({
      canvasId: savedCanvas.id,
      segment: savedCanvas.segments[segment],
      decisions: savedCanvas.decisions,
    });
  } catch (error) {
    console.error("Error processing prompt request:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/context/canvas:
 *   get:
 *     summary: Get user's complete canvas
 *     tags: [Context]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Canvas data
 *       400:
 *         description: Missing userId
 *       404:
 *         description: No canvas found
 *       500:
 *         description: Server error
 */
// Get user's complete canvas
router.get("/canvas", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const canvas = await getUserCanvas(userId);
    if (!canvas) {
      return res.status(404).json({ error: "No canvas found for user" });
    }

    res.json(canvas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific canvas by ID
router.get("/canvas/:canvasId", async (req, res) => {
  try {
    const { canvasId } = req.params;
    const canvas = await getCanvasSegment(canvasId);
    res.json(canvas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific segment from user's canvas
router.get("/canvas/segment/:segment", async (req, res) => {
  try {
    const { userId } = req.query;
    const { segment } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const segmentData = await getUserCanvasSegments(userId, segment);
    if (!segmentData) {
      return res.status(404).json({ error: "Segment not found" });
    }

    res.json(segmentData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update option status (accept/reject)
router.patch(
  "/canvas/:canvasId/segment/:segment/option/:optionId",
  async (req, res) => {
    try {
      const { canvasId, segment, optionId } = req.params;
      const { status } = req.body;

      if (!status || !["accepted", "rejected"].includes(status)) {
        return res
          .status(400)
          .json({ error: "Invalid status. Must be 'accepted' or 'rejected'" });
      }

      const updatedCanvas = await updateOptionStatus(
        canvasId,
        segment,
        optionId,
        status
      );
      res.json(updatedCanvas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Create a new canvas
router.post("/canvas", async (req, res) => {
  try {
    const { userId, canvasName } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const newCanvas = await createNewCanvas(userId, canvasName);
    res.status(201).json(newCanvas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
