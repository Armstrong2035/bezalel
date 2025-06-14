import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(req.user.uid, userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/me", async (req, res) => {
  try {
    const user = await getUser(req.user.uid);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/me", async (req, res) => {
  try {
    const userData = req.body;
    const user = await updateUser(req.user.uid, userData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/me", async (req, res) => {
  try {
    await deleteUser(req.user.uid);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
