import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isAdminSession } from "@/lib/signups/admin";
import { getPollResults } from "@/lib/polls/actions";

export const metadata: Metadata = {
  title: "Poll results · Be The Good",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PollResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminSession())) redirect("/admin");

  const { id } = await params;
  const results = await getPollResults(id);
  if (!results) notFound();

  const { poll, counts } = results;
  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 md:px-10">
      <p className="eyebrow text-purple/70">Private</p>
      <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight md:text-4xl">
        {poll.question}
      </h1>
      <p className="mt-3 text-sm text-ink/70">
        {total} {total === 1 ? "response" : "responses"} ·{" "}
        {poll.closed ? "Closed" : "Open"}
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {poll.options.map((option, i) => {
          const count = counts[i] ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={option}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{option}</span>
                <span className="text-ink/60">
                  {count} · {pct}%
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-lavender-soft/60">
                <div
                  className="h-full rounded-full bg-purple"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
