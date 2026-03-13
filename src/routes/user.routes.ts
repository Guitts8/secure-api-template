import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authenticate, (req, res) => {

  const user = (req as any).user;

  res.json({
    message: "Authenticated user",
    user
  });

});

export default router;