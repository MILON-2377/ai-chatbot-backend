import createApp from "./app";

const app = createApp();

const start = async () => {
  try {
    await app.listen({ port: 5000, host: "0.0.0.0" });
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};


start();
