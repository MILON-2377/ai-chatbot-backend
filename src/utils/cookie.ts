import { FastifyReply } from "fastify"
import { getEnv } from "../config/env.config"




export default class CookieService {

    private static isProd = getEnv.NODE_ENV === "production"

    private static setCookieOptions = {
        httpOnly: true,
        secure: this.isProd,
        sameSite: this.isProd ? ("none" as const) : ("lax" as const),
        path: "/"
    }

    public static setAccessTokenCookie = (reply: FastifyReply, value: string) => {
        reply.setCookie(getEnv.ACCESS_TOKEN_NAME, value, {
            ...this.setCookieOptions,
            maxAge: 60 * 60 * 24
        })
    }

    public static setRefreshTokenCookie = (reply: FastifyReply, value: string) => {
        reply.setCookie(
            getEnv.REFRESH_TOKEN_NAME,
            value,
            {
                ...this.setCookieOptions,
                maxAge: 60 * 60 * 27 * 7
            }
        );
    }


    public static setBetterAuthTokenCookie = (reply: FastifyReply, value: string) => {
        reply.setCookie(
            getEnv.BETTER_AUTH_TOKEN,
            value,
            {
                ...this.setCookieOptions,
                maxAge: 60 * 60 * 24
            }
        )
    }

    public static clearCookie = (reply: FastifyReply, key: string) => {
        reply.clearCookie(key, {
            ...this.setCookieOptions
        });
    }

}