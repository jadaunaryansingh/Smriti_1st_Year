import type { RequestHandler } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateJSON<T>(prompt: string): Promise<T> {
  // Prefer environment variable, but fall back to inline key so the
  // app works even if .env loading is misconfigured in this setup.
  const apiKey =
    process.env.GEMINI_API_KEY ??
    "AIzaSyAHTQvsdNz6UQd4yPeZ90Wv756wZdI5z_o";

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const text = result.response.text();
  return JSON.parse(text) as T;
}

// --- Riddles ---

type Riddle = {
  id: string;
  question: string;
  answer: string;
};

type RiddlesResponse = {
  riddles: Riddle[];
};

export const handleRiddles: RequestHandler = async (_req, res) => {
  try {
    const data = await generateJSON<RiddlesResponse>(
      [
        "Generate 5 short logical riddles suitable for college students.",
        "Return strictly JSON in this shape:",
        '{ "riddles": [ { "id": "string", "question": "string", "answer": "short string answer" } ] }',
        "Questions should be fun but clear. Answers should be concise single words or short phrases.",
      ].join("\n"),
    );

    res.status(200).json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[GEMINI] Riddles error", error);
    res
      .status(500)
      .json({ message: "Failed to generate riddles. Try again later." });
  }
};

// --- Coding challenge ---

type CodingQuestion = {
  id: string;
  title: string;
  description: string;
  language: string;
  functionSignature: string;
  starterCode: string;
};

type CodingQuestionResponse = {
  question: CodingQuestion;
};

export const handleCodingQuestion: RequestHandler = async (req, res) => {
  const language = (req.query.language as string | undefined) ?? "javascript";

  try {
    const data = await generateJSON<CodingQuestionResponse>(
      [
        "Create a beginner-friendly coding challenge for a college student.",
        "Focus on core programming concepts (loops, conditionals, arrays, strings).",
        "Return strictly JSON in this shape:",
        '{ "question": { "id": "string", "title": "string", "description": "string", "language": "string", "functionSignature": "string", "starterCode": "string" } }',
        `The target language is: ${language}.`,
        "The description should clearly state the problem and include at least one example.",
        "The functionSignature should be a single line with the function declaration appropriate for the language.",
        "The starterCode should include the functionSignature and TODO comments for the student.",
      ].join("\n"),
    );

    res.status(200).json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[GEMINI] Coding question error", error);
    // eslint-disable-next-line no-console
    console.error("[GEMINI] Error details:", error instanceof Error ? error.message : String(error));
    res
      .status(500)
      .json({ 
        message: "Failed to generate coding challenge. Try again.",
        error: error instanceof Error ? error.message : "Unknown error"
      });
  }
};

type CodingCheckRequestBody = {
  language: string;
  userCode: string;
  title: string;
  description: string;
};

type CodingCheckResult = {
  passed: boolean;
  feedback: string;
};

export const handleCodingCheck: RequestHandler = async (req, res) => {
  const body = req.body as CodingCheckRequestBody;

  if (!body?.userCode || !body?.description || !body?.title) {
    res.status(400).json({ message: "Missing code or challenge details." });
    return;
  }

  try {
    const result = await generateJSON<CodingCheckResult>(
      [
        "You are an automatic code evaluator for programming challenges.",
        "You will receive:",
        '- The challenge title and description (including any examples).',
        "- The programming language.",
        "- The student's submitted code.",
        "",
        "Decide if the solution is likely correct based on the description and examples.",
        "Be strict but fair. Consider edge cases when possible.",
        "",
        "Return strictly JSON in this shape:",
        '{ "passed": boolean, "feedback": "string helpful explanation and suggestions" }',
        "",
        `Language: ${body.language}`,
        `Challenge title: ${body.title}`,
        `Challenge description: ${body.description}`,
        "Student code:",
        body.userCode,
      ].join("\n"),
    );

    res.status(200).json(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[GEMINI] Coding check error", error);
    res
      .status(500)
      .json({ message: "Failed to check code. Please try again later." });
  }
};

// --- Quiz ---

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type QuizResponse = {
  questions: QuizQuestion[];
};

export const handleQuiz: RequestHandler = async (_req, res) => {
  try {
    const data = await generateJSON<QuizResponse>(
      [
        "Generate a short multiple-choice quiz for college students about computer science and programming fundamentals.",
        "Return exactly 5 questions.",
        "Each question must have 4 options and one correct answer.",
        "Return strictly JSON in this shape:",
        '{ "questions": [ { "id": "string", "question": "string", "options": ["A", "B", "C", "D"], "correctIndex": 0, "explanation": "string explaining why the correct answer is correct" } ] }',
        "Make questions concise and explanations 1-3 sentences long.",
      ].join("\n"),
    );

    res.status(200).json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[GEMINI] Quiz error", error);
    res
      .status(500)
      .json({ message: "Failed to generate quiz. Please try again later." });
  }
};

