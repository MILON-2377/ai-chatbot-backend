import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "./auth.services";
import { RegistrationInput } from "./auth.validation";

export default class AuthController {
  public static register = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      console.log("validated body", req.body);

      const response = await AuthService.register(
        req.body as RegistrationInput,
      );

      return reply.status(200).send({
        success: true,
        data: response,
      });
    } catch (error) {
      console.error("User registration error", error);
      return reply.send({
        success: false,
        error: error,
      });
    }
  };
}
