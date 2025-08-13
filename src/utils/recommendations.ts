import type { Course } from "@/types";
import type { Preferences } from "@/components/registration/PreferencesPanel";
import { courseMetaByCode } from "@/data/courses";
import degrees from "../../degrees_fst.json";

// Degrees JSON types (partial)
interface Programme {
  name: string;
  levels: Record<string, string[]>; // "Level I" | "Level II" | "Level III" | Foundation
}

const programmes = (degrees as any).programmes as Programme[];

export const getMajors = () => programmes.map((p) => p.name);

const extractCodes = (line: string): string[] => {
  const matches = line.toUpperCase().match(/[A-Z]{4}\d{4}/g);
  return matches ? Array.from(new Set(matches)) : [];
};

const levelCodes = (major: string, level: Preferences["level"]): string[] => {
  const prog = programmes.find((p) => p.name === major);
  if (!prog) return [];
  const list = prog.levels?.[level] ?? [];
  const codes = new Set<string>();
  list.forEach((item) => extractCodes(item).forEach((c) => codes.add(c)));
  return Array.from(codes);
};

export const getAllCareers = (): string[] => {
  const set = new Set<string>();
  Object.values(courseMetaByCode).forEach((m) => m.roles.forEach((r) => set.add(r)));
  return Array.from(set).sort();
};

export const getRecommendedCourses = (
  prefs: Preferences,
  courses: Course[]
): Course[] => {
  if (!prefs.major) return [];

  const requiredCodes = levelCodes(prefs.major, prefs.level);
  const byCode = new Map<string, Course>();
  courses.forEach((c) => byCode.set(c.code.toUpperCase(), c));

  type Scored = { c: Course; score: number };
  const scored: Scored[] = [];

  requiredCodes.forEach((code) => {
    const course = byCode.get(code);
    if (!course) return;
    if (prefs.completed.includes(code)) return;
    const meta = courseMetaByCode[code] || { roles: [], tags: [] };
    const roleMatches = meta.roles.filter((r) => prefs.careers.includes(r)).length;
    const tagMatches = (meta.tags || []).filter((t) => prefs.careers.includes(t)).length;
    const base = 1; // required for this level
    const score = base + roleMatches + tagMatches * 0.5;
    scored.push({ c: course, score });
  });

  scored.sort((a, b) => b.score - a.score);

  const picked: Course[] = [];
  let credits = 0;
  const target = Math.max(3, prefs.targetCredits || 15);
  for (const { c } of scored) {
    if (credits + c.credits > target + 1) continue; // small cushion
    picked.push(c);
    credits += c.credits;
    if (credits >= target) break;
  }

  return picked;
};
