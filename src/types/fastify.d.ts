
import "@fastify/jwt";
import { UserRole } from "../../generated/prisma/enums";

declare module "fastify" {
    interface FastifyInstance {
        refreshJwt: import("@fastify/jwt").JWT;
        user?: {
            userId: string;
            email: string;
            role: UserRole;
        }
    }
}