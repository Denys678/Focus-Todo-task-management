import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import jwt, { type SignOptions } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

export async function registerUser(data: RegisterInput) {
    const email = data.email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new AppError("User with this email already exists", 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return user;
}

export async function loginUser(data: LoginInput) {
  const email = data.email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1d") as SignOptions["expiresIn"];

  const token = jwt.sign(
    {
      userId: user.id,
    },
    jwtSecret,
    {
      expiresIn,
    }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
}