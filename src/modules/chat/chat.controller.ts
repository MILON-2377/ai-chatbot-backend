import { FastifyReply, FastifyRequest } from "fastify";
import ChatService from "./chat.services";
import { prisma } from "../../lib/prisma";
import { MessageRole } from "../../../generated/prisma/enums";

interface ChatBody {
  conversationId?: string;
  message: string;
}

export default class ChatController {
  public static chat = async (
    req: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      const userId = req.user.userId;
      const { conversationId, message } = req.body as ChatBody;


      const { stream, conversationId: convId }: {stream: any, conversationId: string} = await ChatService.chatWithAi({ userId, conversationId, message });

      reply.raw.writeHead(200, {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked"
      });


      let aiFullMessage = "";

      for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content;

        if (!token) continue;

        aiFullMessage += token;

        reply.raw.write(token);

      }

      await prisma.message.create({
        data: {
          conversationId: convId,
          role: MessageRole.ASSISTANT,
          content: aiFullMessage
        }
      });

      reply.raw.end();

    } catch (error) {
      console.error(error);
      reply.status(500).send({
        success: false,
        error: "Internal server error",
      });
    }
  };

}
