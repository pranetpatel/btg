export const INSTAGRAM_URL = "https://www.instagram.com/bethegooduwo/";
export const INSTAGRAM_HANDLE = "@bethegooduwo";
export const LOGO = "/logowhite-removebg.png";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Who we are", href: "#about" },
  { label: "What we do", href: "#pillars" },
  { label: "Campus", href: "#campus" },
  { label: "Get involved", href: "#involved" },
  { label: "Stories", href: "#stories" },
] as const;

/* ── Three pillars (BRAND.md §6) ─────────────────────────────────────── */
export type Pillar = {
  slug: "care" | "community" | "mentorship";
  name: string;
  blurb: string;
  image: string | null;
  status: "Live" | "Active" | "Ongoing";
  detail: string;
  points: { label: string; value: string }[];
  ctaLabel: string;
  ctaPurpose: InvolvePurpose;
};

export type InvolvePurpose =
  | "general"
  | "volunteer"
  | "mentor"
  | "sponsor"
  | "care";

export const PILLARS: Pillar[] = [
  {
    slug: "care",
    name: "Be The Good Care",
    blurb: "An app for caregiver burnout.",
    image: null,
    status: "Live",
    detail:
      "A tool built with a friend to ease burnout for caregivers in clinical settings. Demo and screenshots land here soon.",
    points: [
      { label: "Built for", value: "Clinical caregivers" },
      { label: "Focus", value: "Burnout" },
      { label: "Stage", value: "In build" },
    ],
    ctaLabel: "Join the product team",
    ctaPurpose: "care",
  },
  {
    slug: "community",
    name: "Community care",
    blurb: "Food and hygiene kits.",
    image: null,
    status: "Active",
    detail:
      "We raise money and build kits for people facing hardship across London, then get them into the right hands.",
    points: [
      { label: "What", value: "Food & hygiene kits" },
      { label: "For", value: "People in need" },
      { label: "Where", value: "London, ON" },
    ],
    ctaLabel: "Sponsor a kit",
    ctaPurpose: "sponsor",
  },
  {
    slug: "mentorship",
    name: "Mentorship",
    blurb: "Peer support for new students.",
    image: null,
    status: "Ongoing",
    detail:
      "Mentors who walk alongside incoming students. Belonging and guidance, from people who have been there.",
    points: [
      { label: "For", value: "Incoming students" },
      { label: "About", value: "Belonging" },
      { label: "Intake", value: "Soon" },
    ],
    ctaLabel: "Become a mentor",
    ctaPurpose: "mentor",
  },
];

export const VALUES = [
  "Student-led",
  "Western-rooted",
  "Action-first",
  "Warm",
] as const;

/* ── Why Be The Good ─────────────────────────────────────────────────── */
export const WHY_POINTS = [
  { index: "01", title: "Show up. Give time.", image: null },
  { index: "02", title: "Find your people.", image: null },
  { index: "03", title: "Make someone's week.", image: null },
] as const;

/* ── Ways to get involved ────────────────────────────────────────────── */
export const INVOLVE_WAYS = [
  {
    title: "Volunteer",
    tag: "Drop-in" as const,
    meta: "Kit builds & kindness drops",
    image: null,
    purpose: "volunteer" as const,
  },
  {
    title: "Food bank",
    tag: "Coming soon" as const,
    meta: "Regular shifts this year",
    image: null,
    purpose: "volunteer" as const,
  },
  {
    title: "Mentor",
    tag: "Ongoing" as const,
    meta: "Peer support",
    image: null,
    purpose: "mentor" as const,
  },
  {
    title: "Sponsor",
    tag: "Partner" as const,
    meta: "Fund the work",
    image: null,
    purpose: "sponsor" as const,
  },
] as const;

export const INVOLVE_TAG_STYLES: Record<string, string> = {
  "Drop-in": "bg-lavender/25 text-lavender",
  Ongoing: "bg-lavender/25 text-lavender",
  "Coming soon": "bg-gold/20 text-gold",
  Partner: "bg-cream text-purple",
};

/* ── Stories / campus culture ────────────────────────────────────────
   Real program moments and clearly labeled photo placeholders. No
   invented testimonials. */
export const STORIES = [
  {
    kind: "Kindness note" as const,
    body: "I hope you know how loved you are.",
    meta: "Left on a windshield, Lot 15",
  },
  {
    kind: "Campus conversation" as const,
    body: "Who is your biggest inspiration?",
    meta: "Street interviews",
  },
  {
    kind: "Program moment" as const,
    body: "Packing kits with the crew.",
    meta: "Photo coming soon",
  },
  {
    kind: "Kindness note" as const,
    body: "Glad you made it to class today.",
    meta: "University College",
  },
  {
    kind: "Program moment" as const,
    body: "First mentor coffee of the term.",
    meta: "Photo coming soon",
  },
] as const;
