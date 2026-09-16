import type { InvolvePurpose, VolunteerInterest } from "@/lib/content";

export type InvolveSignup = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  note: string;
  purpose: InvolvePurpose;
  phone?: string;
  westernStudent?: boolean;
  interests?: VolunteerInterest[];
};

export type CreateSignupInput = {
  name: string;
  email: string;
  note?: string;
  purpose: InvolvePurpose;
  phone?: string;
  westernStudent?: boolean | null;
  interests?: VolunteerInterest[];
};

export type CreateSignupResult =
  | { ok: true; status: "created" | "duplicate"; signup: InvolveSignup }
  | { ok: false; error: string };

export type SignupStore = {
  create: (
    input: Omit<InvolveSignup, "id" | "createdAt"> & { email: string }
  ) => Promise<{ status: "created" | "duplicate"; signup: InvolveSignup }>;
  list: () => Promise<InvolveSignup[]>;
};
