"use server";

import { submitPollResponse } from "@/lib/polls/actions";

export type VoteState = { error: string } | { ok: true } | null;

export async function voteAction(
  pollId: string,
  _prev: VoteState,
  formData: FormData
): Promise<VoteState> {
  const optionIndex = Number(formData.get("option"));
  if (Number.isNaN(optionIndex)) return { error: "Pick an option." };

  return submitPollResponse(
    pollId,
    optionIndex,
    String(formData.get("name") ?? ""),
    String(formData.get("email") ?? "")
  );
}
