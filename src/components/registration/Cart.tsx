import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import type { Course } from "@/types";
import React from "react";

interface Props {
  items: Course[];
  onRemove: (id: string) => void;
  onRegister: () => void;
}

export const Cart: React.FC<Props> = ({ items, onRemove, onRegister }) => {
  const totalCredits = items.reduce((s, c) => s + c.credits, 0);
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Plan</h3>
        <Badge variant="secondary">{items.length} courses</Badge>
      </div>
      <Separator />
      <div className="space-y-3 max-h-[260px] overflow-auto pr-1">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No courses selected yet.</p>
        )}
        {items.map((c) => (
          <div key={c.id} className="flex items-start justify-between gap-3 rounded-md border p-3">
            <div>
              <div className="font-medium">{c.code} – {c.title}</div>
              <div className="text-xs text-muted-foreground">{c.credits} credits • {c.instructor}</div>
            </div>
            <Button size="icon" variant="ghost" onClick={() => onRemove(c.id)} aria-label={`Remove ${c.code}`}>
              <X />
            </Button>
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Total credits</div>
        <div className="font-semibold">{totalCredits}</div>
      </div>
      <Button className="w-full" variant="hero" onClick={onRegister} disabled={items.length === 0}>
        Review & Register
      </Button>
    </Card>
  );
};
