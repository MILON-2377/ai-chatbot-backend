import { ComponentType } from "react";
import { TemplatePayloadMap } from "../email.types";

import VerifyOtpEmail from "./verify-otp";
import WelcomeEmail from "./welcome";
import PasswordResetEmail from "./reset-password";

export const templateRegistry: {
  [K in keyof TemplatePayloadMap]: ComponentType<TemplatePayloadMap[K]>;
} = {
  "verify-otp": VerifyOtpEmail,
  welcome: WelcomeEmail,
  "reset-password": PasswordResetEmail,
};
