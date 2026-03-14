import { FastifyReply, FastifyRequest } from "fastify"
import { UserRole } from "../../generated/prisma/enums"
import { getEnv } from "../config/env.config"
import TokenService from "../utils/jwt"


export default class Authentication {
    public static authenticate = (...allowedRules: UserRole[]) => {
        return async (req: FastifyRequest, reply: FastifyReply) => {

            const token = req.cookies[getEnv.ACCESS_TOKEN_NAME];

            if (!token) {
                return reply.code(401).send({
                    success: false,
                    message: "Unauthorized"
                })
            }

            const decoded = TokenService.verifyAccessToken(req.server, token);

            if (allowedRules.length > 0 && !allowedRules.includes((decoded as any).role)) {
                return reply.code(403).send({
                    success: false,
                    message: "Forbidden"
                })
            }

            req.user = decoded;

        }
    }
}