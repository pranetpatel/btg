import type { InvolvePurpose, VolunteerInterest } from "@/lib/content";
import { supabaseServer } from "./client";
import type { InvolveSignup, SignupStore } from "./types";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeInstagram(handle: string) {
  return handle.trim().replace(/^@/, "").toLowerCase();
}

type SignupRow = {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  instagram: string | null;
  note: string | null;
  purpose: InvolvePurpose;
  phone: string | null;
  western_student: boolean | null;
  interests: string[] | null;
  added_by_admin: boolean | null;
};

function fromRow(row: SignupRow): InvolveSignup {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    note: row.note ?? "",
    purpose: row.purpose,
    ...(row.email ? { email: row.email } : {}),
    ...(row.instagram ? { instagram: row.instagram } : {}),
    ...(row.phone ? { phone: row.phone } : {}),
    ...(typeof row.western_student === "boolean"
      ? { westernStudent: row.western_student }
      : {}),
    ...(row.interests?.length
      ? { interests: row.interests as VolunteerInterest[] }
      : {}),
    ...(row.added_by_admin ? { addedByAdmin: true } : {}),
  };
}

const supabaseSignupStore: SignupStore = {
  async create(input) {
    const db = supabaseServer();
    const email = input.email ? normalizeEmail(input.email) : null;
    const instagram = input.instagram ? normalizeInstagram(input.instagram) : null;
    const payload = {
      name: input.name,
      email,
      instagram,
      note: input.note ?? "",
      purpose: input.purpose,
      phone: input.phone ?? null,
      western_student: input.westernStudent ?? null,
      interests: input.interests ?? [],
      added_by_admin: input.addedByAdmin ?? false,
    };

    const { data, error } = await db
      .from("involve_signups")
      .insert(payload)
      .select("*")
      .single();

    if (error?.code === "23505") {
      const existingQuery = email
        ? db.from("involve_signups").select("*").eq("email", email)
        : db.from("involve_signups").select("*").eq("instagram", instagram ?? "");
      const existing = await existingQuery.maybeSingle();
      if (existing.data) {
        return { status: "duplicate", signup: fromRow(existing.data as SignupRow) };
      }
      throw error;
    }

    if (error || !data) throw error ?? new Error("Signup did not save.");
    return { status: "created", signup: fromRow(data as SignupRow) };
  },

  async list() {
    const { data, error } = await supabaseServer()
      .from("involve_signups")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as SignupRow[] | null)?.map(fromRow) ?? [];
  },
};

export const signupStore: SignupStore = supabaseSignupStore;
