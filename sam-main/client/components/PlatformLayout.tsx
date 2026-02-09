import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ReactNode } from "react";

interface PlatformLayoutProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function PlatformLayout({
  title,
  description,
  children,
}: PlatformLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mega Platform
            </span>
          </Link>

          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">{description}</p>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-dashed border-slate-700 p-12 text-center">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Coming Soon
            </h2>
            <p className="text-slate-400 mb-8">
              This page is being built. Keep prompting to add content and features
              to this section!
            </p>
            <Link to="/">
              <Button variant="outline" className="border-2 border-primary/50 text-slate-200 hover:bg-primary/10">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950/50 border-t border-slate-800 text-slate-300 mt-20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-sm text-slate-500">
            © 2024 Mega Platform. All rights reserved. 🚀
          </p>
        </div>
      </footer>
    </div>
  );
}
