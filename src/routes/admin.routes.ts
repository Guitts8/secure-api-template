import { Router, Response } from "express";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Access admin dashboard
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard accessed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get(
  "/dashboard",
  authenticate,
  authorize("ADMIN"),
  (req: AuthenticatedRequest, res: Response) => {
    res.json({
      message: "Welcome to the admin dashboard",
      user: req.user
    });
  }
);

export default router;