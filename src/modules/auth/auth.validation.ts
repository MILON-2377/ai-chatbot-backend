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

export type RegistrationInput = z.infer<typeof RegistrationSchema>;
