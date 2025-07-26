import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: User created
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(req.user.uid, userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User data
 *       500:
 *         description: Server error
 */
router.get("/me", async (req, res) => {
  try {
    const user = await getUser(req.user.uid);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update current user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated
 *       500:
 *         description: Server error
 */
router.put("/me", async (req, res) => {
  try {
    const userData = req.body;
    const user = await updateUser(req.user.uid, userData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: Delete current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted
 *       500:
 *         description: Server error
 */
router.delete("/me", async (req, res) => {
  try {
    await deleteUser(req.user.uid);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
