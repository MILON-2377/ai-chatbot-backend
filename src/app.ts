import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import routes from "./routes/root.routes";
import jwt from "@fastify/jwt";
import { getEnv } from "./config/env.config";
import globalError from "./middlewares/globalError";

export default function createApp() {
  const app = fastify({ logger: true });


  app.register(fastifyCookie);

  app.register(jwt, { secret: getEnv.JWT_ACCESS_SECRET });

  app.register(jwt, {
    secret: getEnv.JWT_REFRESH_SECRET,
    namespace: "refreshJwt",
  });

  app.register(routes, { prefix: "/api/v1" });



  // Global Error 
  app.register(globalError);

  return app;
}
