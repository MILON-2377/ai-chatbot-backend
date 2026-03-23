import z from "zod";

export const RegistrationSchema = z.object({
  email: z.email("Email is required"),
  name: z
    .string("User name is required")
    .min(3, "Name must be at least 3 character"),
  password: z
    .string("Password is required")
    .min(8, "Minimum 8 characters required"),
});

export const LoginSchema = z.object({
  email: z.email("Email is required"),
  password: z.string("Password is required")
});


export const EmailVerificationSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, "Minimum 6 digit otp ")
});


export type RegistrationInput = z.infer<typeof RegistrationSchema>;
export type LoginInput = z.infer<typeof LoginSchema>
export type EmailVerificationInput = z.infer<typeof EmailVerificationSchema>;