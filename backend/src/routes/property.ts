import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * DUMMY TEST ROUTE — to verify backend routing works
 * GET /api/property/dummy
 */
router.get("/dummy", (req, res) => {
  console.log("🔥 Dummy property route HIT!");

  res.json({
    status: "success",
    message: "Dummy route is working!",
    exampleProperty: {
      id: 999,
      title: "Test Property",
      location: "Dummy Nagar, India",
      price: "₹50,00,000",
      bhk: "2 BHK",
      builder: "Test Builder Pvt. Ltd.",
      aiReport: {
        score: 85,
        verdict: "Good investment opportunity",
      },
    },
  });
});

/**
 * GET ALL PROPERTIES FOR LOGGED-IN USER
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = Number(req.user);

    const properties = await prisma.property.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { aiReport: true },
    });

    console.log("📄 Returning property list for user:", userId);

    res.json(properties);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

/**
 * GET SINGLE PROPERTY + AI REPORT
 */
router.get("/:id/ai", authMiddleware, async (req, res) => {
  console.log("🔥 PROPERTY AI ROUTE HIT", req.params.id);

  try {
    const id = Number(req.params.id);

    const property = await prisma.property.findUnique({
      where: { id },
      include: { aiReport: true },
    });

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json(property);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch AI report" });
  }
});

export default router;
