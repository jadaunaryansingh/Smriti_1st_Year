import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "AIzaSyAHTQvsdNz6UQd4yPeZ90Wv756wZdI5z_o"
);

async function generateJSON(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" },
  });
  return JSON.parse(result.response.text());
}

export default async function handler(req, res) {
  const { url, method } = req;
  
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Ping endpoint
    if (url === "/api/ping" || url.startsWith("/api/ping")) {
      return res.status(200).json({ message: process.env.PING_MESSAGE || "ping" });
    }

    // Riddles endpoint
    if (url === "/api/riddles" || url.startsWith("/api/riddles")) {
      const data = await generateJSON(
        'Generate 5 short logical riddles suitable for college students.\\nReturn strictly JSON in this shape:\\n{ "riddles": [ { "id": "string", "question": "string", "answer": "short string answer" } ] }\\nQuestions should be fun but clear. Answers should be concise single words or short phrases.'
      );
      return res.status(200).json(data);
    }

    // Coding question endpoint
    if (url.startsWith("/api/coding-question")) {
      const language = "javascript";
      const data = await generateJSON(
        `Create a beginner-friendly coding challenge for a college student.\\nFocus on core programming concepts (loops, conditionals, arrays, strings).\\nReturn strictly JSON in this shape:\\n{ "question": { "id": "string", "title": "string", "description": "string", "language": "string", "functionSignature": "string", "starterCode": "string" } }\\nThe target language is: ${language}.\\nThe description should clearly state the problem and include at least one example.\\nThe functionSignature should be a single line with the function declaration appropriate for the language.\\nThe starterCode should include the functionSignature and TODO comments for the student.`
      );
      return res.status(200).json(data);
    }

    // Quiz endpoint
    if (url === "/api/quiz" || url.startsWith("/api/quiz")) {
      const data = await generateJSON(
        'Create 5 multiple-choice questions about programming and computer science for college students.\\nReturn strictly JSON in this shape:\\n{ "questions": [ { "id": "string", "question": "string", "options": ["string", "string", "string", "string"], "correctIndex": number (0-3), "explanation": "string" } ] }\\nQuestions should be educational and engaging. Include 4 options per question. Provide clear explanations.'
      );
      return res.status(200).json(data);
    }

    // Coding check endpoint
    if (url.startsWith("/api/coding-check") && method === "POST") {
      const body = req.body;
      if (!body?.userCode || !body?.description || !body?.title) {
        return res.status(400).json({ message: "Missing code or challenge details." });
      }
      
      const result = await generateJSON(
        `You are an automatic code evaluator for programming challenges.\\nYou will receive:\\n- The challenge title and description (including any examples).\\n- The programming language.\\n- The student's submitted code.\\n\\nDecide if the solution is likely correct based on the description and examples.\\nBe strict but fair. Consider edge cases when possible.\\n\\nReturn strictly JSON in this shape:\\n{ "passed": boolean, "feedback": "string helpful explanation and suggestions" }\\n\\nLanguage: ${body.language}\\nChallenge title: ${body.title}\\nChallenge description: ${body.description}\\nStudent code:\\n${body.userCode}`
      );
      return res.status(200).json(result);
    }

    // Default 404
    return res.status(404).json({ error: "API endpoint not found" });
  } catch (error) {
    console.error("[API Error]", error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
}
