"use server";

import { createEvent, deleteEvent } from "@/lib/events/actions";

export type CreateEventFormState = { error: string } | null;

export async function createEventAction(
  _prev: CreateEventFormState,
  formData: FormData
): Promise<CreateEventFormState> {
  return createEvent({
    title: String(formData.get("title") ?? ""),
    eventDate: String(formData.get("eventDate") ?? ""),
    description: String(formData.get("description") ?? ""),
  });
}

export async function deleteEventAction(id: string): Promise<void> {
  await deleteEvent(id);
}
