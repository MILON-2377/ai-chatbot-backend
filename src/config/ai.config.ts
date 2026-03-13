import OpenAI from "openai";
import { getEnv } from "./env.config";

const groqAi = new OpenAI({
  apiKey: getEnv.GROQ_API_SECRET,
  baseURL: "https://api.groq.com/openai/v1",
});

export default groqAi;
