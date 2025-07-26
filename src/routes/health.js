import express from "express";
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a simple message if the server is live
 *     responses:
 *       200:
 *         description: Server is live
 */
router.get("/", (req, res) => {
  res.send("Bezalel is live");
});

export default router;
