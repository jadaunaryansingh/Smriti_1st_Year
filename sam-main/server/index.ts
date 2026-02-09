import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleCodingCheck,
  handleCodingQuestion,
  handleQuiz,
  handleRiddles,
} from "./routes/ai";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // AI-powered routes (Gemini / Google AI Studio)
  app.get("/api/riddles", handleRiddles);
  app.get("/api/coding-question", handleCodingQuestion);
  app.post("/api/coding-check", handleCodingCheck);
  app.get("/api/quiz", handleQuiz);

  return app;
}
