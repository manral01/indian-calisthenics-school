export interface Program { name: string; level: string; duration: string; description: string; features: string[]; price: string; }
export const programsData: Program[] = [
  { name: 'MONTHLY', level: 'MEMBERSHIP', duration: '', description: 'Gym membership', features: [], price: '₹7,777' },
  { name: 'QUARTERLY', level: 'MEMBERSHIP', duration: '', description: 'Gym membership', features: [], price: '₹22,222' },
  { name: 'HALF-YEARLY', level: 'MEMBERSHIP', duration: '', description: 'Gym membership', features: [], price: '₹44,444' },
  { name: 'YEARLY', level: 'MEMBERSHIP', duration: '', description: 'Gym membership', features: [], price: '₹77,777' },
  { name: 'ONLINE PERSONAL TRAINING', level: 'COACHING', duration: '', description: 'Online personal training', features: [], price: '₹15,000' },
  { name: 'PERSONAL TRAINING', level: 'COACHING', duration: '', description: 'Personal training is available on consultation.', features: [], price: 'CONSULTATION' },
];
