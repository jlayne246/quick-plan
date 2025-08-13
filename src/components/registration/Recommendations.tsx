import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types";
import React from "react";

interface Props {
  courses: Course[];
  onAdd: (c: Course) => void;
}

export const Recommendations: React.FC<Props> = ({ courses, onAdd }) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recommended this term</h3>
        <Badge variant="secondary">{courses.length} courses</Badge>
      </div>
      {courses.length === 0 ? (
        <p className="text-sm text-muted-foreground">Set your preferences to see recommendations.</p>
      ) : (
        <div className="space-y-2 max-h-[260px] overflow-auto pr-1">
          {courses.map((c) => (
            <div key={c.id} className="flex items-start justify-between gap-3 rounded-md border p-3">
              <div>
                <div className="font-medium">{c.code} – {c.title}</div>
                <div className="text-xs text-muted-foreground">{c.credits} credits • {c.instructor}</div>
              </div>
              <Button size="sm" onClick={() => onAdd(c)} aria-label={`Add ${c.code}`}>Add</Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
