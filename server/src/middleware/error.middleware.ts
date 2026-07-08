import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
            ...(err.details ? { errors: err.details } : {}),
        });

        return;
    }

    console.error(err);

    res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal server error",
    });
}