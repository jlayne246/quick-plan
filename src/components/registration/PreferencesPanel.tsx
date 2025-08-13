import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  allCourseCodes: string[];
  prefs: Preferences;
  onChange: (next: Preferences) => void;
}

export const PreferencesPanel: React.FC<Props> = ({ majors, allCareers, allCourseCodes, prefs, onChange }) => {
  const toggleCareer = (role: string) => {
    const exists = prefs.careers.includes(role);
    const careers = exists ? prefs.careers.filter((r) => r !== role) : [...prefs.careers, role];
    onChange({ ...prefs, careers });
  };

  const [completedQuery, setCompletedQuery] = React.useState("");
  const toggleCompleted = (code: string) => {
    const exists = prefs.completed.includes(code);
    const completed = exists ? prefs.completed.filter((c) => c !== code) : [...prefs.completed, code];
    onChange({ ...prefs, completed });
  };
  const filteredCodes = React.useMemo(() => {
    const q = completedQuery.trim().toUpperCase();
    const src = allCourseCodes || [];
    if (!q) return src;
    return src.filter((c) => c.includes(q));
  }, [allCourseCodes, completedQuery]);
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

      {/* <div className="grid grid-cols-1 gap-4 items-end"> */}
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
          <Label htmlFor="completed" className="mb-2 inline-block">Completed courses</Label>
          <Input
            id="completed"
            placeholder="Search course code (e.g., COMP1170)"
            value={completedQuery}
            onChange={(e) => setCompletedQuery(e.target.value)}
          />
          <ScrollArea className="h-48 mt-2 rounded-md border p-2">
            <div className="grid grid-cols-2 gap-2">
              {filteredCodes.map((code) => {
                const checked = prefs.completed.includes(code);
                return (
                  <label key={code} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleCompleted(code)}
                      aria-label={`Mark ${code} completed`}
                    />
                    <span>{code}</span>
                  </label>
                );
              })}
            </div>
          </ScrollArea>
          <p className="text-xs text-muted-foreground mt-2">Tick all courses you've already completed.</p>
        </div>
      {/* </div> */}
    </Card>
  );
};
