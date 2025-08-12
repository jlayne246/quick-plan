export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
export type Day = typeof DAYS[number];

export type Meeting = {
  day: Day;
  start: string; // HH:MM, 24-hour
  end: string;   // HH:MM, 24-hour
  location: string;
};

export type Course = {
  id: string;
  code: string;
  title: string;
  department: string;
  credits: number;
  instructor: string;
  capacity: number;
  seats: number; // remaining
  meetings: Meeting[];
};
