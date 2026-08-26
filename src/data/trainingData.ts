export interface TimingSlot {
  label: string;
  time: string;
}

export interface PricingTier {
  id: string;
  duration: string;
  price: number;
  displayPrice: string;
  popular?: boolean;
  features?: string[];
}

export interface SessionConfig {
  batchName: string;
  morningTimings: TimingSlot[];
  eveningTimings: TimingSlot[];
  pricing: PricingTier[];
}

export interface TrainingProgramConfig {
  id: "calisthenics" | "kids";
  title: string;
  tag: string;
  description: string;
  weekdaySession: SessionConfig;
  weekendSession: SessionConfig;
}

export const trainingPrograms: Record<string, TrainingProgramConfig> = {
  calisthenics: {
    id: "calisthenics",
    title: "CALISTHENICS",
    tag: "BODYWEIGHT MASTERY",
    description:
      "Build strength. Master your body. Structured coaching designed around your progress.",
    weekdaySession: {
      batchName: "Weekday Batch",
      morningTimings: [
        { label: "6:30 AM – 7:30 AM", time: "6:30 AM - 7:30 AM" },
        { label: "7:30 AM – 8:30 AM", time: "7:30 AM - 8:30 AM" },
        { label: "8:30 AM – 9:30 AM", time: "8:30 AM - 9:30 AM" },
      ],
      eveningTimings: [
        { label: "6:00 PM – 7:00 PM", time: "6:00 PM - 7:00 PM" },
        { label: "7:00 PM – 8:00 PM", time: "7:00 PM - 8:00 PM" },
        { label: "8:00 PM – 9:00 PM", time: "8:00 PM - 9:00 PM" },
      ],
      pricing: [
        {
          id: "monthly",
          duration: "Monthly",
          price: 7777,
          displayPrice: "₹7,777",
          features: ["Full equipment access", "Structured group coaching", "Form guidance & correction"],
        },
        {
          id: "quarterly",
          duration: "Quarterly",
          price: 22222,
          displayPrice: "₹22,222",
          popular: true,
          features: ["Save ~5% overall", "Progressive strength roadmap", "Skill milestone tracking"],
        },
        {
          id: "half-yearly",
          duration: "Half-Yearly",
          price: 44444,
          displayPrice: "₹44,444",
          features: ["Save ~5% overall", "Advanced skill progressions", "Personalized advice"],
        },
        {
          id: "yearly",
          duration: "Yearly",
          price: 77777,
          displayPrice: "₹77,777",
          features: ["Best value plan", "Complete body transformation", "VIP lab access"],
        },
      ],
    },
    weekendSession: {
      batchName: "Weekend Batch",
      morningTimings: [
        { label: "8:00 AM – 9:00 AM", time: "8:00 AM - 9:00 AM" },
        { label: "9:00 AM – 10:00 AM", time: "9:00 AM - 10:00 AM" },
      ],
      eveningTimings: [],
      pricing: [
        {
          id: "weekend-monthly",
          duration: "Monthly",
          price: 4444,
          displayPrice: "₹4,444",
          popular: true,
          features: ["Weekend focused training", "Core skills & mobility", "Guided group sessions"],
        },
      ],
    },
  },

  kids: {
    id: "kids",
    title: "KIDS TRAINING",
    tag: "YOUTH ATHLETICISM",
    description:
      "Build movement fundamentals, strength, and confidence through safe, age-appropriate coaching.",
    weekdaySession: {
      batchName: "Weekday Batch (Mon–Fri)",
      morningTimings: [],
      eveningTimings: [
        { label: "4:00 PM – 5:00 PM", time: "4:00 PM - 5:00 PM" },
        { label: "5:00 PM – 6:00 PM", time: "5:00 PM - 6:00 PM" },
      ],
      pricing: [
        {
          id: "monthly",
          duration: "Monthly",
          price: 5555,
          displayPrice: "₹5,555",
          features: ["Mon–Fri evening training", "Age-appropriate fundamentals", "Safety-first environment"],
        },
        {
          id: "quarterly",
          duration: "Quarterly",
          price: 15151,
          displayPrice: "₹15,151",
          popular: true,
          features: ["Save on 3-month plan", "Youth athletic growth", "Discipline & habit building"],
        },
      ],
    },
    weekendSession: {
      batchName: "Weekend Batch (Sat–Sun)",
      morningTimings: [
        { label: "9:00 AM – 10:00 AM", time: "9:00 AM - 10:00 AM" },
      ],
      eveningTimings: [],
      pricing: [
        {
          id: "weekend-monthly",
          duration: "Monthly",
          price: 3333,
          displayPrice: "₹3,333",
          popular: true,
          features: ["Sat–Sun morning sessions", "Dynamic games & skills", "Expert supervision"],
        },
      ],
    },
  },
};
