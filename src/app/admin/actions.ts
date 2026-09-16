"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  clearAdminSession,
  isAdminConfigured,
  passwordMatches,
} from "@/lib/signups/admin";

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
