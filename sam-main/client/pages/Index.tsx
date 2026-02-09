import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Brain,
  Zap,
  Trophy,
  Users,
  Sparkles,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  GitBranch,
  Cpu,
  Rocket,
  Gamepad2,
  BarChart3,
  Shield,
  BookOpen,
  Smartphone,
} from "lucide-react";

export default function Index() {
  const platforms = [
    {
      icon: Brain,
      title: "Riddles",
      description:
        "Challenge your mind with mind-bending riddles. Solve puzzles, unlock achievements, and climb the riddle leaderboard.",
      color: "from-purple-500 to-pink-500",
      link: "/riddles",
    },
    {
      icon: Code2,
      title: "Coding Challenges",
      description:
        "Test your coding skills with real-world programming problems. Compete in live coding contests and improve your portfolio.",
      color: "from-blue-500 to-cyan-500",
      link: "/coding",
    },
    {
      icon: Trophy,
      title: "Quizzes",
      description:
        "Test your knowledge across various domains. From tech to general knowledge, challenge yourself with our quiz platform.",
      color: "from-cyan-500 to-green-500",
      link: "/quizzes",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Challenges" },
    { number: "1M+", label: "Submissions" },
    { number: "150+", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mega Platform
            </span>
          </div>

          <nav className="hidden md:flex gap-8">
            <a href="#platforms" className="text-sm font-medium text-slate-300 hover:text-primary transition">
              Platforms
            </a>
            <a href="#stats" className="text-sm font-medium text-slate-300 hover:text-primary transition">
              Community
            </a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-primary transition">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-primary transition">
              Docs
            </a>
          </nav>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full backdrop-blur-sm">
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🚀 Welcome to the Future of Learning
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent leading-tight">
            Master Your Skills.<br />Compete Globally.
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers, problem-solvers, and innovators competing daily.
            From AI/ML to cybersecurity, choose your challenge and rise to the top.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/50 text-lg px-8 h-12 font-bold transition-all transform hover:scale-105"
            >
              Start Competing <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 h-12 border-2 border-primary/50 hover:bg-primary/10 text-slate-200 transition-all"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Promo Video Area */}
        <div className="mt-20 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent rounded-3xl blur-2xl" />
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-700 bg-slate-900/70 shadow-2xl shadow-primary/20">
            <video
              className="w-full h-full object-cover"
              src="/Mega Platform_ The Future of Learning.mp4"
              controls
              playsInline
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 py-20 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition transform">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base text-slate-400 group-hover:text-slate-300 transition">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Grid */}
      <section id="platforms" className="container mx-auto px-4 py-24 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Explore All Platforms
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From brain-teasing riddles to cutting-edge AI/ML, choose your challenge
            and start your journey to mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {platforms.map((platform, idx) => {
            const IconComponent = platform.icon;
            return (
              <Link key={idx} to={platform.link}>
                <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 hover:border-primary/50 transition-all duration-300 group cursor-pointer overflow-hidden relative">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                  />

                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className={`absolute -inset-px bg-gradient-to-br ${platform.color} rounded-2xl opacity-50 blur-xl group-hover:blur-2xl`} />
                  </div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text transition">
                      {platform.title}
                    </h3>

                    <p className="text-slate-400 mb-8 leading-relaxed group-hover:text-slate-300 transition">
                      {platform.description}
                    </p>

                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border-y border-slate-800 py-20 md:py-32 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Level Up?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 10,000+ developers competing daily. Create your free account and start
            mastering new skills across 12+ different platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/50 text-lg px-8 h-12 font-bold transition-all transform hover:scale-105"
            >
              Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <span className="text-slate-400 text-sm">💡 No credit card required</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/50 border-t border-slate-800 text-slate-300 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mega</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Master your skills. Compete globally. Grow together.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded" /> Platforms
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-primary transition">Riddles</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition">Coding</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition">AI/ML</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-secondary rounded" /> Resources
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-secondary transition">Documentation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-secondary transition">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-secondary transition">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-accent rounded" /> Connect
              </h4>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-primary transition transform hover:scale-125 duration-200">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-secondary transition transform hover:scale-125 duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-accent transition transform hover:scale-125 duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2024 Mega Platform. All rights reserved. 🚀
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300 transition">Privacy</a>
              <a href="#" className="hover:text-slate-300 transition">Terms</a>
              <a href="#" className="hover:text-slate-300 transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
