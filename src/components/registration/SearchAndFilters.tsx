import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import React from "react";

interface Props {
  search: string;
  department: string;
  credits: string;
  departments: string[];
  onSearch: (v: string) => void;
  onDepartment: (v: string) => void;
  onCredits: (v: string) => void;
}

export const SearchAndFilters: React.FC<Props> = ({
  search,
  department,
  credits,
  departments,
  onSearch,
  onDepartment,
  onCredits,
}) => {
  return (
    <Card className="p-4 space-y-4">
      <div>
        <Label htmlFor="search" className="mb-2 inline-block">Search courses</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by code, title, instructor"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
            aria-label="Search courses"
          />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 inline-block">Department</Label>
          <Select value={department} onValueChange={onDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 inline-block">Credits</Label>
          <Select value={credits} onValueChange={onCredits}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              {[1, 2, 3, 4, 5].map((c) => (
                <SelectItem key={c} value={String(c)}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
