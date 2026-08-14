export interface Skill { name: string; level: string; description: string; category: 'CALISTHENICS' | 'STRENGTH' | 'MOVEMENT'; }
export const skillsData: Skill[] = [
  { name: 'Calisthenics', level: 'BEGINNER → ADVANCED', description: 'Structured bodyweight training for every experience level.', category: 'CALISTHENICS' },
  { name: 'Strength Training', level: 'ALL LEVELS', description: 'Build practical strength with focused, progressive training.', category: 'STRENGTH' },
  { name: 'Mobility', level: 'ALL LEVELS', description: 'Move with more control, range and confidence.', category: 'MOVEMENT' },
  { name: 'Freestyle', level: 'ALL LEVELS', description: 'Explore dynamic movement and calisthenics flow.', category: 'MOVEMENT' },
  { name: 'Kids Training', level: 'KIDS', description: 'Age-appropriate training built around movement fundamentals.', category: 'CALISTHENICS' },
  { name: 'Open Gym', level: 'SELF-TRAINING', description: 'Space and equipment for your own calisthenics practice.', category: 'STRENGTH' },
  { name: 'Personal Training', level: 'CONSULTATION', description: 'Personal training is available on consultation.', category: 'CALISTHENICS' },
  { name: 'Online Personal Training', level: '₹15,000', description: 'Online personal training is available at ₹15,000.', category: 'CALISTHENICS' },
];
