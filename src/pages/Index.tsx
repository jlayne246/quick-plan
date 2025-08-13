import { useMemo, useState, useEffect } from "react";
import { Course } from "@/types";
import { courses as allCourses } from "@/data/courses";
import { hasConflictWith } from "@/utils/schedule";
import { SearchAndFilters } from "@/components/registration/SearchAndFilters";
import { CourseList } from "@/components/registration/CourseList";
import { Cart } from "@/components/registration/Cart";
import { SchedulePreview } from "@/components/registration/SchedulePreview";
import { PreferencesPanel, type Preferences } from "@/components/registration/PreferencesPanel";
import { Recommendations } from "@/components/registration/Recommendations";
import { getMajors, getAllCareers, getRecommendedCourses } from "@/utils/recommendations";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [credits, setCredits] = useState("Any");
  const [cart, setCart] = useState<Course[]>([]);
  const [prefs, setPrefs] = useState<Preferences>(() => {
    try {
      const raw = localStorage.getItem("prefs");
      return raw ? JSON.parse(raw) : { major: null, level: "Level I", careers: [], completed: [], targetCredits: 15 };
    } catch {
      return { major: null, level: "Level I", careers: [], completed: [], targetCredits: 15 };
    }
  });
  useEffect(() => {
    localStorage.setItem("prefs", JSON.stringify(prefs));
  }, [prefs]);

  const departments = useMemo(
    () => Array.from(new Set(allCourses.map((c) => c.department))),
    []
  );

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const q = search.toLowerCase();
      const matchesQuery =
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q);
      const matchesDept = department === "All" || c.department === department;
      const matchesCredits = credits === "Any" || c.credits === Number(credits);
      return matchesQuery && matchesDept && matchesCredits;
    });
  }, [search, department, credits]);

  const majors = useMemo(() => getMajors(), []);
  const careers = useMemo(() => getAllCareers(), []);
  const recommended = useMemo(() => getRecommendedCourses(prefs, allCourses), [prefs]);

  const canAdd = (c: Course) => {
    if (cart.find((x) => x.id === c.id)) return { ok: false, reason: "Already added" };
    if (hasConflictWith(c, cart)) return { ok: false, reason: "Time conflict" };
    return { ok: true };
  };

  const onAdd = (c: Course) => {
    const check = canAdd(c);
    if (!check.ok) {
      toast({ title: "Can't add course", description: check.reason });
      return;
    }
    setCart((prev) => [...prev, c]);
    toast({ title: `${c.code} added`, description: c.title });
  };

  const onRemove = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const onRegister = () => {
    const total = cart.reduce((s, c) => s + c.credits, 0);
    toast({ title: "Registration complete", description: `${cart.length} courses • ${total} credits` });
  };

  return (
    <main className="min-h-screen">
      <header className="border-b bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container py-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Semester Surge: Course Registration</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Search the catalog, build a conflict-free schedule, and get ready to register.
          </p>
        </div>
      </header>

      <section className="container py-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SearchAndFilters
            search={search}
            department={department}
            credits={credits}
            departments={departments}
            onSearch={setSearch}
            onDepartment={setDepartment}
            onCredits={setCredits}
          />

          <CourseList courses={filtered} canAdd={canAdd} onAdd={onAdd} />
        </div>

        <aside className="space-y-6">
          <PreferencesPanel majors={majors} allCareers={careers} prefs={prefs} onChange={setPrefs} />
          <Recommendations courses={recommended} onAdd={onAdd} />
          <Cart items={cart} onRemove={onRemove} onRegister={onRegister} />
          <SchedulePreview courses={cart} />
        </aside>
      </section>
    </main>
  );
};

export default Index;
