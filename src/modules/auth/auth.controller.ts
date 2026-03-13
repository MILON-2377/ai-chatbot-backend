import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "./auth.services";
import { LoginInput, RegistrationInput } from "./auth.validation";

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

  public static login = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const response = await AuthService.login(req.body as LoginInput);

      return reply.status(200).send({
        success: true,
        data: response,
      });
    } catch (error) {
      console.error("Login error", error);
      return reply.status(500).send({
        success: false,
        error: error,
      });
    }
  };
}
