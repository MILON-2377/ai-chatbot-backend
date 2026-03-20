import z from "zod";


export const ChatSchema = z.object({
    conversationId: z
        .string().uuid("Conversation Id is missing or Invalid"),
    message: z
        .string("Message is required")
        .min(1, "Minimum one character required")
});



export type ChatInput = z.infer<typeof ChatSchema>;