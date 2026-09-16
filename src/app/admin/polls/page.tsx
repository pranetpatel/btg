import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/signups/admin";
import { listPolls } from "@/lib/polls/actions";
import { PollForm } from "./poll-form";
import { PollActionsRow } from "./poll-actions-row";
import { PollLink } from "./poll-link";

export const metadata: Metadata = {
  title: "Polls · Be The Good",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PollsPage() {
  if (!(await isAdminSession())) redirect("/admin");

  const polls = await listPolls();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 md:px-10">
      <p className="eyebrow text-purple/70">Private</p>
      <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight">
        Polls
      </h1>
      <p className="mt-3 text-sm text-ink/70">
        Create a poll, copy the link, share it however you want (DM, group
        chat, email). Anyone with the link can vote — no account needed.
      </p>

      <div className="mt-8 rounded-3xl border border-purple/10 bg-lavender-soft/40 p-6">
        <p className="eyebrow text-purple/70">New poll</p>
        <PollForm />
      </div>

      {polls.length === 0 ? (
        <p className="mt-10 text-sm text-ink/60">No polls yet.</p>
      ) : (
        <div className="mt-10 flex flex-col gap-3">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="rounded-2xl border border-purple/10 px-5 py-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{poll.question}</p>
                  <p className="mt-0.5 text-sm text-ink/60">
                    {poll.responseCount}{" "}
                    {poll.responseCount === 1 ? "response" : "responses"} ·{" "}
                    {poll.closed ? "Closed" : "Open"}
                  </p>
                </div>
                <PollActionsRow id={poll.id} closed={poll.closed} />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={`/admin/polls/${poll.id}`}
                  className="rounded-full border border-purple/20 px-4 py-2 text-xs font-medium text-purple transition-colors hover:bg-purple/5"
                >
                  View results
                </Link>
                <PollLink id={poll.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
