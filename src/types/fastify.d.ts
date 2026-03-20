
import "@fastify/jwt";
import { JWT } from "@fastify/jwt";

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            userId: string;
            email: string;
            role: string
        };
        user: {
            userId: string;
            email: string;
            role: string
        };
    }
}

declare module "fastify" {
    interface FastifyInstance {
        refreshJwtSign: JWT["sign"]
        refreshJwtVerify: JWT["verify"]
    }

    interface FastifyRequest {
        refreshJwtVerify: JWT["verify"];

    }

    interface FastifyReply {
        refreshJwtSign: JWT["sign"]
    }

}