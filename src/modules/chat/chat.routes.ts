import { FastifyInstance } from "fastify";
import ChatController from "./chat.controller";
import Authentication from "../../middlewares/authentication";
import validatedBody from "../../utils/validatedBody";
import { ChatSchema } from "./chat.validation";

export default function chatRoutes(route: FastifyInstance) {
  route.post("/", { preHandler: [Authentication.authenticate(), validatedBody(ChatSchema)] }, ChatController.chat);
}
