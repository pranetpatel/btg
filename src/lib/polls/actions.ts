"use server";

import { revalidatePath } from "next/cache";
import { isAdminSession } from "@/lib/signups/admin";
import { supabaseServer } from "@/lib/signups/client";
import type { CreatePollInput, Poll, PollResults } from "./types";

type PollRow = {
  id: string;
  created_at: string;
  question: string;
  options: string[];
  closed: boolean;
};

function fromRow(row: PollRow, responseCount: number): Poll {
  return {
    id: row.id,
    createdAt: row.created_at,
    question: row.question,
    options: row.options,
    closed: row.closed,
    responseCount,
  };
}

export async function listPolls(): Promise<Poll[]> {
  if (!(await isAdminSession())) return [];

  const db = supabaseServer();
  const [{ data: polls, error: pollsError }, { data: responses, error: responsesError }] =
    await Promise.all([
      db.from("polls").select("*").order("created_at", { ascending: false }),
      db.from("poll_responses").select("poll_id"),
    ]);

  if (pollsError) throw pollsError;
  if (responsesError) throw responsesError;

  const counts = new Map<string, number>();
  for (const row of responses ?? []) {
    counts.set(row.poll_id, (counts.get(row.poll_id) ?? 0) + 1);
  }

  return ((polls as PollRow[] | null) ?? []).map((row) =>
    fromRow(row, counts.get(row.id) ?? 0)
  );
}

// Public: used by the /polls/[id] voting page. Not admin-gated — the app's
// own server-attached secret header is what satisfies RLS here, same as the
// public Get Involved form.
export async function getPollPublic(id: string): Promise<Poll | null> {
  const db = supabaseServer();
  const [{ data: poll, error: pollError }, { count, error: countError }] = await Promise.all([
    db.from("polls").select("*").eq("id", id).maybeSingle(),
    db.from("poll_responses").select("*", { count: "exact", head: true }).eq("poll_id", id),
  ]);

  if (pollError) throw pollError;
  if (countError) throw countError;
  if (!poll) return null;
  return fromRow(poll as PollRow, count ?? 0);
}

export async function getPollResults(id: string): Promise<PollResults | null> {
  if (!(await isAdminSession())) return null;

  const db = supabaseServer();
  const [{ data: poll, error: pollError }, { data: responses, error: responsesError }] =
    await Promise.all([
      db.from("polls").select("*").eq("id", id).maybeSingle(),
      db.from("poll_responses").select("option_index").eq("poll_id", id),
    ]);

  if (pollError) throw pollError;
  if (responsesError) throw responsesError;
  if (!poll) return null;

  const pollRow = poll as PollRow;
  const counts = pollRow.options.map((_, i) =>
    (responses ?? []).filter((r) => r.option_index === i).length
  );

  return { poll: fromRow(pollRow, counts.reduce((a, b) => a + b, 0)), counts };
}

export type CreatePollState = { error: string } | null;

export async function createPoll(input: CreatePollInput): Promise<CreatePollState> {
  if (!(await isAdminSession())) return { error: "Not authorized." };

  const question = input.question.trim().slice(0, 300);
  const options = input.options
    .map((o) => o.trim().slice(0, 120))
    .filter((o) => o.length > 0);

  if (!question) return { error: "Add a question." };
  if (options.length < 2) return { error: "Add at least two options." };
  if (options.length > 10) return { error: "Ten options max." };

  const { error } = await supabaseServer().from("polls").insert({ question, options });
  if (error) return { error: "Couldn’t create that poll. Try again." };

  revalidatePath("/admin/polls");
  return null;
}

export async function setPollClosed(id: string, closed: boolean): Promise<void> {
  if (!(await isAdminSession())) return;
  const { error } = await supabaseServer().from("polls").update({ closed }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/polls");
  revalidatePath(`/admin/polls/${id}`);
}

export async function deletePoll(id: string): Promise<void> {
  if (!(await isAdminSession())) return;
  const { error } = await supabaseServer().from("polls").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/polls");
}

export type SubmitPollResponseState = { error: string } | { ok: true } | null;

export async function submitPollResponse(
  pollId: string,
  optionIndex: number,
  name: string,
  email: string
): Promise<SubmitPollResponseState> {
  const poll = await getPollPublic(pollId);
  if (!poll) return { error: "That poll couldn’t be found." };
  if (poll.closed) return { error: "This poll is closed." };
  if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= poll.options.length) {
    return { error: "Pick an option." };
  }

  const { error } = await supabaseServer().from("poll_responses").insert({
    poll_id: pollId,
    option_index: optionIndex,
    respondent_name: name.trim().slice(0, 80) || null,
    respondent_email: email.trim().slice(0, 254) || null,
  });

  if (error) return { error: "Couldn’t send that just now. Try again." };
  return { ok: true };
}
