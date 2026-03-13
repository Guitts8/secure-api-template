import { prisma } from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export async function login(email: string, password: string) {

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordValid = await comparePassword(password, user.passwordHash);

  if (!passwordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt
    }
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
}