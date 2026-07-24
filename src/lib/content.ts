export const INSTAGRAM_URL = "https://www.instagram.com/bethegooduwo/";
export const INSTAGRAM_HANDLE = "@bethegooduwo";
export const LOGO = "/logowhite-removebg.png";

/** Featured IG posts + local thumbnails (IG CDN thumbs are not publicly fetchable). */
export const KINDNESS_MOMENT = {
  href: "https://www.instagram.com/p/DZP8_7YFo56/",
  image: "/kindnessnote.png",
  alt: "Handwritten kindness note taped to wood",
} as const;

export const CAMPUS_MOMENT = {
  href: "https://www.instagram.com/p/DZksVMoAMNU/",
  image: "/campusmoment.png",
  alt: "Campus street interview with a passerby",
} as const;

/** Second kindness note. Use once. Do not reuse beside kindnessnote.png. */
export const KINDNESS_NOTE_2 = "/kindnessnote2.png";

/**
 * Extra campus moments. Each file is used once on the homepage.
 * Do not reuse a path that is already assigned below.
 */
export const CAMPUS_MOMENTS = {
  noteHandOff: {
    image: "/campusmoments2.png",
    alt: "Handing a kindness note in the mall",
  },
  libraryInterview: {
    image: "/campusmoments3.png",
    alt: "Campus interview in the library lounge",
  },
  uscPortrait: {
    image: "/campusmoments4.jpeg",
    alt: "Student at Western University Students Council",
  },
  outdoorPortrait: {
    image: "/campusmoments5.jpeg",
    alt: "Student smiling outside a glass campus building",
  },
  concretePortrait: {
    image: "/campusmoments6.jpeg",
    alt: "Student smiling against a concrete campus wall",
  },
  atriumPortrait: {
    image: "/campusmoments7.jpeg",
    alt: "Student smiling in a bright campus atrium",
  },
} as const;

/**
 * Homepage scroll hero grid. Every culture photo in /public (logos excluded)
 * is scattered through the reveal grid at small size, so the current low-res
 * exports read fine. The center that scales up to fill the screen is a solid
 * brand color, not a photo (a full-bleed low-res image looks rough). Body
 * sections may reuse these files at their own slots. Keep in sync with
 * BRAND.md §13.
 */
export const HERO_PHOTOS = [
  { image: "/campusmoment.png", alt: "Campus street interview with a passerby" },
  { image: "/kindnessnote.png", alt: "Handwritten kindness note taped to wood" },
  { image: "/campusmoments2.png", alt: "Handing a kindness note in the mall" },
  { image: "/campusmoments3.png", alt: "Campus interview in the library lounge" },
  { image: "/campusmoments4.jpeg", alt: "Student at Western University Students Council" },
  { image: "/campusmoments5.jpeg", alt: "Student smiling outside a glass campus building" },
  { image: "/campusmoments6.jpeg", alt: "Student smiling against a concrete campus wall" },
  { image: "/campusmoments7.jpeg", alt: "Student smiling in a bright campus atrium" },
  { image: "/kindnessnote2.png", alt: "Handwritten kindness note taped on campus" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Who we are", href: "#about" },
  { label: "Campus", href: "#campus" },
  { label: "Ways to show up", href: "#involved" },
  { label: "What we do", href: "#pillars" },
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
    /* Placeholder until Care UI / kit photos land. Keep null on A + B. */
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
    blurb: "Care packages.",
    image: null,
    status: "Active",
    detail:
      "We raise money and build care packages with food, hygiene kits, and everyday essentials for people facing hardship across London, then get them into the right hands.",
    points: [
      { label: "What", value: "Care packages" },
      { label: "For", value: "People in need" },
      { label: "Where", value: "London, ON" },
    ],
    ctaLabel: "Sponsor a package",
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
  {
    index: "01",
    title: "Show up. Give time.",
    image: CAMPUS_MOMENTS.noteHandOff.image as string | null,
  },
  {
    index: "02",
    title: "Find your people.",
    image: CAMPUS_MOMENTS.libraryInterview.image as string | null,
  },
  {
    index: "03",
    title: "Make someone's week.",
    image: KINDNESS_NOTE_2 as string | null,
  },
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
    title: "Clinical & care settings",
    tag: "Ongoing" as const,
    meta: "Opportunities in clinical settings & with vulnerable populations are also available",
    image: null,
    purpose: "volunteer" as const,
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
    body: "Whats not meant for you will disappoint you until you understand.",
    meta: "From the kindness drop · IG",
  },
  {
    kind: "Campus conversation" as const,
    body: "Who is your biggest inspiration?",
    meta: "Street interviews · IG",
  },
  {
    kind: "Program moment" as const,
    body: "Packing kits with the crew.",
    meta: "Photo coming soon",
  },
  {
    kind: "Kindness note" as const,
    body: "The amount of beautiful things in your life depends on your ability to notice them.",
    meta: "Taped on campus glass",
  },
  {
    kind: "Program moment" as const,
    body: "First mentor coffee of the term.",
    meta: "Photo coming soon",
  },
] as const;
