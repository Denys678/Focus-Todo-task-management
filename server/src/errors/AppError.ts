export class AppError extends Error {
    public readonly statusCode: number;
    public readonly details: unknown | undefined;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number, details?: unknown) {
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = true;

        Object.setPrototypeOf(this, AppError.prototype);

        Error.captureStackTrace?.(this, this.constructor);
    }
}