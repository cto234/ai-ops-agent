import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeMessage(message) {
  const prompt = `
Classify this message.

Return JSON ONLY:
{
  "type": "support | sales | bug | spam",
  "priority": "low | medium | high",
  "response": "short reply"
}

Message:
${message}
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });
  console.log("RAW RESPONSE:");
  console.log(completion.choices[0].message.content);

  return JSON.parse(completion.choices[0].message.content);
}