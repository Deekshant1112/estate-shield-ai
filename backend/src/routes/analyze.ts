import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth";
import axios from "axios";
import { generatePropertyReport } from "../ai/generatePropertyReport";
import { groq } from "../ai/groqClient";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", authMiddleware, async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ message: "URL missing" });

  try {
    // STEP 1: Fetch HTML content
    const html = await axios.get(url).then((r) => r.data);

    // STEP 2: Ask Groq to extract property information
    const extraction = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "system",
          content: "You are EstateShield.AI — extract clean property details from HTML."
        },
        {
          role: "user",
          content: `Extract property details from this HTML:\n\n${html}\n\nReturn ONLY JSON:\n{
              "title": string,
              "location": string,
              "price": string,
              "bhk": string,
              "builder": string
            }`
        }
      ],
      temperature: 0.2
    });

    // -------------------------------
    // SAFE JSON PARSING from AI
    // -------------------------------
    const content = extraction.choices?.[0]?.message?.content;

    if (!content) {
      console.log("AI returned no message:", extraction);
      return res.status(500).json({ message: "AI returned empty response" });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.log("❌ AI JSON parse FAILED. Raw content →", content);
      return res.status(500).json({ message: "AI returned invalid JSON" });
    }

    // STEP 3: Save property data
    const newProperty = await prisma.property.create({
      data: {
        url,
        userId: Number(req.user),
        title: parsed.title || null,
        location: parsed.location || null,
        price: parsed.price || null,
        bhk: parsed.bhk || null,
        builder: parsed.builder || null
      }
    });

    // STEP 4: Generate advanced AI report
    const ai = await generatePropertyReport(parsed);

    await prisma.aiReport.create({
      data: {
        propertyId: newProperty.id,
        score: ai.score,
        priceRange: ai.priceRange,
        verdict: ai.verdict,
        summary: ai.summary,
        localityInsights: ai.localityInsights,
        rentalYield: ai.rentalYield,
        appreciationForecast: ai.appreciationForecast,
        news: ai.news
      }
    });

    // STEP 5: Final response
    res.json({
      message: "AI Analysis Complete",
      propertyId: newProperty.id
    });

  } catch (err) {
    console.log("Analyze Error →",err);
    res.status(500).json({ message: "Failed to analyze property" });
  }
});

export default router;
