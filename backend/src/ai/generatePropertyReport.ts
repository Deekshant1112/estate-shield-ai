import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function generatePropertyReport(property: any) {
  const prompt = `
You are EstateShield.AI — India's smartest AI real estate intelligence system.
Analyze the property and return ONLY STRICT JSON.

Property details:
Title: ${property.title}
Location: ${property.location}
BHK: ${property.bhk}
Price: ${property.price || "Unknown"}
Builder: ${property.builder || "Unknown"}

Generate a detailed AI-driven report with these fields ONLY:

{
  "score": number,   
  "priceRange": "string",
  "priceFairness": "string",
  "negotiationMargin": "string",
  "verdict": "string",
  "summary": "string",

  "pros": ["string"],
  "cons": ["string"],

  "localityInsights": {
    "crimeRisk": "string",
    "floodRisk": "string",
    "connectivity": "string",
    "futureGrowth": "string"
  },

  "builderReputation": "string",
  "rentalYield": "string",
  "appreciationForecast": "string",

  "demandTrend": "string",
  "riskFactors": ["string"],

  "news": ["string"]
}

Rules:
- ALWAYS return valid JSON.
- DO NOT include explanations.
- DO NOT include markdown.
  `;

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // Free, fast, reliable
      messages: [
        {
          role: "system",
          content: "You produce structured real estate reports strictly in JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    });

    const output = response.choices[0]?.message?.content;
    console.log("RAW AI OUTPUT →", output);

    // Extract ONLY the JSON from the response
    const jsonMatch = output?.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.log("❌ Invalid AI JSON output:", output);
      return { error: "Invalid AI JSON" };
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.log("❌ JSON Parse Error:", e);
      console.log("Invalid JSON:", jsonMatch[0]);
      return { error: "Failed to parse AI JSON" };
    }

    return parsed;

  } catch (err: any) {
    console.log("AI Error →", err.response?.data || err.message || err);
    return { error: "AI request failed" };
  }
}
