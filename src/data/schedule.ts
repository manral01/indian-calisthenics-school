export interface ScheduleGroup { title: string; sessions: string[]; }
export const schedule: ScheduleGroup[] = [
  { title: 'WEEKDAYS', sessions: ['Morning · 6:30 AM – 9:30 AM', 'Evening · 6:00 PM – 9:00 PM'] },
  { title: 'WEEKENDS', sessions: ['8:00 AM – 9:00 AM', '9:00 AM – 10:00 AM'] },
];
export const facilities = ['Calisthenics rigs', 'Pull-up bars', 'Parallel bars', 'Rings', 'Weights', 'Training flooring', 'Changing room'];
