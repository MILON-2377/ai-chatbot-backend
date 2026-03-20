import { FastifyReply, FastifyRequest } from "fastify";


export default function asyncHandler(fn:(req: FastifyRequest, reply: FastifyReply) => Promise<any>){
    return async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            await fn(req, reply);
        } catch (error) {
            throw error;
        }
    }
}