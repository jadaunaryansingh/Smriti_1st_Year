import { useEffect, useState } from "react";
import { PlatformLayout } from "@/components/PlatformLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

type CodingCheckResult = {
  passed: boolean;
  feedback: string;
};

export default function Coding() {
  const [question, setQuestion] = useState<CodingQuestion | null>(null);
  const [userCode, setUserCode] = useState("");
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<CodingCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadQuestion = async () => {
    try {
      setLoadingQuestion(true);
      setError(null);
      setResult(null);
      const res = await fetch("/api/coding-question?language=javascript");
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to load coding challenge" }));
        throw new Error(errorData.message || "Failed to load coding challenge");
      }
      const data = (await res.json()) as CodingQuestionResponse;
      setQuestion(data.question);
      setUserCode(data.question.starterCode ?? "");
    } catch (err) {
      console.error("Error loading question:", err);
      setError((err as Error).message ?? "Something went wrong");
    } finally {
      setLoadingQuestion(false);
    }
  };

  useEffect(() => {
    void loadQuestion();
  }, []);

  const handleCheck = async () => {
    if (!question) return;
    if (!userCode.trim()) {
      setResult({
        passed: false,
        feedback: "Please write some code before checking.",
      });
      return;
    }

    try {
      setChecking(true);
      setError(null);
      const res = await fetch("/api/coding-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: question.language,
          userCode,
          title: question.title,
          description: question.description,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to check your code");
      }

      const data = (await res.json()) as CodingCheckResult;
      setResult(data);
    } catch (err) {
      setError((err as Error).message ?? "Something went wrong");
    } finally {
      setChecking(false);
    }
  };

  return (
    <PlatformLayout
      title="Coding Challenges"
      description="Solve AI-generated coding challenges. Each visit gives you a new problem, and Gemini will review your solution."
    >
      <div className="mt-10 space-y-6">
        {loadingQuestion && (
          <p className="text-slate-300">Loading coding challenge...</p>
        )}
        {error && <p className="text-red-400">{error}</p>}

        {question && (
          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                {question.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-200 whitespace-pre-line">
                {question.description}
              </p>

              <div className="rounded-md bg-slate-900/80 border border-slate-700 p-3 text-xs text-slate-300 font-mono">
                {question.functionSignature}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-slate-300">
                  Write your solution below. The AI will review it for
                  correctness and give feedback.
                </p>
                <Textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="min-h-[220px] font-mono text-sm bg-slate-950/80 border-slate-800"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleCheck}
                  disabled={checking}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  {checking ? "Checking..." : "Check solution with Gemini"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => void loadQuestion()}
                  disabled={loadingQuestion}
                  className="border-primary/60 text-slate-200 hover:bg-primary/10"
                >
                  New challenge
                </Button>
              </div>

              {result && (
                <div
                  className={`mt-4 rounded-md border p-4 text-sm ${
                    result.passed
                      ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-100"
                      : "border-red-500/60 bg-red-500/10 text-red-100"
                  }`}
                >
                  <p className="font-semibold mb-1">
                    {result.passed ? "✅ Likely correct" : "❌ Needs work"}
                  </p>
                  <p>{result.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PlatformLayout>
  );
}
