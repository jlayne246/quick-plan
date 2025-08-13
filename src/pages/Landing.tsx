import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

const Landing: React.FC = () => {
  useEffect(() => {
    setMeta(
      "QuickPlan – Plan your semester fast",
      "Plan courses, set preferences, and preview schedules in seconds.",
      "/"
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">QuickPlan</Link>
          <nav className="flex items-center gap-3">
            <Link to="/login" className="text-sm">Log in</Link>
            <Link to="/signup" className="text-sm">Sign up</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid gap-8 md:grid-cols-2 items-center">
          <article>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Plan your semester in minutes
            </h1>
            <p className="text-muted-foreground mb-8">
              Search courses, set preferences, get smart recommendations, and preview a conflict‑free schedule.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="lg">Get started</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">Log in</Button>
              </Link>
              <Link to="/preferences">
                <Button variant="outline" size="lg">Continue without account</Button>
              </Link>
            </div>
          </article>

          <aside className="rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">What you can do</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Search the catalog and filter by credits or department</li>
              <li>Build a schedule with real-time conflict detection</li>
              <li>Set preferences and get course recommendations</li>
            </ul>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Landing;
