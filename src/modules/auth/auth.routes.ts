import { FastifyInstance } from "fastify";
import AuthController from "./auth.controller";
import validatedBody from "../../utils/validatedBody";
import { RegistrationSchema } from "./auth.validation";

export default function authRoutes(route: FastifyInstance) {
  route.post(
    "/register",
    { preHandler: [validatedBody(RegistrationSchema)] },
    AuthController.register,
  );
}
