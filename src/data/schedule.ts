export interface ScheduleGroup {
  title: string;
  sessions: string[];
}
export const schedule: ScheduleGroup[] = [
  {
    title: "WEEKDAYS",
    sessions: ["Morning · 6:30 AM – 9:30 AM", "Evening · 6:00 PM – 9:00 PM"],
  },
  { title: "WEEKENDS", sessions: ["8:00 AM – 9:00 AM", "9:00 AM – 10:00 AM"] },
];
export const facilities = [
  "Calisthenics rigs",
  "Pull-up bars",
  "Parallel bars",
  "Rings",
  "Weights",
  "Training flooring",
  "Changing room",
];

// Homepage "Timings at a glance" (same facts as trainingData.ts / business.hours)
export interface GlanceSlot {
  label: string;
  time: string;
  detail: string;
}
export const timingsGlance: GlanceSlot[] = [
  { label: "Weekday mornings", time: "6:30 – 9:30 AM", detail: "Adults · Mon–Fri · 3 batches" },
  { label: "Weekday evenings", time: "6:00 – 9:00 PM", detail: "Adults · Mon–Fri · 3 batches" },
  { label: "Kids", time: "4:00 – 6:00 PM", detail: "Mon–Fri · weekends 9–10 AM" },
  { label: "Weekends", time: "8:00 – 10:00 AM", detail: "Adults · Sat–Sun" },
];
