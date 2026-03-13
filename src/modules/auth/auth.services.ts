import { auth } from "../../lib/auth";
import { LoginInput, RegistrationInput } from "./auth.validation";

export default class AuthService {
  public static register = async (data: RegistrationInput) => {
    console.log({ data });

    try {
      const result = await auth.api.signUpEmail({
        body: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      });

      return result;
    } catch (error) {
      console.error("Auth register error: ", error);
      throw error;
    }
  };

  public static login = async (data: LoginInput) => {
    const result = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    return result;
  };
}
