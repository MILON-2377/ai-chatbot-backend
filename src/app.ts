import fastify from "fastify";
import routes from "./routes/root.routes";

export default function createApp() {
  const app = fastify({logger: true});

  app.register(routes, { prefix: "/api/v1" });

  return app;
}
