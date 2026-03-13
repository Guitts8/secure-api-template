import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export function generateAccessToken(userId: string, role: string) {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: "15m" }
  );
}

export function generateRefreshToken(userId: string) {
  return jwt.sign(
    { userId },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}