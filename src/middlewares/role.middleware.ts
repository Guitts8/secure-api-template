import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export function authorize(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: "User not authenticated"
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Access denied"
      });
    }

    next();
  };
}