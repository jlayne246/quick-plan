import type { Course } from "@/types";
import catalog from "../../CourseNames_with_lecturer_credits.json";

// Types for the raw JSON entries
interface RawCourse {
  coursecode: string;
  title: string;
  department: string;
  faculty?: string;
  tags?: string[];
  roles?: string[];
  lecturer?: string | null;
  credits: number;
}

const raw = catalog as unknown as RawCourse[];

export const courses: Course[] = raw.map((r) => ({
  id: r.coursecode.toLowerCase(),
  code: r.coursecode,
  title: r.title,
  department: r.department,
  credits: r.credits,
  instructor: r.lecturer ?? "TBD",
  meetings: [], // No meeting times provided in JSON; left empty for prototype
}));

export type CourseMeta = { tags: string[]; roles: string[] };
export const courseMetaByCode: Record<string, CourseMeta> = Object.fromEntries(
  raw.map((r) => [r.coursecode, { tags: r.tags ?? [], roles: r.roles ?? [] }])
);
