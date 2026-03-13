import { Router, Response } from "express";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

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