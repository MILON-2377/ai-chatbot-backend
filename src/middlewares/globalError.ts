// src/plugins/errorHandler.ts
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import {
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
    PrismaClientInitializationError,
} from '@prisma/client/runtime/library';
import AppError from '../utils/AppError';

// Prisma error code → HTTP + friendly message mapping
const prismaErrorMap: Record<string, { status: number; msg: string; code?: string }> = {
    P2002: { status: 409, msg: 'Resource already exists (unique constraint violation)', code: 'UNIQUE_CONSTRAINT' },
    P2025: { status: 404, msg: 'Record not found', code: 'NOT_FOUND' },
    P2003: { status: 400, msg: 'Foreign key constraint failed', code: 'FOREIGN_KEY_VIOLATION' },
    P1001: { status: 503, msg: 'Cannot reach database server', code: 'DB_CONNECTION_FAILED' },
    // Add more as you encounter them: https://www.prisma.io/docs/orm/reference/error-reference
};

export default async function globalError(fastify: FastifyInstance) {
    fastify.setErrorHandler((err: any, req: FastifyRequest, reply: FastifyReply) => {
        // ────────────────────────────────────────────────
        // 1. Our trusted/operational AppError
        // ────────────────────────────────────────────────
        if (err instanceof AppError) {
            const payload = err.toJSON();

            // Optional: expose stack in development only
            if (process.env.NODE_ENV !== 'production' && (err as Error).stack) {
                (payload as Record<string, any>).stack = (err as Error).stack;
            }

            reply.code(err.statusCode).type('application/json').send(payload);
            return;
        }

        // ────────────────────────────────────────────────
        // 2. Zod validation errors (manual parse / type-provider-zod)
        // ────────────────────────────────────────────────
        if (err instanceof ZodError) {
            const issues = err.issues.map(issue => ({
                path: issue.path.join('.') || '(root)',
                message: issue.message,
                code: issue.code,
                // only show received value in dev (security)
                ...(process.env.NODE_ENV !== 'production' && { received: (issue as any).received }),
            }));

            const appErr = AppError.badRequest('Validation failed', {
                code: 'VALIDATION_ERROR',
                details: { issues },
            });

            req.log.warn({ error: err, issues }, 'Zod validation failed');
            reply.code(400).send(appErr.toJSON());
            return;
        }

        // ────────────────────────────────────────────────
        // 3. Fastify schema validation fallback (non-Zod cases)
        // ────────────────────────────────────────────────
        if (err?.validation) {
            const issues = err.validation.map((v: any) => ({
                path: v.instancePath || v.dataPath || '(unknown)',
                message: v.message || 'Invalid value',
                keyword: v.keyword,
            }));

            const appErr = AppError.badRequest('Request validation failed', {
                code: 'SCHEMA_VALIDATION_ERROR',
                details: { issues },
            });

            req.log.warn({ error: err }, 'Fastify schema validation error');
            reply.code(400).send(appErr.toJSON());
            return;
        }

        // ────────────────────────────────────────────────
        // 4. Prisma known request errors (Pxxxx codes)
        // ────────────────────────────────────────────────
        if (err instanceof PrismaClientKnownRequestError) {
            const mapped = prismaErrorMap[err.code] ?? {
                status: 400,
                msg: 'Database constraint / operation error',
                code: 'PRISMA_UNKNOWN',
            };

            const appErr = AppError.custom(
                mapped.status,
                mapped.msg,
                true,
                {
                    code: mapped.code ?? `PRISMA_${err.code}`,
                    details: {
                        prismaCode: err.code,
                        meta: err.meta,
                    },
                }
            );

            req.log.warn(
                { prismaCode: err.code, meta: err.meta },
                'Prisma known request error'
            );

            reply.code(appErr.statusCode).send(appErr.toJSON());
            return;
        }

        // ────────────────────────────────────────────────
        // 5. Prisma validation / initialization errors
        // ────────────────────────────────────────────────
        if (err instanceof PrismaClientValidationError) {
            const appErr = AppError.badRequest('Invalid Prisma query parameters', {
                code: 'PRISMA_VALIDATION_ERROR',
                details: { prismaMessage: err.message },
            });

            req.log.warn({ error: err.message }, 'Prisma validation error');
            reply.code(400).send(appErr.toJSON());
            return;
        }

        if (err instanceof PrismaClientInitializationError) {
            req.log.error(err, 'Prisma client initialization failed');
            const appErr = AppError.serviceUnavailable('Database service unavailable');
            reply.code(503).send(appErr.toJSON());
            return;
        }

        // ────────────────────────────────────────────────
        // 6. Everything else → unexpected crash / bug
        // ────────────────────────────────────────────────
        req.log.error(err, 'Unhandled / unexpected error');

        const internalErr = AppError.internal(
            'Internal server error',
            'UNEXPECTED_ERROR',
            process.env.NODE_ENV === 'development' ? { stack: (err as Error)?.stack } : undefined
        );

        reply.code(500).send(internalErr.toJSON());
    });
}