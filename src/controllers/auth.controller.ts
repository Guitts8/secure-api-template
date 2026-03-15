import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import * as AuthService from "../services/auth.service";
import { generateAccessToken } from "../utils/jwt";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const register: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await AuthService.register(name, email, password);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({
      error: error.message
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    res.json(result);
  } catch (error: any) {
    res.status(401).json({
      error: error.message
    });
  }
};

export const refresh: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body as { refreshToken?: string };

  if (!refreshToken) {
    res.status(400).json({
      error: "Refresh token required"
    });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      userId: string;
    };

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }
    });

    if (!storedToken) {
      res.status(403).json({
        error: "Invalid refresh token"
      });
      return;
    }

    if (storedToken.revokedAt) {
      res.status(403).json({
        error: "Refresh token revoked"
      });
      return;
    }

    if (storedToken.expiresAt < new Date()) {
      res.status(403).json({
        error: "Refresh token expired"
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      res.status(404).json({
        error: "User not found"
      });
      return;
    }

    const newAccessToken = generateAccessToken(user.id, user.role);

    res.json({
      accessToken: newAccessToken
    });
  } catch {
    res.status(403).json({
      error: "Invalid refresh token"
    });
  }
};
export const logout: RequestHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body as { refreshToken?: string };

    if (!refreshToken) {
      res.status(400).json({
        error: "Refresh token required"
      });
      return;
    }

    const result = await AuthService.logout(refreshToken);

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      error: error.message
    });
  }
};
