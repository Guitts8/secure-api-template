// src/routes/user.routes.ts
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as UserController from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user returned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get("/me", authenticate, UserController.me);

export default router;