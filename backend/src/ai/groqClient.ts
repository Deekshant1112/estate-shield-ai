import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.error("❌ Missing GROQ_API_KEY in .env");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});
