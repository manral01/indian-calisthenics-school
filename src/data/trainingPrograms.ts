export interface TimingSlot {
  time: string;
  period: 'MORNING' | 'EVENING';
}

export interface SessionConfig {
  batch: string;
  timings: TimingSlot[];
  pricing: { label: string; price: number; priceDisplay: string }[];
}

export interface TrainingProgram {
  id: 'calisthenics' | 'kids';
  title: string;
  tagline: string;
  description: string;
  badge: string;
  sessions: SessionConfig[];
}

export const trainingPrograms: Record<string, TrainingProgram> = {
  calisthenics: {
    id: 'calisthenics',
    title: 'CALISTHENICS',
    tagline: 'Build strength. Master your body.',
    description:
      'Structured bodyweight coaching designed around your progress — from your first pull-up to advanced skill work. Train with a method, not just a workout.',
    badge: 'BEGINNER → ADVANCED',
    sessions: [
      {
        batch: 'Weekday Batch',
        timings: [
          { time: '6:30 AM – 7:30 AM', period: 'MORNING' },
          { time: '7:30 AM – 8:30 AM', period: 'MORNING' },
          { time: '8:30 AM – 9:30 AM', period: 'MORNING' },
          { time: '6:00 PM – 7:00 PM', period: 'EVENING' },
          { time: '7:00 PM – 8:00 PM', period: 'EVENING' },
          { time: '8:00 PM – 9:00 PM', period: 'EVENING' },
        ],
        pricing: [
          { label: 'Monthly',     price: 7777,  priceDisplay: '₹7,777'  },
          { label: 'Quarterly',   price: 22222, priceDisplay: '₹22,222' },
          { label: 'Half-Yearly', price: 44444, priceDisplay: '₹44,444' },
          { label: 'Yearly',      price: 77777, priceDisplay: '₹77,777' },
        ],
      },
      {
        batch: 'Weekend Batch',
        timings: [
          { time: '8:00 AM – 9:00 AM',  period: 'MORNING' },
          { time: '9:00 AM – 10:00 AM', period: 'MORNING' },
        ],
        pricing: [
          { label: 'Monthly', price: 4444, priceDisplay: '₹4,444' },
        ],
      },
    ],
  },

  kids: {
    id: 'kids',
    title: 'KIDS TRAINING',
    tagline: 'Move well. Grow strong.',
    description:
      'Age-appropriate training built around movement fundamentals. Kids develop coordination, strength and confidence in a structured, safe and engaging environment.',
    badge: 'KIDS',
    sessions: [
      {
        batch: 'Weekday Batch',
        timings: [
          { time: '6:30 AM – 7:30 AM', period: 'MORNING' },
          { time: '7:30 AM – 8:30 AM', period: 'MORNING' },
          { time: '8:30 AM – 9:30 AM', period: 'MORNING' },
          { time: '6:00 PM – 7:00 PM', period: 'EVENING' },
          { time: '7:00 PM – 8:00 PM', period: 'EVENING' },
          { time: '8:00 PM – 9:00 PM', period: 'EVENING' },
        ],
        pricing: [
          { label: 'Monthly',     price: 7777,  priceDisplay: '₹7,777'  },
          { label: 'Quarterly',   price: 22222, priceDisplay: '₹22,222' },
          { label: 'Half-Yearly', price: 44444, priceDisplay: '₹44,444' },
          { label: 'Yearly',      price: 77777, priceDisplay: '₹77,777' },
        ],
      },
      {
        batch: 'Weekend Batch',
        timings: [
          { time: '8:00 AM – 9:00 AM',  period: 'MORNING' },
          { time: '9:00 AM – 10:00 AM', period: 'MORNING' },
        ],
        pricing: [
          { label: 'Monthly', price: 4444, priceDisplay: '₹4,444' },
        ],
      },
    ],
  },
};
