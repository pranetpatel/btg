import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPollPublic } from "@/lib/polls/actions";
import { VoteForm } from "./vote-form";

export const metadata: Metadata = {
  title: "Poll · Be The Good",
};

export const dynamic = "force-dynamic";

export default async function PublicPollPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const poll = await getPollPublic(id);
  if (!poll) notFound();

  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col justify-center px-6 py-16 md:px-10">
      <p className="eyebrow text-purple/70">Be The Good</p>
      <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight md:text-4xl">
        {poll.question}
      </h1>

      {poll.closed ? (
        <p className="mt-6 text-sm text-ink/70">
          This poll is closed. Thanks for stopping by.
        </p>
      ) : (
        <VoteForm pollId={poll.id} options={poll.options} />
      )}
    </main>
  );
}
