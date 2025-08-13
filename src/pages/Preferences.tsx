import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PreferencesPanel, type Preferences } from "@/components/registration/PreferencesPanel";
import { getMajors, getAllCareers } from "@/utils/recommendations";
import { courses as allCourses } from "@/data/courses";

const defaultPrefs: Preferences = { major: null, level: "Level I", careers: [], completed: [], targetCredits: 15 };

const PreferencesPage: React.FC = () => {
  const [prefs, setPrefs] = useState<Preferences>(() => {
    try {
      const raw = localStorage.getItem("prefs");
      return raw ? JSON.parse(raw) : defaultPrefs;
    } catch {
      return defaultPrefs;
    }
  });

  useEffect(() => {
    localStorage.setItem("prefs", JSON.stringify(prefs));
  }, [prefs]);

  useEffect(() => {
    document.title = "Preferences • Semester Surge";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Set your major, level, career interests, completed courses, and target credits.");
  }, []);

  const majors = useMemo(() => getMajors(), []);
  const careers = useMemo(() => getAllCareers(), []);
  const allCourseCodes = useMemo(() => Array.from(new Set(allCourses.map((c) => c.code.toUpperCase()))).sort(), []);

  return (
    <main className="min-h-screen">
      <header className="border-b bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container py-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Preferences</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Choose your major, level, interests, target credits, and tick completed courses.
          </p>
          <p className="mt-2 text-sm">
            Back to <Link to="/courses" className="underline">Courses</Link>
          </p>
        </div>
      </header>

      <section className="container py-8 max-w-4xl">
        <PreferencesPanel
          majors={majors}
          allCareers={careers}
          allCourseCodes={allCourseCodes}
          prefs={prefs}
          onChange={setPrefs}
        />
      </section>
    </main>
  );
};

export default PreferencesPage;
