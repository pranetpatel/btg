"use server";

import { createPoll, deletePoll, setPollClosed } from "@/lib/polls/actions";

export type CreatePollFormState = { error: string } | null;

export async function createPollAction(
  _prev: CreatePollFormState,
  formData: FormData
): Promise<CreatePollFormState> {
  return createPoll({
    question: String(formData.get("question") ?? ""),
    options: formData.getAll("option").map((o) => String(o)),
  });
}

export async function setPollClosedAction(id: string, closed: boolean): Promise<void> {
  await setPollClosed(id, closed);
}

export async function deletePollAction(id: string): Promise<void> {
  await deletePoll(id);
}
