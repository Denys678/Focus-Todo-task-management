import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodType } from "zod";
import { AppError } from "../errors/AppError";

type RequestTarget = "body" | "params" | "query";

export function validateRequest(schema: ZodType, target: RequestTarget): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction): void {
        const result = schema.safeParse(req[target]);

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;

            next(new AppError(`Invalid request ${target}`, 400, errors));
            return;
        }

        if (target === "query") {
            res.locals.query = result.data;
        } else {
            req[target] = result.data;
        }
        next();
    };
}