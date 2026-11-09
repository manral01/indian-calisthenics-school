import { images, type SiteImage } from "./images";

// Blog content. Paragraph and list text supports [label](/path) links.
export type Block =
  | { h2: string }
  | { p: string }
  | { ul: string[] };

export interface BlogPost {
  slug: string;
  path: string;
  title: string;
  /** <title>, under 60 chars */
  seoTitle: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image: SiteImage;
  program: { path: string; name: string };
  body: Block[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "calisthenics-in-hyderabad-fees-timings",
    path: "/blog/calisthenics-in-hyderabad-fees-timings",
    title: "Calisthenics in Hyderabad: Fees, Timings and What to Expect",
    seoTitle: "Calisthenics in Hyderabad: Fees, Timings & What to Expect",
    description:
      "What calisthenics classes in Hyderabad cost, when batches run and what your first session looks like, with Indian Calisthenics School's fees and timings.",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    image: images.trainingSpaceGroup,
    program: { path: "/training/calisthenics", name: "Calisthenics training" },
    body: [
      {
        p: "Calisthenics has grown fast in Hyderabad, especially around HITEC City, Madhapur, Kondapur and Gachibowli. If you're thinking of starting, this guide covers what classes cost, when batches run, what happens in your first session and what to look for in an academy.",
      },
      { h2: "What is calisthenics?" },
      {
        p: "Calisthenics is strength training with your own bodyweight: push-ups, pull-ups, dips, squats and core work, building up to skills like handstands, L-sits, levers and muscle-ups. Every exercise can be made easier or harder, so complete beginners and advanced athletes can train in the same class.",
      },
      { h2: "How much do calisthenics classes cost in Hyderabad?" },
      {
        p: "Group batches are usually paid monthly, with discounts for longer plans. At Indian Calisthenics School in Madhapur:",
      },
      {
        ul: [
          "Weekday adult batch: ₹7,777 a month, ₹22,222 quarterly, ₹44,444 half-yearly or ₹77,777 yearly",
          "Weekend adult batch: ₹4,444 a month",
          "Kids (The Mighty Tribe, ages 3–15): ₹5,555 a month on weekdays, ₹3,333 a month on weekends",
          "Online personal training: ₹15,000; in-person personal training is priced after a consultation",
        ],
      },
      {
        p: "A demo session is free on any weekday. A weekend demo is ₹800, adjusted in your package when you join.",
      },
      { h2: "When do batches run?" },
      {
        p: "Most people in Hyderabad train before or after office hours, so academies run early-morning and evening batches. Ours run Monday to Friday from 6:30 to 9:30 AM and 6 to 9 PM in one-hour slots, with kids batches from 4 to 6 PM. Weekend batches run from 8 to 10 AM (kids 9 to 10 AM). See [all timings and fees](/training/calisthenics#timings).",
      },
      { h2: "What happens in your first session?" },
      {
        ul: [
          "A warm-up to get joints and muscles ready",
          "A quick look at where you are: push-ups, hangs, squats and mobility",
          "Strength and skill work at your level, with easier versions of anything you can't do yet",
          "A cool-down and stretch",
        ],
      },
      {
        p: "You don't need to be strong or flexible to start. Strength comes from the training itself. Read our guide on [how to start calisthenics as a beginner](/blog/how-to-start-calisthenics-as-a-beginner).",
      },
      { h2: "How to choose a calisthenics academy" },
      {
        ul: [
          "Coaches who correct your form and give you easier progressions, not just a workout",
          "Batch timings that fit your day, so you can train consistently",
          "A real training space: pull-up bars, parallel bars, rings and mats",
          "A supportive community, which is what keeps most people coming back",
          "Honest reviews from people at your level",
        ],
      },
      { h2: "Where to train" },
      {
        p: "Indian Calisthenics School is in Madhapur, near Mindspace and HITEC City. If you live or work around Kondapur, our sister academy [Calisthenics Lab India](https://www.calisthenicslabindia.club/) runs batches there. Both are part of the Hyderabad Calisthenics community.",
      },
    ],
  },
  {
    slug: "calisthenics-near-hitec-city-mindspace",
    path: "/blog/calisthenics-near-hitec-city-mindspace",
    title: "Calisthenics Near HITEC City and Mindspace: A Guide for Working Professionals",
    seoTitle: "Calisthenics Near HITEC City & Mindspace, Hyderabad",
    description:
      "Training calisthenics around a HITEC City or Mindspace work day: batches before and after office, weekend options, fees and how to start in Madhapur.",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    image: images.rig,
    program: { path: "/training/calisthenics", name: "Calisthenics training" },
    body: [
      {
        p: "If you work in HITEC City or Mindspace, long days at a desk can leave your back, shoulders and hips stiff. Calisthenics builds strength and mobility together, and an hour a few times a week is enough to feel the difference.",
      },
      { h2: "Fitting training around office hours" },
      {
        ul: [
          "Before work: weekday batches at 6:30, 7:30 and 8:30 AM",
          "After work: weekday batches at 6, 7 and 8 PM",
          "Weekends only: batches at 8 and 9 AM on Saturday and Sunday",
        ],
      },
      {
        p: "Each batch is one hour. Pick the slot you can keep every week: consistency matters more than how hard any single session is.",
      },
      { h2: "Why calisthenics suits desk workers" },
      {
        ul: [
          "Pulling work (hangs, rows, pull-ups) strengthens the upper back that slouching weakens",
          "Core holds and mobility work help with stiffness from long hours sitting",
          "No machines to queue for: the training uses bars, rings and your own bodyweight",
          "Skills like handstands and L-sits give you clear goals to work towards",
        ],
      },
      { h2: "Fees" },
      {
        p: "Weekday batches are ₹7,777 a month (₹22,222 quarterly). The weekend batch is ₹4,444 a month. A demo session is free on any weekday, so you can try a class before deciding. See [all plans](/training/calisthenics#timings).",
      },
      { h2: "Where we are" },
      {
        p: "Indian Calisthenics School is on Image Hospital Road, adjacent to Fresh Living Apartment, Vittal Rao Nagar, Madhapur, near Mindspace and HITEC City. [Get directions](/contact) or WhatsApp +91 88267 62234 to book a demo.",
      },
    ],
  },
  {
    slug: "how-to-start-calisthenics-as-a-beginner",
    path: "/blog/how-to-start-calisthenics-as-a-beginner",
    title: "How to Start Calisthenics as a Beginner",
    seoTitle: "How to Start Calisthenics as a Beginner",
    description:
      "A practical guide to starting calisthenics: the basic movements, how to progress, how often to train and common mistakes to avoid.",
    datePublished: "2026-10-29",
    dateModified: "2026-10-29",
    image: images.spot,
    program: { path: "/training/calisthenics", name: "Calisthenics training" },
    body: [
      {
        p: "Calisthenics is training with your own bodyweight: push-ups, pull-ups, dips, squats, and eventually skills like handstands and muscle-ups. You need very little equipment, and almost every exercise can be made easier or harder, which makes it one of the best ways to start training at any fitness level.",
      },
      { h2: "1. Learn the basic movement patterns" },
      {
        p: "Almost every calisthenics skill is built on a handful of patterns. Before chasing advanced skills, get comfortable with these:",
      },
      {
        ul: [
          "Push: incline push-ups, then full push-ups, then dips",
          "Pull: dead hangs, scapular pulls, then assisted and full pull-ups",
          "Legs: bodyweight squats, lunges and step-ups",
          "Core: planks, hollow body holds and leg raises",
        ],
      },
      { h2: "2. Use progressions, not willpower" },
      {
        p: "If you can't do a full pull-up yet, that's normal. Use an easier variation, such as a band-assisted pull-up, an inverted row or a slow negative, and build up the number of clean reps. When a variation feels controlled for several sets, move to the next step. This is how beginners reach their first pull-up, and later their first muscle-up.",
      },
      { h2: "3. Train consistently, and rest too" },
      {
        p: "Two to four sessions a week is plenty when you're starting out. Muscles, tendons and joints all need time to adapt, so rest days matter as much as training days. Short, regular sessions beat occasional long ones.",
      },
      { h2: "4. Prioritise form over reps" },
      {
        p: "Ten sloppy push-ups build less strength than six controlled ones, and they're more likely to irritate your shoulders and elbows. Move slowly, use the full range of motion, and stop a set when your form breaks down.",
      },
      { h2: "5. Common beginner mistakes" },
      {
        ul: [
          "Skipping the warm-up and wrist and shoulder preparation",
          "Jumping to advanced skills before the basic strength is there",
          "Training to failure every single session",
          "Ignoring legs because upper-body skills look more impressive",
        ],
      },
      { h2: "Get coached from day one" },
      {
        p: "A coach can spot form problems early and pick the right progression for you, which saves months of trial and error. If you're in Hyderabad, our [calisthenics batches in Madhapur](/training/calisthenics) welcome complete beginners, and [personal training](/training/personal-training) is available if you'd like one-on-one attention.",
      },
    ],
  },
  {
    slug: "calisthenics-for-kids-benefits-and-safety",
    path: "/blog/calisthenics-for-kids-benefits-and-safety",
    title: "Calisthenics for Kids: Benefits and Safety",
    seoTitle: "Calisthenics for Kids: Benefits and Safety",
    description:
      "Why bodyweight training is great for children, what a good kids class looks like, and the safety points parents should check.",
    datePublished: "2026-10-29",
    dateModified: "2026-10-29",
    image: images.kidsHandstand,
    program: { path: "/training/kids", name: "Kids training" },
    body: [
      {
        p: "Children are natural movers: they climb, hang, jump and roll without being told to. Calisthenics for kids takes that instinct and gives it structure, building strength, coordination and confidence through bodyweight movements and games.",
      },
      { h2: "Benefits of calisthenics for children" },
      {
        ul: [
          "Strength and body control: hanging, supporting their own weight and holding positions builds real, usable strength",
          "Coordination and balance: handstand drills, rolls and jumps develop body awareness",
          "A base for every sport: running, jumping, landing and changing direction carry over to football, cricket, swimming and more",
          "Confidence: learning a new skill step by step shows kids that practice pays off",
          "Healthy habits: regular sessions make movement a normal part of the week",
        ],
      },
      { h2: "What a good kids class looks like" },
      {
        p: "A good kids session is structured but playful. Expect a warm-up, skill practice broken into small steps, games that sneak in strength work, and a cool-down. Coaches should scale every exercise to the individual child, rather than expecting the whole class to do the same thing.",
      },
      { h2: "Safety points for parents" },
      {
        ul: [
          "Supervision: a coach should be watching and spotting skills like handstands",
          "Progressions: children should master basic positions before harder skills",
          "Technique over load: kids train with their own bodyweight, focusing on control rather than heavy weights",
          "Suitable surfaces: mats or padded flooring for rolling and inverted skills",
          "Listening to the child: any pain, as opposed to normal effort, means stop and check",
        ],
      },
      { h2: "Kids training in Madhapur, Hyderabad" },
      {
        p: "Indian Calisthenics School runs supervised [kids calisthenics batches in Madhapur](/training/kids) on weekday evenings and weekend mornings. Visit the page for timings and fees, or [contact us](/contact) with any questions.",
      },
    ],
  },
  {
    slug: "what-is-freestyle-calisthenics-and-parkour",
    path: "/blog/what-is-freestyle-calisthenics-and-parkour",
    title: "What Is Freestyle Calisthenics and Parkour?",
    seoTitle: "What Is Freestyle Calisthenics and Parkour?",
    description:
      "Freestyle calisthenics and parkour explained: what they are, how they differ from strength calisthenics, and how to start safely.",
    datePublished: "2026-10-29",
    dateModified: "2026-10-29",
    image: images.straddle,
    program: { path: "/training/freestyle-parkour", name: "Freestyle & parkour training" },
    body: [
      {
        p: "Most people picture calisthenics as strength work: pull-ups, dips, static holds like the planche or front lever. Freestyle calisthenics and parkour are its more dynamic, creative side, where the goal is to move with flow, momentum and style.",
      },
      { h2: "Freestyle calisthenics" },
      {
        p: "Freestyle calisthenics mostly happens on the bar. Athletes link swings, spins, transitions and release moves into continuous combinations, often called bar flow. It rewards timing, grip and coordination as much as raw strength, and every athlete develops their own style.",
      },
      { h2: "Parkour" },
      {
        p: "Parkour is about moving efficiently through an environment: running, jumping, vaulting over obstacles, climbing and landing precisely. Its foundations are safe landings and rolls, which spread impact so you can move with confidence.",
      },
      { h2: "How they differ from strength calisthenics" },
      {
        ul: [
          "Strength calisthenics focuses on controlled reps and static holds",
          "Freestyle focuses on momentum, rhythm and combinations on the bar",
          "Parkour focuses on moving through space: jumps, vaults and landings",
          "All three rely on the same base of pulling, pushing and core strength",
        ],
      },
      { h2: "How to start safely" },
      {
        ul: [
          "Build basic strength first: solid pull-ups, dips and a strong grip",
          "Learn to land and roll before jumping from any height",
          "Progress in small steps, low obstacles and simple swings first",
          "Train with a coach who can spot new skills",
        ],
      },
      { h2: "Try it in Hyderabad" },
      {
        p: "Indian Calisthenics School coaches [freestyle calisthenics and parkour in Madhapur, Hyderabad](/training/freestyle-parkour), starting from the fundamentals. If you're completely new, our [calisthenics batches](/training/calisthenics) are a great way to build the base first.",
      },
    ],
  },
];
