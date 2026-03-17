import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      error: "Token not provided"
    });
    return;
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    res.status(401).json({
      error: "Invalid authorization header format"
    });
    return;
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    res.status(401).json({
      error: "Invalid authorization scheme"
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      error: "Invalid or expired token"
    });
  }
}