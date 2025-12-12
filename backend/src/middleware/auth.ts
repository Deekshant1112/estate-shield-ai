import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header)
    return res.status(401).json({ message: "Unauthorized" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded.id;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  console.log("AUTH HEADER:", req.headers.authorization);

};


