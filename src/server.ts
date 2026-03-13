import createApp from "./app";
import { prisma } from "./lib/prisma";

const app = createApp();

const start = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    await app.listen({ port: 5000, host: "0.0.0.0" });
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};

start();
