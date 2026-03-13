import dotenv from "dotenv";

dotenv.config();

interface IEnv {
  PORT: number;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  GROQ_API_SECRET: string;
  DATABASE_URL: string;
}

const configureEnv = (): IEnv => {
  const evnArrays = [
    "PORT",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "GROQ_API_SECRET",
    "DATABASE_URL",
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
  };
};

export const getEnv = configureEnv();
