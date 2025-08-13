import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const setMeta = (title: string, description: string, canonical?: string) => {
  document.title = title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", description);
  if (canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);
  }
};

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMeta(
      "Login – QuickPlan",
      "Access your account to plan and register courses.",
      "/login"
    );
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Prototype: Auth not connected yet.");
    navigate("/preferences");
  };

  return (
    <main className="min-h-screen bg-background text-foreground grid place-items-center px-4">
      <section className="w-full max-w-md border border-border rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-sm text-muted-foreground mb-6">Log in to continue planning your semester.</p>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Log in</Button>
        </form>
        <p className="text-sm text-muted-foreground mt-4">
          New here? <Link to="/signup" className="underline">Create an account</Link>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          <Link to="/" className="underline">Back to home</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
