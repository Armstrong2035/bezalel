import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bezalel is live");
});

export default router;
