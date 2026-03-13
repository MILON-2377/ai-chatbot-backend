import { FastifyReply, FastifyRequest } from "fastify";
import ChatService from "./chat.services";

interface ChatBody {
  conversationId?: string;
  message: string;
}

export default class ChatController {
  public static handleChat = async (
    req: FastifyRequest<{ Body: ChatBody }>,
    reply: FastifyReply,
  ) => {
    try {
      const userId = "USER_ID_HERE";
      const { conversationId, message } = req.body;

      const result = await ChatService.chatWithAi({
        userId,
        conversationId,
        message,
      });

      reply.send({
        success: true,
        conversationId: result?.conversationId,
        message: result?.aiMessage,
      });
    } catch (error) {
      console.error(error);
      reply.status(500).send({
        success: false,
        error: "Internal server error",
      });
    }
  };
}
