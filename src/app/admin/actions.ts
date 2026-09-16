"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createAdminSession,
  clearAdminSession,
  isAdminConfigured,
  passwordMatches,
} from "@/lib/signups/admin";
import { addSignupAsAdmin } from "@/lib/signups/actions";
import type { InvolvePurpose } from "@/lib/content";

export async function loginAdmin(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  if (!isAdminConfigured()) {
    return { error: "Admin isn’t configured yet. Set ADMIN_PASSWORD." };
  }

  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    return { error: "That password isn’t right." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin");
}

export type AddPersonState = { error: string } | null;

export async function addPersonAdmin(
  _prev: AddPersonState,
  formData: FormData
): Promise<AddPersonState> {
  const result = await addSignupAsAdmin({
    name: String(formData.get("name") ?? ""),
    instagram: String(formData.get("instagram") ?? ""),
    email: String(formData.get("email") ?? ""),
    purpose: (String(formData.get("purpose") ?? "volunteer") as InvolvePurpose),
    note: "",
  });

  if (!result.ok) return { error: result.error };

  revalidatePath("/admin");
  return null;
}
