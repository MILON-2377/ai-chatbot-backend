export default class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly code?: string;
    public readonly details?: Record<string, any>;
    public readonly timestamp: string;

    constructor(
        statusCode: number,
        message: string,
        isOperational = true,
        options: {
            code?: string;
            details?: Record<string, any>;
        } = {}
    ) {
        // 1. Pass message to parent Error
        super(message);

        // 2. Maintain proper prototype chain in TypeScript
        Object.setPrototypeOf(this, new.target.prototype);

        // 3. Set name explicitly (helps with logging & debugging)
        this.name = this.constructor.name;

        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.code = options.code;
        this.details = options.details;
        this.timestamp = new Date().toISOString();

        // 4. Capture clean stack trace (excluding the constructor call itself)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }

        // 5. Make properties non-enumerable where it makes sense
        // (cleaner JSON serialization / logging)
        Object.defineProperty(this, 'stack', {
            enumerable: false,
        });
    }

    // ────────────────────────────────────────────────
    //                Factory methods
    // ────────────────────────────────────────────────

    static badRequest(message = 'Bad Request', details?: Record<string, any>) {
        return new AppError(400, message, true, { details });
    }

    static unauthorized(message = 'Unauthorized', code = 'AUTH_UNAUTHORIZED') {
        return new AppError(401, message, true, { code });
    }

    static forbidden(message = 'Forbidden', code = 'AUTH_FORBIDDEN') {
        return new AppError(403, message, true, { code });
    }

    static notFound(message = 'Resource Not Found', code = 'RESOURCE_NOT_FOUND') {
        return new AppError(404, message, true, { code });
    }

    static conflict(message = 'Conflict', code = 'RESOURCE_CONFLICT') {
        return new AppError(409, message, true, { code });
    }

    static gone(message = 'Gone', code = 'RESOURCE_GONE') {
        return new AppError(410, message, true, { code });
    }

    static tooManyRequests(message = 'Too Many Requests', code = 'RATE_LIMIT_EXCEEDED') {
        return new AppError(429, message, true, { code });
    }

    static internal(
        message = 'Internal Server Error',
        code = 'INTERNAL_SERVER_ERROR',
        details?: Record<string, any>
    ) {
        return new AppError(500, message, false, { code, details });
    }

    static serviceUnavailable(message = 'Service Unavailable', code = 'SERVICE_UNAVAILABLE') {
        return new AppError(503, message, true, { code });
    }

    static custom(
        statusCode: number,
        message: string,
        isOperational = true,
        options: { code?: string; details?: Record<string, any> } = {}
    ) {
        return new AppError(statusCode, message, isOperational, options);
    }

    /**
     * Helper to check if error is instance of AppError
     */
    static isAppError(error: unknown): error is AppError {
        return error instanceof AppError;
    }

    /**
     * Safe JSON representation (useful for logging / sending to client)
     */
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            isOperational: this.isOperational,
            code: this.code,
            details: this.details,
            timestamp: this.timestamp,
        };
    }
}