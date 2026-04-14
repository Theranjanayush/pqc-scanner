import { Button } from "./components/Button";
import Link from "next/link";
import { ArrowRight, Code2, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-700 mt-12 w-full">
      <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-8 border border-primary/20 shadow-sm backdrop-blur-md">
        <span className="mr-2 animate-pulse">🔶</span> PNB Hackathon Project Submission
      </div>
      
      <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tight text-foreground mb-6 leading-tight">
        Next-Gen Banking <br className="hidden md:block"/>
        <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">Infrastructure</span>
      </h1>
      
      <p className="text-lg md:text-xl text-card-foreground/70 max-w-2xl mx-auto mb-12 font-semibold leading-relaxed">
        Welcome to our project for the PNB Hackathon (IIT Kanpur & DFS). 
        We are building a highly secure, AI-driven fintech prototype designed to solve real-world banking challenges.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto mb-20 px-4">
        <Link href="/register" className="w-full sm:w-auto">
          <Button className="px-8 w-full sm:w-auto h-16 text-lg">
            Create an Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Link href="/login" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto h-16 px-10 font-extrabold text-foreground bg-white/50 dark:bg-black/20 border-2 border-input-border/70 rounded-2xl hover:bg-white dark:hover:bg-black/40 transition-colors shadow-sm text-lg backdrop-blur-md">
            Sign In
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left px-4">
        {[
          { icon: Code2, title: "Modern Tech Stack", desc: "Built on Next.js, tailored for scalability, speed, and real-time database management." },
          { icon: ShieldCheck, title: "Bank-Grade Security", desc: "Featuring custom JWT session handling, OTP validation, and encrypted payload routing." },
          { icon: Zap, title: "Lightning Fast UX", desc: "Designed with an ultra-premium glassmorphic interface and parallel data hydration." }
        ].map((feature, i) => (
          <div key={i} className="bg-card-background/60 backdrop-blur-2xl border border-white/20 shadow-xl dark:shadow-indigo-500/10 rounded-3xl p-8 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-primary border border-primary/20">
              <feature.icon className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl mb-3">{feature.title}</h3>
            <p className="text-card-foreground/70 font-semibold text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
