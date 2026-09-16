"use server";

import {
  PURPOSE_LABEL,
  VOLUNTEER_INTERESTS,
  type InvolvePurpose,
  type VolunteerInterest,
} from "@/lib/content";
import { isAdminSession } from "./admin";
import { normalizeEmail, normalizeInstagram, signupStore } from "./store";
import type { CreateSignupInput, CreateSignupResult, InvolveSignup } from "./types";

const PURPOSES = Object.keys(PURPOSE_LABEL) as InvolvePurpose[];
const INTERESTS = new Set(
  VOLUNTEER_INTERESTS.map((item) => item.value)
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function parsePurpose(value: unknown): InvolvePurpose | null {
  if (typeof value !== "string") return null;
  return PURPOSES.includes(value as InvolvePurpose)
    ? (value as InvolvePurpose)
    : null;
}

function parseInterests(value: unknown): VolunteerInterest[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is VolunteerInterest =>
      typeof item === "string" && INTERESTS.has(item as VolunteerInterest)
  );
}

export async function submitInvolveSignup(
  input: CreateSignupInput
): Promise<CreateSignupResult> {
  const name = cleanText(input.name, 80);
  const email = normalizeEmail(cleanText(input.email, 254));
  const note = cleanText(input.note, 1000);
  const purpose = parsePurpose(input.purpose);

  if (!name) return { ok: false, error: "Add your name so we know who to thank." };
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "That email doesn’t look quite right." };
  }
  if (!purpose) {
    return { ok: false, error: "Pick a way in, then send it again." };
  }

  const record: Omit<InvolveSignup, "id" | "createdAt"> = {
    name,
    email,
    note,
    purpose,
  };

  if (purpose === "volunteer") {
    const phone = cleanText(input.phone, 40);
    if (phone) record.phone = phone;
    if (typeof input.westernStudent === "boolean") {
      record.westernStudent = input.westernStudent;
    }
    const interests = parseInterests(input.interests);
    if (interests.length) record.interests = interests;
  }

  try {
    const result = await signupStore.create(record);
    return { ok: true, ...result };
  } catch {
    return {
      ok: false,
      error: "Couldn’t send that just now. Try again, or DM us.",
    };
  }
}

export async function getSignupsForAdmin(): Promise<InvolveSignup[] | null> {
  if (!(await isAdminSession())) return null;
  return signupStore.list();
}

export type AddSignupAsAdminInput = {
  name: string;
  instagram?: string;
  email?: string;
  purpose: InvolvePurpose;
  note?: string;
};

export async function addSignupAsAdmin(
  input: AddSignupAsAdminInput
): Promise<CreateSignupResult> {
  if (!(await isAdminSession())) {
    return { ok: false, error: "Not authorized." };
  }

  const name = cleanText(input.name, 80);
  const instagram = normalizeInstagram(cleanText(input.instagram, 60));
  const email = normalizeEmail(cleanText(input.email, 254));
  const note = cleanText(input.note, 1000);
  const purpose = parsePurpose(input.purpose) ?? "volunteer";

  if (!name) return { ok: false, error: "Add a name." };
  if (!instagram && !email) {
    return { ok: false, error: "Add an Instagram handle or an email." };
  }
  if (email && !EMAIL_RE.test(email)) {
    return { ok: false, error: "That email doesn’t look quite right." };
  }

  const record: Omit<InvolveSignup, "id" | "createdAt"> = {
    name,
    note,
    purpose,
    addedByAdmin: true,
    ...(instagram ? { instagram } : {}),
    ...(email ? { email } : {}),
  };

  try {
    const result = await signupStore.create(record);
    return { ok: true, ...result };
  } catch {
    return { ok: false, error: "Couldn’t save that just now. Try again." };
  }
}
