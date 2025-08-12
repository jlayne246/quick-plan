export const timeToMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const overlaps = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
) => aStart < bEnd && bStart < aEnd;

import type { Course } from "@/types";

export const courseConflicts = (a: Course, b: Course) => {
  for (const ma of a.meetings) {
    for (const mb of b.meetings) {
      if (ma.day === mb.day) {
        if (
          overlaps(
            timeToMinutes(ma.start),
            timeToMinutes(ma.end),
            timeToMinutes(mb.start),
            timeToMinutes(mb.end)
          )
        )
          return true;
      }
    }
  }
  return false;
};

export const hasConflictWith = (course: Course, list: Course[]) =>
  list.some((c) => c.id !== course.id && courseConflicts(course, c));
