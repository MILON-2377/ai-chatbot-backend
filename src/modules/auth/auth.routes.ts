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

  route.post("/verify-email", AuthController.verifyEmail);

  route.post("/resend-otp", AuthController.resendVerificationOtp);

  route.post("/sign-out", AuthController.logOut);

  route.get("/refresh-token", AuthController.refreshToken)

}
