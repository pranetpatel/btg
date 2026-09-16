"use server";

import { revalidatePath } from "next/cache";
import { isAdminSession } from "@/lib/signups/admin";
import { supabaseServer } from "@/lib/signups/client";
import type { CreateEventInput, VolunteerEvent } from "./types";

type EventRow = {
  id: string;
  created_at: string;
  title: string;
  event_date: string | null;
  description: string | null;
};

function fromRow(row: EventRow, attendeeCount: number): VolunteerEvent {
  return {
    id: row.id,
    createdAt: row.created_at,
    title: row.title,
    eventDate: row.event_date,
    description: row.description ?? "",
    attendeeCount,
  };
}

export async function listEvents(): Promise<VolunteerEvent[]> {
  if (!(await isAdminSession())) return [];

  const db = supabaseServer();
  const [{ data: events, error: eventsError }, { data: attendance, error: attendanceError }] =
    await Promise.all([
      db.from("events").select("*").order("event_date", { ascending: false, nullsFirst: false }),
      db.from("event_attendance").select("event_id"),
    ]);

  if (eventsError) throw eventsError;
  if (attendanceError) throw attendanceError;

  const counts = new Map<string, number>();
  for (const row of attendance ?? []) {
    counts.set(row.event_id, (counts.get(row.event_id) ?? 0) + 1);
  }

  return ((events as EventRow[] | null) ?? []).map((row) =>
    fromRow(row, counts.get(row.id) ?? 0)
  );
}

export async function getEvent(id: string): Promise<VolunteerEvent | null> {
  if (!(await isAdminSession())) return null;

  const db = supabaseServer();
  const [{ data: event, error: eventError }, { count, error: countError }] = await Promise.all([
    db.from("events").select("*").eq("id", id).maybeSingle(),
    db
      .from("event_attendance")
      .select("*", { count: "exact", head: true })
      .eq("event_id", id),
  ]);

  if (eventError) throw eventError;
  if (countError) throw countError;
  if (!event) return null;

  return fromRow(event as EventRow, count ?? 0);
}

export async function listAttendeeIds(eventId: string): Promise<Set<string>> {
  if (!(await isAdminSession())) return new Set();

  const { data, error } = await supabaseServer()
    .from("event_attendance")
    .select("signup_id")
    .eq("event_id", eventId);

  if (error) throw error;
  return new Set((data ?? []).map((row) => row.signup_id as string));
}

export async function listEventsBySignup(): Promise<Map<string, string[]>> {
  if (!(await isAdminSession())) return new Map();

  const db = supabaseServer();
  const [{ data: attendance, error: attendanceError }, { data: events, error: eventsError }] =
    await Promise.all([
      db.from("event_attendance").select("event_id, signup_id"),
      db.from("events").select("id, title"),
    ]);

  if (attendanceError) throw attendanceError;
  if (eventsError) throw eventsError;

  const titleById = new Map(
    ((events as { id: string; title: string }[] | null) ?? []).map((e) => [e.id, e.title])
  );

  const bySignup = new Map<string, string[]>();
  for (const row of attendance ?? []) {
    const title = titleById.get(row.event_id);
    if (!title) continue;
    const list = bySignup.get(row.signup_id) ?? [];
    list.push(title);
    bySignup.set(row.signup_id, list);
  }
  return bySignup;
}

export type CreateEventState = { error: string } | null;

export async function createEvent(input: CreateEventInput): Promise<CreateEventState> {
  if (!(await isAdminSession())) return { error: "Not authorized." };

  const title = input.title.trim().slice(0, 120);
  if (!title) return { error: "Give the event a title." };

  const description = (input.description ?? "").trim().slice(0, 1000);
  const eventDate = input.eventDate?.trim() || null;

  const { error } = await supabaseServer()
    .from("events")
    .insert({ title, description, event_date: eventDate });

  if (error) return { error: "Couldn’t create that event. Try again." };

  revalidatePath("/admin/events");
  return null;
}

export async function deleteEvent(id: string): Promise<void> {
  if (!(await isAdminSession())) return;
  const { error } = await supabaseServer().from("events").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/events");
}

export async function setAttendance(
  eventId: string,
  signupId: string,
  attending: boolean
): Promise<void> {
  if (!(await isAdminSession())) return;

  const db = supabaseServer();
  if (attending) {
    const { error } = await db
      .from("event_attendance")
      .upsert({ event_id: eventId, signup_id: signupId }, { onConflict: "event_id,signup_id" });
    if (error) throw error;
  } else {
    const { error } = await db
      .from("event_attendance")
      .delete()
      .eq("event_id", eventId)
      .eq("signup_id", signupId);
    if (error) throw error;
  }

  revalidatePath(`/admin/events/${eventId}`);
  revalidatePath("/admin/events");
  revalidatePath("/admin");
}
