export const NAV_LINKS = [
  { label: "Welcome", href: "#welcome" },
  { label: "Introduction", href: "#introduction" },
  { label: "Houses", href: "#houses" },
  { label: "Why Capsules®", href: "#why" },
  { label: "Activities", href: "#activities" },
  { label: "Feedback", href: "#feedback" },
] as const;

export type Capsule = {
  slug: "classic" | "terrace" | "desert";
  name: string;
  description: string;
  image: string | null;
  squareFootage: string;
  bed: string;
  shiftingWindow: boolean;
  airCondition: boolean;
  jacuzzi: boolean;
  terrace: boolean;
  pricePerNight: number;
};

export const CAPSULES: Capsule[] = [
  {
    slug: "classic",
    name: "Classic Capsule®",
    description:
      "Classic Capsule® boasts refined aesthetics and a modern interior, creating an intimate retreat in a desert landscape.",
    image: null,
    squareFootage: "22m2",
    bed: "King Size",
    shiftingWindow: true,
    airCondition: true,
    jacuzzi: true,
    terrace: false,
    pricePerNight: 2000,
  },
  {
    slug: "terrace",
    name: "Terrace Capsule®",
    description:
      "The most prestige capsule with the biggest terrace and jacuzzi with an amazing view of Los Angeles.",
    image: null,
    squareFootage: "30m2",
    bed: "King Size",
    shiftingWindow: true,
    airCondition: true,
    jacuzzi: true,
    terrace: true,
    pricePerNight: 2500,
  },
  {
    slug: "desert",
    name: "Desert Capsule®",
    description:
      "With its striking architecture and upscale amenities, Desert Capsule® offers an exclusive retreat in the heart of the desert.",
    image: null,
    squareFootage: "28m2",
    bed: "King Size",
    shiftingWindow: true,
    airCondition: true,
    jacuzzi: true,
    terrace: false,
    pricePerNight: 2250,
  },
];

export const HOUSE_RULES = [
  "Sustainable",
  "Nature—Care",
  "Smart",
  "Privacy",
  "Spacious",
  "Glassed-in",
] as const;

export const WHY_CAPSULES = [
  {
    title: "Enjoy the view through—the wide panoramic glass window",
    copy: "Get closer to the desert nature than ever before and admire this unique, breathtaking landscape.",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Sound of silence—out of the city rush with completely privacy",
    copy: "Here, every whisper of nature recharges your soul—your sanctuary of solitude awaits.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Joshua_Tree_National_Park_2013.jpg/1920px-Joshua_Tree_National_Park_2013.jpg",
  },
  {
    title: "Relax yourself in—Wooden Jacuzzi",
    copy: "Let the natural textures and gentle bubbles transport you to a realm of pure, handcrafted bliss.",
    image: null,
  },
] as const;

export const ACTIVITIES = [
  {
    title: "Buggy tours in the desert",
    difficulty: "Easy" as const,
    duration: "3-5h duration",
    copy: "Explore the terrain on a guided buggy tour that takes you through the desert's vast and open landscapes.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Imperial_Sand_Dunes_Recreation_Area_%2827971635674%29.jpg/1920px-Imperial_Sand_Dunes_Recreation_Area_%2827971635674%29.jpg",
  },
  {
    title: "Breathtaking desert hikes",
    difficulty: "Medium" as const,
    duration: "8-12h duration",
    copy: "Set out on a hike that offers clear trails, stunning views, and a closer look at the unique desert environment.",
    image: null,
  },
  {
    title: "Exciting group rock climbing",
    difficulty: "Hard" as const,
    duration: "24h duration",
    copy: "Climbing session on natural sandstone formations, designed to be both challenging and safe while fostering teamwork.",
    image: null,
  },
];

export const REVIEWS = [
  {
    quote:
      "Staying at Capsules® in the California desert redefined my retreat — modern design meets nature, and every sunset feels like a serene masterpiece.",
    name: "Marcus Simpson",
    location: "New York",
  },
  {
    quote:
      "Capsules® offered the perfect escape — sleek, modern spaces surrounded by desert stillness. Each moment felt peaceful, grounded, and truly unique.",
    name: "Lena Morrison",
    location: "Los Angeles",
  },
  {
    quote:
      "Capsules® was the perfect desert hideaway — stylish, peaceful, and fully surrounded by stunning views day and night.",
    name: "Jason Whitaker",
    location: "San Francisco",
  },
];
