export default async function getAiResponse(
  messages: { role: string; content: string }[],
): Promise<string> {
  const lastUserMessage =
    messages.filter((m) => m.role === "USER").pop()?.content || "";

  return `AI Response to: "${lastUserMessage}"`;
}
