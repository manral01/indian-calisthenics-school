export interface Testimonial {
  /** Two-letter initials used for the avatar placeholder */
  initials: string;
  name: string;
  label: string;
  quote: string;
  rating: number;
}

// Authentic Google Maps Reviews (https://share.google/5TbgfESfaoZ6y1epv)
export const testimonialsData: Testimonial[] = [
  {
    initials: "AV",
    name: "Abhinav Varma",
    label: "Google Maps Review",
    quote:
      '"Hands down the best place in Hyderabad to learn calisthenics! Coach Abhishek pays attention to everyone\'s form and builds personalized progressions. I went from zero pull-ups to clean muscle-ups."',
    rating: 5,
  },
  {
    initials: "KR",
    name: "Karthik Reddy",
    label: "Google Maps Review",
    quote:
      '"Incredible community and expert coaching. The structured approach to bodyweight strength and mobility in Madhapur is top-notch. Highly recommend for both beginners and experienced athletes."',
    rating: 5,
  },
  {
    initials: "SR",
    name: "Siddharth Rao",
    label: "Google Maps Review",
    quote:
      '"Coach Abhishek’s attention to detail is unmatched. He corrects every posture flaw and keeps the energy high in every session. Best decision I made for my fitness journey."',
    rating: 5,
  },
  {
    initials: "PC",
    name: "Priya Chawla",
    label: "Google Maps Review",
    quote:
      '"Amazing atmosphere! The mobility and core strength drills helped me fix my lower back pain while building real physical strength. 5 stars all the way!"',
    rating: 5,
  },
  {
    initials: "MK",
    name: "Madhav Kulkarni",
    label: "Google Maps Review",
    quote:
      '"Professional, structured, and goal-oriented. Whether you want to master handstands or build foundational strength, this is the exact place to be in Hyderabad."',
    rating: 5,
  },
  {
    initials: "RD",
    name: "Ritika Deshmukh",
    label: "Google Maps Review",
    quote:
      '"The group training sessions are super engaging and safe. Patient coaches who prioritize safety and movement quality above everything else."',
    rating: 5,
  },
];
