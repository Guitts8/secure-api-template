import { Request } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import * as AuthService from "../services/auth.service";
import { generateAccessToken } from "../utils/jwt";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  logoutSchema
} from "../validators/auth.schema";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const register = asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);

  const user = await AuthService.register(
    data.name,
    data.email,
    data.password
  );

  res.status(201).json(user);
});

export const login = asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);

  const result = await AuthService.login(
    data.email,
    data.password
  );

  res.json(result);
});

export const refresh = asyncHandler(async (req, res) => {
  const data = refreshTokenSchema.parse(req.body);
  const { refreshToken } = data;

  const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
    userId: string;
  };

  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken }
  });

  if (!storedToken) {
    throw new AppError("Invalid refresh token", 403);
  }

  if (storedToken.revokedAt) {
    throw new AppError("Refresh token revoked", 403);
  }

  if (storedToken.expiresAt < new Date()) {
    throw new AppError("Refresh token expired", 403);
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId }
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newAccessToken = generateAccessToken(user.id, user.role);

  res.json({
    accessToken: newAccessToken
  });
});

export const logout = asyncHandler(async (req, res) => {
  const data = logoutSchema.parse(req.body);

  const result = await AuthService.logout(data.refreshToken);

  res.json(result);
});