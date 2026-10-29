export interface FAQItem {
  question: string;
  answer: string;
}

// Homepage FAQs. Rendered visibly AND emitted as FAQPage schema from the
// same array, so the text always matches exactly.
export const faqData: FAQItem[] = [
  {
    question: "Is calisthenics suitable for beginners?",
    answer:
      "Yes. Indian Calisthenics School welcomes beginners and provides structured training from beginner to advanced levels. You do not need prior calisthenics experience to start.",
  },
  {
    question: "Do I need to be strong before joining?",
    answer:
      "No. Strength is developed through training. Our sessions focus on building strength, control, mobility and movement progressively according to your current level.",
  },
  {
    question: "What training does Indian Calisthenics School offer?",
    answer:
      "We offer calisthenics, strength training, mobility, freestyle calisthenics and parkour, kids training and open gym access. Personal training and online personal training are also available.",
  },
  {
    question: "What are the training timings?",
    answer:
      "Weekday adult batches run from 6:30 AM to 9:30 AM and 6:00 PM to 9:00 PM. Kids batches run on weekdays from 4:00 PM to 6:00 PM. Weekend sessions run from 8:00 AM to 10:00 AM.",
  },
  {
    question: "Where is Indian Calisthenics School located?",
    answer:
      "We are in Madhapur, near Mindspace and HITEC City, Hyderabad, Telangana 500081. See the Contact page for the map and directions.",
  },
];
