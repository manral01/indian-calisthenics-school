// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — DEVELOPMENT PLACEHOLDER ONLY
// These are NOT real customers of Indian Calisthenics School.
// Replace every entry with real testimonials before going live.
// ─────────────────────────────────────────────────────────────────────────────

export interface Testimonial {
  /** Two-letter initials used for the avatar placeholder */
  initials: string;
  name: string;
  label: string;
  quote: string;
  rating: number;
}

// MOCK DATA — REPLACE WITH REAL TESTIMONIALS
export const testimonialsData: Testimonial[] = [
  {
    initials: 'AS',
    name: 'Aarav Sharma',
    label: 'Mock Member',
    quote:
      '"Great environment for learning strength and movement. The coaching makes every progression feel structured and achievable."',
    rating: 5,
  },
  {
    initials: 'RM',
    name: 'Rohan Mehta',
    label: 'Mock Member',
    quote:
      '"I had struggled with pull-ups for months before joining. The beginner program gave me a clear path and real results within weeks."',
    rating: 5,
  },
  {
    initials: 'AR',
    name: 'Ananya Rao',
    label: 'Mock Member',
    quote:
      '"The mobility training here is unlike anything I had tried before. My range and body awareness improved significantly."',
    rating: 5,
  },
  {
    initials: 'VS',
    name: 'Vikram Singh',
    label: 'Mock Member',
    quote:
      '"Consistent, well-structured classes and coaches who actually pay attention to your form. Highly recommended for anyone serious about calisthenics."',
    rating: 5,
  },
  {
    initials: 'NK',
    name: 'Neha Kapoor',
    label: 'Mock Member',
    quote:
      '"My kid joined the children\'s program and the improvement in coordination and discipline has been really noticeable. Safe, fun training."',
    rating: 5,
  },
  {
    initials: 'AN',
    name: 'Arjun Nair',
    label: 'Mock Member',
    quote:
      '"The online personal training is well organised. I get detailed feedback on every session even though I train from home."',
    rating: 5,
  },
];
