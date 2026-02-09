import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Riddles from "./pages/Riddles";
import Coding from "./pages/Coding";
import Hackathons from "./pages/Hackathons";
import Quizzes from "./pages/Quizzes";
import Leaderboard from "./pages/Leaderboard";
import Competitions from "./pages/Competitions";
import Algorithms from "./pages/Algorithms";
import SystemDesign from "./pages/SystemDesign";
import AiMl from "./pages/AiMl";
import Mobile from "./pages/Mobile";
import Games from "./pages/Games";
import DataScience from "./pages/DataScience";
import Security from "./pages/Security";
import TechWriting from "./pages/TechWriting";

let root: ReturnType<typeof createRoot> | null = null;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/riddles" element={<Riddles />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/system-design" element={<SystemDesign />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/ai-ml" element={<AiMl />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/games" element={<Games />} />
          <Route path="/data-science" element={<DataScience />} />
          <Route path="/security" element={<Security />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/tech-writing" element={<TechWriting />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  if (!root) {
    root = createRoot(rootElement);
  }
  root.render(<App />);
}
