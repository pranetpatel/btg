import type { InvolvePurpose, VolunteerInterest } from "@/lib/content";
import { supabaseServer } from "./client";
import type { InvolveSignup, SignupStore } from "./types";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

type SignupRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  note: string | null;
  purpose: InvolvePurpose;
  phone: string | null;
  western_student: boolean | null;
  interests: string[] | null;
};

function fromRow(row: SignupRow): InvolveSignup {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    note: row.note ?? "",
    purpose: row.purpose,
    ...(row.phone ? { phone: row.phone } : {}),
    ...(typeof row.western_student === "boolean"
      ? { westernStudent: row.western_student }
      : {}),
    ...(row.interests?.length
      ? { interests: row.interests as VolunteerInterest[] }
      : {}),
  };
}

const supabaseSignupStore: SignupStore = {
  async create(input) {
    const db = supabaseServer();
    const email = normalizeEmail(input.email);
    const payload = {
      name: input.name,
      email,
      note: input.note ?? "",
      purpose: input.purpose,
      phone: input.phone ?? null,
      western_student: input.westernStudent ?? null,
      interests: input.interests ?? [],
    };

    const { data, error } = await db
      .from("involve_signups")
      .insert(payload)
      .select("*")
      .single();

    if (error?.code === "23505") {
      const existing = await db
        .from("involve_signups")
        .select("*")
        .eq("email", email)
        .maybeSingle();
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
