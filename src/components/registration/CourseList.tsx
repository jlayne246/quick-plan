import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Plus, Clock } from "lucide-react";
import type { Course } from "@/types";
import React from "react";

const formatMeetings = (c: Course) => {
  const daysMap: Record<string, string[]> = {};
  c.meetings.forEach((m) => {
    const key = `${m.start}-${m.end}`;
    daysMap[key] = daysMap[key] || [];
    daysMap[key].push(m.day);
  });
  return Object.entries(daysMap)
    .map(([range, days]) => `${days.join("/")} ${range}`)
    .join("; ");
};

interface Props {
  courses: Course[];
  canAdd: (c: Course) => { ok: boolean; reason?: string };
  onAdd: (c: Course) => void;
}

export const CourseList: React.FC<Props> = ({ courses, canAdd, onAdd }) => {
  return (
    <Card className="p-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Dept</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead className="min-w-[220px]">Schedule</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((c) => {
            const { ok, reason } = canAdd(c);
            const full = c.seats <= 0;
            return (
              <TableRow key={c.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{c.code}</TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{c.department}</Badge>
                </TableCell>
                <TableCell>{c.credits}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="shrink-0" />
                    <span>{formatMeetings(c)}</span>
                  </div>
                </TableCell>
                <TableCell>{c.instructor}</TableCell>
                <TableCell>
                  {full ? (
                    <Badge variant="destructive">Full</Badge>
                  ) : (
                    <Badge>{c.seats} left</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant={ok && !full ? "default" : "secondary"}
                    disabled={!ok || full}
                    onClick={() => onAdd(c)}
                    aria-label={`Add ${c.code}`}
                  >
                    <Plus /> Add
                  </Button>
                  {!ok && reason && (
                    <div className="text-xs text-muted-foreground mt-1">{reason}</div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};
