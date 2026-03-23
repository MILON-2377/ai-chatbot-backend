import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "./auth.services";
import { LoginInput, RegistrationInput } from "./auth.validation";
import TokenService from "../../utils/jwt";
import { User } from "../../../generated/prisma/client";
import CookieService from "../../utils/cookie";
import asyncHandler from "../../middlewares/aysncHandler";
import { auth } from "../../lib/auth";
import { getEnv } from "../../config/env.config";
import AppResponse from "../../utils/AppResponse";
import AppError from "../../utils/AppError";
import { prisma } from "../../lib/prisma";

export default class AuthController {

  public static register = asyncHandler(async (req: FastifyRequest, reply: FastifyReply) => {

    const response = await AuthService.register(
      req.body as RegistrationInput,
    );

    return reply.status(response.statusCode).send(response);

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

    const { email, code } = req.body as { email: string, code: string };


    const response = await AuthService.verifyEmail(email, code);


    return reply.send(response.statusCode).send(response);

  });


  public static resendVerificationOtp = asyncHandler(async (req: FastifyRequest, reply: FastifyReply) => {

    const { email } = req.body as { email: string };

    const response = await AuthService.resendVerificationOtp(email);

    return reply.status(response.statusCode).send(response);

  });


  public static logOut = asyncHandler(async (req: FastifyRequest, reply: FastifyReply) => {

    await auth.api.signOut({
      headers: req.headers as unknown as Headers
    });


    CookieService.clearCookie(reply, getEnv.ACCESS_TOKEN_NAME);
    CookieService.clearCookie(reply, getEnv.REFRESH_TOKEN_NAME);
    CookieService.clearCookie(reply, getEnv.BETTER_AUTH_TOKEN);

    return reply.status(200).send(AppResponse.ok(null, "Signed out successfully"))

  });


  public static refreshToken = asyncHandler(async (req: FastifyRequest, reply: FastifyReply) => {

    const refreshToken = req.cookies[getEnv.REFRESH_TOKEN_NAME];

    if (!refreshToken) {
      throw AppError.badRequest("Token missing or malformed");
    }

    const decodedRefreshToken = TokenService.verifyRefreshToken(req.server, refreshToken);

    if (!decodedRefreshToken) {
      throw AppError.forbidden("Forbidden")
    }



    const user = await prisma.user.findUnique({
      where: {
        email: decodedRefreshToken.email
      }
    })

    if (!user) {
      throw AppError.unauthorized("User no longer exists")
    }

    const newTokens = TokenService.generateToken(req.server, user as User);

    CookieService.setAccessTokenCookie(reply, newTokens.accessToken);
    CookieService.setAccessTokenCookie(reply, newTokens.refreshToken);


    return reply.status(200).send(AppResponse.ok("Access token refreshed successfully"))

  })

}
