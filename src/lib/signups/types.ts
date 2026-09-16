import type { InvolvePurpose, VolunteerInterest } from "@/lib/content";

export type InvolveSignup = {
  id: string;
  createdAt: string;
  name: string;
  email?: string;
  instagram?: string;
  note: string;
  purpose: InvolvePurpose;
  phone?: string;
  westernStudent?: boolean;
  interests?: VolunteerInterest[];
  addedByAdmin?: boolean;
};

export type CreateSignupInput = {
  name: string;
  email?: string;
  instagram?: string;
  note?: string;
  purpose: InvolvePurpose;
  phone?: string;
  westernStudent?: boolean | null;
  interests?: VolunteerInterest[];
  addedByAdmin?: boolean;
};

export type CreateSignupResult =
  | { ok: true; status: "created" | "duplicate"; signup: InvolveSignup }
  | { ok: false; error: string };

export type SignupStore = {
  create: (
    input: Omit<InvolveSignup, "id" | "createdAt">
  ) => Promise<{ status: "created" | "duplicate"; signup: InvolveSignup }>;
  list: () => Promise<InvolveSignup[]>;
};
