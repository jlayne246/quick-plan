import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import React from "react";

export type Preferences = {
  major: string | null;
  level: "Level I" | "Level II" | "Level III";
  careers: string[];
  completed: string[];
  targetCredits: number;
};

interface Props {
  majors: string[];
  allCareers: string[];
  prefs: Preferences;
  onChange: (next: Preferences) => void;
}

export const PreferencesPanel: React.FC<Props> = ({ majors, allCareers, prefs, onChange }) => {
  const toggleCareer = (role: string) => {
    const exists = prefs.careers.includes(role);
    const careers = exists ? prefs.careers.filter((r) => r !== role) : [...prefs.careers, role];
    onChange({ ...prefs, careers });
  };

  return (
    <Card className="p-4 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Your Preferences</h3>
        <p className="text-sm text-muted-foreground">Set your major, level, interests and credit target.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 inline-block">Major</Label>
          <Select value={prefs.major ?? ""} onValueChange={(v) => onChange({ ...prefs, major: v || null })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your major" />
            </SelectTrigger>
            <SelectContent>
              {majors.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 inline-block">Level</Label>
          <Select value={prefs.level} onValueChange={(v) => onChange({ ...prefs, level: v as Preferences["level"] })}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {(["Level I", "Level II", "Level III"] as const).map((lv) => (
                <SelectItem key={lv} value={lv}>{lv}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="mb-2 inline-block">Career interests</Label>
        <div className="flex flex-wrap gap-2 max-h-28 overflow-auto pr-1">
          {allCareers.map((r) => {
            const active = prefs.careers.includes(r);
            return (
              <button
                key={r}
                type="button"
                onClick={() => toggleCareer(r)}
                className={`inline-flex items-center rounded-md border px-2 py-1 text-xs transition ${active ? "bg-primary/10 border-primary" : "hover:bg-muted"}`}
                aria-pressed={active}
              >
                <Badge variant={active ? "default" : "secondary"}>{r}</Badge>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <Label htmlFor="targetCredits" className="mb-2 inline-block">Target credits</Label>
          <Input
            id="targetCredits"
            type="number"
            min={3}
            max={24}
            value={prefs.targetCredits}
            onChange={(e) => onChange({ ...prefs, targetCredits: Number(e.target.value || 0) })}
          />
        </div>
        <div>
          <Label htmlFor="completed" className="mb-2 inline-block">Completed courses (codes, comma-separated)</Label>
          <Input
            id="completed"
            placeholder="COMP1170, COMP1180"
            value={prefs.completed.join(", ")}
            onChange={(e) => {
              const parsed = e.target.value
                .split(/[ ,;\n]+/)
                .map((s) => s.trim().toUpperCase())
                .filter(Boolean);
              onChange({ ...prefs, completed: Array.from(new Set(parsed)) });
            }}
          />
        </div>
      </div>
    </Card>
  );
};
