import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { getEnv } from "../config/env.config";
import { UserRole, UserStatus } from "../../generated/prisma/enums";
import { bearer, emailOTP } from "better-auth/plugins";
import { emailService } from "../emails/email.service";

export const auth = betterAuth({
  baseURL: getEnv.BETTER_AUTH_URL,
  secret: getEnv.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },


  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: UserRole.USER,
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },
    },
  },

  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({
        email, otp, type
      }) {

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!user) {
          return;
        }

        if (type === "email-verification") {




          await emailService.send({
            to: email,
            subject: "Verify your email",
            template: "verify-otp",
            data: {
              otp,
              username: "",
              expiresInMinutes: 2,
            }
          })

        }



      },
      expiresIn: 2 * 60,
      otpLength: 6,
    
    })
  ]

});
