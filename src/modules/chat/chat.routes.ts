import { FastifyInstance } from "fastify";
import ChatController from "./chat.controller";

export default function chatRoutes(route: FastifyInstance) {
  route.post("/", ChatController.handleChat);
}
