import { prisma } from "../../lib/prisma";
import getAiResponse from "../../services/ai.service";

interface ChatInput {
  userId: string;
  conversationId?: string;
  message: string;
}

export default class ChatService {
  public static chatWithAi = async ({
    userId,
    conversationId,
    message,
  }: ChatInput) => {
    try {
      let convId = conversationId;

      if (!convId) {
        const conversation = await prisma.conversation.create({
          data: { userId },
        });

        convId = conversation.id;
      }

      await prisma.message.create({
        data: {
          conversationId: convId,
          role: "USER",
          content: message,
        },
      });

      const messages = await prisma.message.findMany({
        where: {
          conversationId: convId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const aiResponse = await getAiResponse(
        messages.map((m) => ({ role: m.role, content: m.content })),
      );

      const aiMessage = await prisma.message.create({
        data: {
          conversationId: convId,
          role: "ASSISTANT",
          content: aiResponse,
        },
      });

      return {
        conversationId: convId,
        aiMessage,
      };
    } catch (error) {
      console.error("chat service error: ", error);
    }
  };
}
