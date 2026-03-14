import { FastifyInstance } from "fastify";
import { User } from "../../generated/prisma/client";
import { UserRole } from "../../generated/prisma/enums";

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


        const refreshToken = app.refreshJwt.sign(payload, { expiresIn: "7d" });


        return { accessToken, refreshToken }

    }

    public static verifyAccessToken = (app: FastifyInstance, token: string) => {
        try {
            const payload = app.jwt.verify(token);
            return payload;
        } catch (error) {
            throw new Error("Invalid or expired access token")
        }
    }

    public static verifyRefreshToken = (app: FastifyInstance, token: string) => {
        try {
            const payload = app.refreshJwt.verify(token);
            return payload;
        } catch (error) {
            throw new Error("Invalid or expired refresh token")
        }
    }

}