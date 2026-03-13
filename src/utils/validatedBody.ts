import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export default function validatedBody(schema: z.ZodObject) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const parsedResult = schema.safeParse(req.body);

    if (!parsedResult.success) {
      return reply.status(400).send({
        success: false,
        error: parsedResult.error.issues.map((e) => e.message).join(", "),
      });
    }

    req.body = parsedResult.data;
  };
}
