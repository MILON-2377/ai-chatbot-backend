import dotenv from "dotenv";

dotenv.config();

interface IEnv {
  PORT: number;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  GROQ_API_SECRET: string;
  DATABASE_URL: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_SECRET: string;
  ACCESS_TOKEN_NAME: string;
  REFRESH_TOKEN_NAME: string;
  BETTER_AUTH_TOKEN: string;
  NODE_ENV: string;
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_PASS: string;
}

const configureEnv = (): IEnv => {
  const evnArrays = [
    "PORT",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "GROQ_API_SECRET",
    "DATABASE_URL",
    "JWT_REFRESH_SECRET",
    "JWT_ACCESS_SECRET",
    "ACCESS_TOKEN_NAME",
    "REFRESH_TOKEN_NAME",
    "BETTER_AUTH_TOKEN",
    "NODE_ENV",
    "RESEND_API_KEY",
    "EMAIL_FROM",
    "EMAIL_PASS"
  ];

  evnArrays.forEach((env) => {
    if (!process.env[env]) {
      throw new Error(`Env name: ${env} is missing or not set up`);
    }
  });

  return {
    PORT: Number(process.env.PORT) as number,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
    GROQ_API_SECRET: process.env.GROQ_API_SECRET as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    ACCESS_TOKEN_NAME: process.env.ACCESS_TOKEN_NAME as string,
    REFRESH_TOKEN_NAME: process.env.REFRESH_TOKEN_NAME as string,
    BETTER_AUTH_TOKEN: process.env.BETTER_AUTH_TOKEN as string,
    NODE_ENV: process.env.NODE_ENV as string,
    RESEND_API_KEY: process.env.RESEND_API_KEY as string,
    EMAIL_FROM: process.env.EMAIL_FROM as string,
    EMAIL_PASS: process.env.EMAIL_PASS as string,
  };
};

export const getEnv = configureEnv();
