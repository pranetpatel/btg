import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function supabaseUrl() {
  return process.env.SUPABASE_URL ?? "";
}

function supabaseKey() {
  return (
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    ""
  );
}

function usesServiceRole() {
  return Boolean(
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function supabaseConfigured() {
  return Boolean(supabaseUrl() && supabaseKey());
}

let cached: SupabaseClient | null = null;

export function supabaseServer() {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY."
    );
  }

  if (!cached) {
    const secret = process.env.SIGNUPS_SERVER_SECRET;
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global:
        usesServiceRole() || !secret
          ? undefined
          : { headers: { "x-btg-signup-secret": secret } },
    });
  }

  return cached;
}
