import type { RequestHandler } from "express";

export function asyncHandler(controller: RequestHandler): RequestHandler {
    return function (req, res, next) {
        Promise.resolve(controller(req, res, next)).catch(next);
    };
}