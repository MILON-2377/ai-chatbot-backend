import { FastifyRequest } from "fastify";
import z from "zod";

export default function validatedBody(schema: z.ZodObject) {
  return (req: FastifyRequest) => {

    const parsedResult = schema.safeParse(req.body);

    if (!parsedResult.success) {
      throw new Error(
        parsedResult.error.issues.map((e) => e.message).join(", "),
      );
    }

    req.body = parsedResult.data;
  };
}
