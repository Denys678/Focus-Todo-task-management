import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

type TokenPayload = {
  userId: string;
};

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  const token = authHeader.split(" ")[1];

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    next(new Error("JWT_SECRET is not defined"));
    return;
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as TokenPayload;
    res.locals.userId = payload.userId;
    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
}