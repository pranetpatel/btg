import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "btg_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function adminSecret() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function isAdminConfigured() {
  return adminSecret().length > 0;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function passwordMatches(password: string) {
  const secret = adminSecret();
  if (!secret) return false;
  return safeEqual(password, secret);
}

function tokenFor(expiresAt: number, secret: string) {
  const payload = String(expiresAt);
  return `${payload}.${sign(payload, secret)}`;
}

export async function isAdminSession() {
  const secret = adminSecret();
  if (!secret) return false;

  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;

  const [payload, mac] = token.split(".");
  if (!payload || !mac) return false;
  if (!safeEqual(mac, sign(payload, secret))) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  return true;
}

export async function createAdminSession() {
  const secret = adminSecret();
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  (await cookies()).set(COOKIE, tokenFor(expiresAt, secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession() {
  (await cookies()).set(COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
