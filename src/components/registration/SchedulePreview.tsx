import React from "react";
import type { Course } from "@/types";
import { DAYS } from "@/types";
import { timeToMinutes } from "@/utils/schedule";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  courses: Course[];
}

const START = 8 * 60; // 08:00
const END = 18 * 60;  // 18:00
const RANGE = END - START;

export const SchedulePreview: React.FC<Props> = ({ courses }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Week at a Glance</h3>
        <Badge variant="secondary">Mon–Fri, 8:00–18:00</Badge>
      </div>
      <div className="relative grid grid-cols-6 border rounded-md overflow-hidden">
        <div className="bg-muted/50 p-2 text-sm font-medium">Time</div>
        {DAYS.map((d) => (
          <div key={d} className="bg-muted/50 p-2 text-sm font-medium text-center border-l">
            {d}
          </div>
        ))}
        {/* Rows for hours */}
        {Array.from({ length: (END - START) / 60 + 1 }).map((_, i) => {
          const minutes = START + i * 60;
          const label = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:00`;
          return (
            <React.Fragment key={minutes}>
              <div className="relative h-24 border-t text-xs text-muted-foreground flex items-start p-2">
                {label}
              </div>
              {DAYS.map((d) => (
                <div key={`${d}-${minutes}`} className="relative h-24 border-t border-l" />
              ))}
            </React.Fragment>
          );
        })}

        {/* Course blocks */}
        {courses.flatMap((c) =>
          c.meetings.map((m) => {
            const top = ((timeToMinutes(m.start) - START) / RANGE) * ((END - START) / 60 + 1) * 96; // 24 * 4 rem
            const height = ((timeToMinutes(m.end) - timeToMinutes(m.start)) / RANGE) * ((END - START) / 60 + 1) * 96;
            const colIndex = DAYS.indexOf(m.day) + 1; // +1 because col 0 is time
            return (
              <div
                key={`${c.id}-${m.day}-${m.start}`}
                className="absolute left-0"
                style={{
                  top: 48 + top, // header row ~48px
                  left: `calc((100% / 6) * ${colIndex})`,
                  width: `calc((100% / 6))`,
                  height,
                  padding: 6,
                }}
              >
                <div className="h-full rounded-md border bg-primary/10 backdrop-blur-sm p-2 text-xs shadow-sm flex flex-col">
                  <div className="font-semibold text-foreground">{c.code}</div>
                  <div className="text-muted-foreground truncate">{c.title}</div>
                  <div className="mt-auto text-muted-foreground">{m.start}–{m.end} • {m.location}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
