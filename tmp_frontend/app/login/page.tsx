"use client";

import * as React from "react";
import { AuthCard } from "../components/AuthCard";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/])\S{8,15}$/;
    if (!passwordRegex.test(password)) {
      setError("Invalid password format. Must be 8-15 chars containing uppercase, lowercase, numbers, and special characters.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to login");
      }
      
      if (data.unverified) {
        // Needs OTP
        localStorage.setItem("verifyEmail", email);
        router.push("/verify");
      } else {
        // Successfully logged in
        window.location.href = "/dashboard";
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard 
      title="Welcome Back" 
      subtitle="Sign in to your Hackathon dashboard to continue your progress."
    >
      {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm font-semibold">{error}</div>}
      <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-4">
        <Input 
          label="Email Address" 
          name="email"
          type="email" 
          placeholder="hacker@university.edu" 
          icon={Mail} 
          required 
        />
        <div>
          <Input 
            label="Password" 
            name="password"
            type="password" 
            placeholder="••••••••" 
            icon={Lock} 
            required 
          />
          <div className="flex justify-end mt-1 mb-2">
            <Link href="#" className="text-sm font-semibold text-primary hover:underline transition-all">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-2 group">
          Sign In
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      <div className="mt-8 text-center text-sm font-medium text-(--card-foreground)/70">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-bold hover:underline transition-all">
          Register here
        </Link>
      </div>
    </AuthCard>
  );
}
