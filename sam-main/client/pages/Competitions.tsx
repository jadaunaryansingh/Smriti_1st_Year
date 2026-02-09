import { useEffect, useState } from "react";
import { PlatformLayout } from "@/components/PlatformLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CompetitionQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type CompetitionResponse = {
  questions: CompetitionQuestion[];
};

export default function Competitions() {
  const [questions, setQuestions] = useState<CompetitionQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = questions[currentIndex];

  const loadCompetition = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowResult(false);
      setSelectedIndex(null);
      setCurrentIndex(0);
      setScore(0);
      const res = await fetch("/api/quiz");
      if (!res.ok) {
        throw new Error("Failed to load competition");
      }
      const data = (await res.json()) as CompetitionResponse;
      setQuestions(data.questions ?? []);
    } catch (err) {
      setError((err as Error).message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCompetition();
  }, []);

  const handleSubmit = () => {
    if (selectedIndex === null || !current) return;
    setShowResult(true);
    if (selectedIndex === current.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setShowResult(false);
    } else {
      // End of competition, reload a fresh one
      void loadCompetition();
    }
  };

  return (
    <PlatformLayout
      title="Competitions"
      description="Join exclusive competitions with monthly challenges, themed events, and special prizes. Build your track record."
    >
      <div className="mt-10 space-y-6">
        {loading && (
          <p className="text-slate-300">Loading competition questions...</p>
        )}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && !current && (
          <p className="text-slate-400">
            No questions available right now. Try reloading.
          </p>
        )}

        {current && (
          <>
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-white">
                Score: {score} / {questions.length}
              </div>
              <div className="text-sm text-slate-400">
                Question {currentIndex + 1} of {questions.length}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Question {currentIndex + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-200">{current.question}</p>

                <div className="space-y-3">
                  {current.options.map((option, idx) => {
                    const isSelected = selectedIndex === idx;
                    const isCorrect = current.correctIndex === idx;
                    const showColors = showResult && (isSelected || isCorrect);

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => !showResult && setSelectedIndex(idx)}
                        className={[
                          "w-full text-left px-4 py-3 rounded-md border transition",
                          "bg-slate-900/70 border-slate-700 text-slate-200 hover:border-primary/60 hover:bg-slate-900",
                          isSelected && !showResult
                            ? "border-primary bg-slate-900"
                            : "",
                          showColors && isCorrect
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "",
                          showColors && isSelected && !isCorrect
                            ? "border-red-500 bg-red-500/10"
                            : "",
                        ].join(" ")}
                      >
                        <span className="font-semibold mr-2">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-3">
                  {!showResult ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={selectedIndex === null}
                      className="bg-gradient-to-r from-primary to-secondary"
                    >
                      Submit answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-primary to-secondary"
                    >
                      {currentIndex + 1 < questions.length
                        ? "Next question"
                        : `Finish (Score: ${score}/${questions.length})`}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => void loadCompetition()}
                    disabled={loading}
                    className="border-primary/60 text-slate-200 hover:bg-primary/10"
                  >
                    New competition
                  </Button>
                </div>

                {showResult && (
                  <div className="mt-4 rounded-md border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-200">
                    <p className="font-semibold mb-1">
                      {selectedIndex === current.correctIndex
                        ? "✅ Correct! +1 point"
                        : "❌ Incorrect"}
                    </p>
                    <p>{current.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </PlatformLayout>
  );
}
