import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodType } from "zod";
import { AppError } from "../errors/AppError";

export function validateRequest(schema: ZodType, target: "body" | "params"): RequestHandler {
    return function (req: Request, _res: Response, next: NextFunction): void {
        const result = schema.safeParse(req[target]);

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;

            next(new AppError(`Invalid request ${target}`, 400, errors));
            return;
        }

        req[target] = result.data;
        next();
    };
}