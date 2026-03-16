import { Router, Response } from "express";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get authenticated user data from token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user returned successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authenticate, (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    message: "Authenticated user",
    user: req.user
  });
});

export default router;