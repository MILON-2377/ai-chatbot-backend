import { FastifyInstance } from "fastify";
import AuthController from "./auth.controller";
import validatedBody from "../../utils/validatedBody";
import { LoginSchema, RegistrationSchema } from "./auth.validation";

export default function authRoutes(route: FastifyInstance) {
  route.post(
    "/register",
    { preHandler: [validatedBody(RegistrationSchema)] },
    AuthController.register,
  );

  route.post(
    "/login",
    { preHandler: [validatedBody(LoginSchema)] },
    AuthController.login,
  );
}
