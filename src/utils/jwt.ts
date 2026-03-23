import { FastifyInstance } from "fastify";
import { User } from "../../generated/prisma/client";
import { UserRole } from "../../generated/prisma/enums";
import { getEnv } from "../config/env.config";
import { VerifyPayloadType } from "@fastify/jwt";
import AppError from "./AppError";

export interface JwtPayload {
    email: string;
    userId: string;
    role: UserRole;
}

export default class TokenService {
    public static generateToken = (app: FastifyInstance, user: User) => {
        const payload = {
            userId: user.id,
            role: user.role,
            email: user.email
        }

        const accessToken = app.jwt.sign(payload, {
            expiresIn: "1d"
        });


        const refreshToken = app.jwt.sign(payload, {
            key: getEnv.JWT_REFRESH_SECRET,
            expiresIn: "7d"
        });


        return { accessToken, refreshToken }

    }

    public static verifyAccessToken = (app: FastifyInstance, token: string) => {
        try {
            const payload = app.jwt.verify(token);
            return payload;
        } catch (error) {
            return null;
        }
    }

    public static verifyRefreshToken = (app: FastifyInstance, token: string): JwtPayload => {
        try {
            const payload = app.jwt.verify<JwtPayload>(token, {
                key: getEnv.JWT_REFRESH_SECRET
            });
            return payload;
        } catch (error) {
            throw AppError.forbidden("Invalid or expired refresh token")
        }
    }

}