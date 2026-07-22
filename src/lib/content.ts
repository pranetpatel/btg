export const INSTAGRAM_URL = "https://www.instagram.com/bethegooduwo/";
export const INSTAGRAM_HANDLE = "@bethegooduwo";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Who we are", href: "#about" },
  { label: "What we do", href: "#pillars" },
  { label: "Campus", href: "#campus" },
  { label: "Get involved", href: "#involved" },
  { label: "Stories", href: "#stories" },
] as const;

/* ── Three pillars (BRAND.md §6) — replaces Capsules "Houses" ─────────── */
export type Pillar = {
  slug: "care" | "community" | "mentorship";
  name: string;
  tagline: string;
  description: string;
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
    tagline: "Innovation from students who care about the people who care.",
    description:
      "An app built with a friend to ease caregiver burnout in clinical settings — support for the people who spend their days supporting everyone else.",
    image: null,
    status: "Live",
    detail:
      "Caregivers in clinical settings carry an invisible weight. Be The Good Care is our answer: a tool designed to lighten that load, built by students who believe technology should show up where it's needed most. Demo video and screenshots land here as the product team ships.",
    points: [
      { label: "Built for", value: "Clinical caregivers" },
      { label: "Focus", value: "Burnout & wellbeing" },
      { label: "Stage", value: "In active build" },
      { label: "Made by", value: "Students + a friend" },
    ],
    ctaLabel: "Get involved with the product",
    ctaPurpose: "care",
  },
  {
    slug: "community",
    name: "Community care",
    tagline: "Practical help, funded together.",
    description:
      "Food and hygiene kits for people experiencing hardship — and the fundraising, from members and sponsors, that puts them into circulation.",
    image: null,
    status: "Active",
    detail:
      "Kindness that you can hold. We raise money and resources to build food and hygiene kits for vulnerable people across London, then get them into the right hands. Sponsors and members fund the work; volunteers pack and deliver it.",
    points: [
      { label: "What", value: "Food & hygiene kits" },
      { label: "For", value: "People facing hardship" },
      { label: "Fueled by", value: "Members & sponsors" },
      { label: "Where", value: "London, ON" },
    ],
    ctaLabel: "Sponsor a kit",
    ctaPurpose: "sponsor",
  },
  {
    slug: "mentorship",
    name: "Mentorship",
    tagline: "Belonging, from people who get it.",
    description:
      "Peer support for incoming students finding their footing at Western — guidance and a sense of belonging, no stigma attached.",
    image: null,
    status: "Ongoing",
    detail:
      "Starting university is hard, and not everyone arrives with the same head start. Our mentors walk alongside incoming students — answering questions, making introductions, and making sure nobody has to figure it out alone. This is belonging and guidance, student to student.",
    points: [
      { label: "For", value: "Incoming students" },
      { label: "About", value: "Belonging & guidance" },
      { label: "From", value: "Peers who've been there" },
      { label: "Intake", value: "Opening soon" },
    ],
    ctaLabel: "Become a mentor",
    ctaPurpose: "mentor",
  },
];

/* ── Values shown as pills under the pillars header ───────────────────── */
export const VALUES = [
  "Student-led",
  "Western-rooted",
  "Action-first",
  "Warm",
  "Grassroots",
  "For real people",
] as const;

/* ── Why Be The Good (BRAND.md) — replaces "Why Capsules" ─────────────── */
export const WHY_POINTS = [
  {
    index: "01",
    title: "You don't just care — you do.",
    copy: "Join Be The Good and you show up: give time, build things, and make someone's week lighter. Even a few smiles count.",
    image: null,
  },
  {
    index: "02",
    title: "Belonging that actually does something.",
    copy: "A movement rooted at Western, warm and human — not a caption, not awareness-only. Find your people while you help others find theirs.",
    image: null,
  },
  {
    index: "03",
    title: "Real support, made practical.",
    copy: "From an app for caregiver burnout to kits in people's hands to mentors for incoming students — small kindness, turned into sustained community support.",
    image: null,
  },
] as const;

/* ── Ways to get involved — replaces Capsules "Activities" ────────────── */
export const INVOLVE_WAYS = [
  {
    title: "Volunteer with a crew",
    tag: "Drop-in" as const,
    meta: "Kit builds & kindness drops",
    copy: "Pack food and hygiene kits, leave kindness notes across campus, and help at community projects. Come once or come often.",
    image: null,
    purpose: "volunteer" as const,
  },
  {
    title: "Food bank volunteering",
    tag: "Coming soon" as const,
    meta: "Regular shifts this year",
    copy: "This year we're organizing regular food bank volunteer shifts. Join a crew and give a few hours where it counts.",
    image: null,
    purpose: "volunteer" as const,
  },
  {
    title: "Become a mentor",
    tag: "Ongoing" as const,
    meta: "Peer support",
    copy: "Walk alongside an incoming student. Share what you know, make introductions, and help someone feel at home at Western.",
    image: null,
    purpose: "mentor" as const,
  },
  {
    title: "Sponsor the work",
    tag: "Partner" as const,
    meta: "For sponsors & local partners",
    copy: "Fund kits, campus kindness projects, and student-led programs. Get real stories — and visibility — to show for it.",
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

/* ── Stories / campus culture — replaces "Reviews" ────────────────────
   No invented testimonials. These are real program moments and clearly
   labeled placeholders for content that lands as the club documents it. */
export const STORIES = [
  {
    kind: "Kindness note" as const,
    body: "I hope you know how loved you are.",
    meta: "Left on a windshield in Lot 15",
  },
  {
    kind: "Campus conversation" as const,
    body: "Who is your biggest inspiration in life?",
    meta: "From our street interviews",
  },
  {
    kind: "Program moment" as const,
    body: "A morning packing food & hygiene kits with the crew.",
    meta: "Community care — placeholder for photo",
  },
  {
    kind: "Kindness note" as const,
    body: "Someone is glad you made it to class today.",
    meta: "Kindness drop, University College",
  },
  {
    kind: "Program moment" as const,
    body: "First mentor–mentee coffee of the term.",
    meta: "Mentorship — placeholder for photo",
  },
  {
    kind: "Campus conversation" as const,
    body: "What's one small kindness that changed your week?",
    meta: "From our street interviews",
  },
] as const;
