import {
  ChatCompletionUserMessageParam,
  ChatCompletionAssistantMessageParam,
  ChatCompletionSystemMessageParam
} from "openai/resources";
import { groqAi } from "../../config/ai.config";
import { prisma } from "../../lib/prisma";
import getAiResponse from "../../services/ai.service";
import { MessageRole } from "../../../generated/prisma/enums";

interface ChatInput {
  userId: string;
  conversationId?: string;
  message: string;
};


type ChatMessageParam =
  | ChatCompletionUserMessageParam
  | ChatCompletionAssistantMessageParam
  | ChatCompletionSystemMessageParam;


export default class ChatService {

  public static generateAiResponse = async (userMessages: { role: string; content: string }[]) => {


    const messages: ChatMessageParam[] = userMessages.map((m) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content
    }));


    const stream = await groqAi.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      messages: messages,
      stream: true
    });

    return stream;

  }

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
          role: MessageRole.USER,
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

      const stream = await this.generateAiResponse(
        messages.map((m) => ({ role: m.role.toLowerCase(), content: m.content })),
      );

      

      return {
        conversationId: convId,
        stream,
      };
    } catch (error) {
      console.error("chat service error: ", error);
    }
  };
}
