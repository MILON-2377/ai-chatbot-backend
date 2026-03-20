import { FastifyInstance } from "fastify";
import chatRoutes from "../modules/chat/chat.routes";
import authRoutes from "../modules/auth/auth.routes";

export default function routes(app: FastifyInstance) {

  // chat route
  app.register(chatRoutes, { prefix: "/chat" });

  // auth route
  app.register(authRoutes, { prefix: "/auth" });

  // chat route
  app.register(chatRoutes);

  app.get("/", (req, reply) => {
    reply.send({
      success: true,
      message: "ok",
    });
  });
}
