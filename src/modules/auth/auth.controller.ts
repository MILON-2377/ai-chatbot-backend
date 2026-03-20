import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "./auth.services";
import { LoginInput, RegistrationInput } from "./auth.validation";
import TokenService from "../../utils/jwt";
import { User } from "../../../generated/prisma/client";
import CookieService from "../../utils/cookie";
import asyncHandler from "../../middlewares/aysncHandler";

export default class AuthController {
  public static register = asyncHandler(async (req: FastifyRequest, reply: FastifyReply) => {

    const response = await AuthService.register(
      req.body as RegistrationInput,
    );



  });

  public static login = asyncHandler(async (req: FastifyRequest, reply: FastifyReply) => {

    const response = await AuthService.login(req.body as LoginInput);


    const generatedTokens = TokenService.generateToken(req.server, response.user as User);

    CookieService.setAccessTokenCookie(reply, generatedTokens.accessToken);
    CookieService.setRefreshTokenCookie(reply, generatedTokens.refreshToken);
    CookieService.setBetterAuthTokenCookie(reply, response.token)

    return reply.status(200).send({
      success: true,
      data: response,
    });

  });


  public static verifyEmail = asyncHandler(async (req: FastifyRequest, reply: FastifyReply) => {

    const { email, otp } = req.body as { email: string, otp: string };


    const response = await AuthService.verifyEmail(email, otp);


    return reply.send(response.statusCode).send(response);

  })

}
