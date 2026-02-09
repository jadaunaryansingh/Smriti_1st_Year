import { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateJSON(prompt: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" },
  });
  return JSON.parse(result.response.text());
}

export const handler: Handler = async (event) => {
  const { path, httpMethod, body } = event;
  
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    // Ping endpoint
    if (path === "/api/ping" || path.includes("/ping")) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: process.env.PING_MESSAGE || "ping" }),
      };
    }

    // Riddles endpoint
    if (path === "/api/riddles" || path.includes("/riddles")) {
      const data = await generateJSON(
        'Generate 5 short logical riddles suitable for college students.\nReturn strictly JSON in this shape:\n{ "riddles": [ { "id": "string", "question": "string", "answer": "short string answer" } ] }\nQuestions should be fun but clear. Answers should be concise single words or short phrases.'
      );
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // Coding question endpoint
    if (path.includes("/coding-question")) {
      const language = "javascript";
      const data = await generateJSON(
        `Create a beginner-friendly coding challenge for a college student.\nFocus on core programming concepts (loops, conditionals, arrays, strings).\nReturn strictly JSON in this shape:\n{ "question": { "id": "string", "title": "string", "description": "string", "language": "string", "functionSignature": "string", "starterCode": "string" } }\nThe target language is: ${language}.\nThe description should clearly state the problem and include at least one example.\nThe functionSignature should be a single line with the function declaration appropriate for the language.\nThe starterCode should include the functionSignature and TODO comments for the student.`
      );
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // Quiz endpoint
    if (path === "/api/quiz" || path.includes("/quiz")) {
      const data = await generateJSON(
        'Create 5 multiple-choice questions about programming and computer science for college students.\nReturn strictly JSON in this shape:\n{ "questions": [ { "id": "string", "question": "string", "options": ["string", "string", "string", "string"], "correctIndex": number (0-3), "explanation": "string" } ] }\nQuestions should be educational and engaging. Include 4 options per question. Provide clear explanations.'
      );
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // Coding check endpoint
    if (path.includes("/coding-check") && httpMethod === "POST") {
      const requestBody = body ? JSON.parse(body) : null;
      if (!requestBody?.userCode || !requestBody?.description || !requestBody?.title) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: "Missing code or challenge details." }),
        };
      }
      
      const result = await generateJSON(
        `You are an automatic code evaluator for programming challenges.\nYou will receive:\n- The challenge title and description (including any examples).\n- The programming language.\n- The student's submitted code.\n\nDecide if the solution is likely correct based on the description and examples.\nBe strict but fair. Consider edge cases when possible.\n\nReturn strictly JSON in this shape:\n{ "passed": boolean, "feedback": "string helpful explanation and suggestions" }\n\nLanguage: ${requestBody.language}\nChallenge title: ${requestBody.title}\nChallenge description: ${requestBody.description}\nStudent code:\n${requestBody.userCode}`
      );
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    // Default 404
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "API endpoint not found" }),
    };
  } catch (error: any) {
    console.error("[API Error]", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: "Internal server error",
        error: error.message 
      }),
    };
  }
};
