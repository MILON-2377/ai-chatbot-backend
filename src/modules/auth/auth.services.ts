import { auth } from "../../lib/auth";
import AppError from "../../utils/AppError";
import AppResponse from "../../utils/AppResponse";
import { LoginInput, RegistrationInput } from "./auth.validation";

export default class AuthService {
  public static register = async (data: RegistrationInput) => {


    const result = await auth.api.signUpEmail({
      body: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });

    return AppResponse.created(result, "User register successfully")

  }


  public static login = async (data: LoginInput) => {

    const result = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    return result;

  };

  public static verifyEmail = async (email: string, otp: string) => {

    const result = await auth.api.verifyEmailOTP({
      body: {
        email: email,
        otp: otp
      }
    });

    console.log({ result })


    return AppResponse.ok(null, "Email verification successfully");

  }

  public static resendVerificationOtp = async (email: string) => {

    await auth.api.sendVerificationOTP({
      body: {
        email,
        type: "email-verification"
      }
    });

    return AppResponse.ok(null, "Resend verification otp successfully")

  }


}
