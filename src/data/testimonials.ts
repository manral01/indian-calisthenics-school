export interface Testimonial {
  name: string;
  trainingLevel: string;
  quote: string;
  rating: number;
  result?: string;
}

export const testimonialsData: Testimonial[] = [
  {
    name: '[CLIENT NAME]',
    trainingLevel: 'Intermediate',
    quote: '"The progression structure changed everything. I unlocked my muscle up in just 6 weeks after struggling for a year."',
    rating: 5,
    result: 'Achieved Muscle Up'
  },
  {
    name: '[CLIENT NAME]',
    trainingLevel: 'Advanced',
    quote: '"Expert eye for detail. The cues given for my planche form instantly corrected my hip alignment."',
    rating: 5,
    result: 'Straddle Planche Hold'
  },
  {
    name: '[CLIENT NAME]',
    trainingLevel: 'Beginner',
    quote: '"I started with zero pull-ups. The foundation program built my strength safely without injury."',
    rating: 5,
    result: '10 Strict Pull Ups'
  }
];
