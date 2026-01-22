import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

exports.ApiError = class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

exports.errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof exports.ApiError) {
        const apiError = err as typeof exports.ApiError;
        return res.status(apiError.statusCode).json({
            status: 'error',
            statusCode: apiError.statusCode,
            message: apiError.message,
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle Prisma unique constraint violation
        if (err.code === 'P2002') {
            return res.status(409).json({
                status: 'error',
                statusCode: 409,
                message: `Conflict: A record with this value already exists.`,
                field: (err.meta?.target as string[])?.join(', '),
            });
        }
    }

    // For any other unexpected error
    console.error('UNEXPECTED ERROR: ', err);
    return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Internal Server Error',
    });
};
