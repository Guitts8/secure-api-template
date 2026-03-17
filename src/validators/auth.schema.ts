// src/validators/auth.schema.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(100, "Name must have at most 100 characters"),

  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(100, "Password must have at most 100 characters")
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, "Refresh token is required")
});

export const logoutSchema = z.object({
  refreshToken: z
    .string()
    .min(1, "Refresh token is required")
});