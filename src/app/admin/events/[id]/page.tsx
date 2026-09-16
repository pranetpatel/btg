import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isAdminSession } from "@/lib/signups/admin";
import { getEvent, listAttendeeIds } from "@/lib/events/actions";
import { getSignupsForAdmin } from "@/lib/signups/actions";
import { AttendanceToggle } from "../attendance-toggle";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Event attendance · Be The Good",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminSession())) redirect("/admin");

  const { id } = await params;
  const [event, signups, attendeeIds] = await Promise.all([
    getEvent(id),
    getSignupsForAdmin(),
    listAttendeeIds(id),
  ]);

  if (!event) notFound();

  const rows = signups ?? [];
  const attendees = rows.filter((r) => attendeeIds.has(r.id));
  const attendeeEmails = attendees
    .map((r) => r.email)
    .filter((e): e is string => Boolean(e));
  const attendeeHandles = attendees
    .map((r) => r.instagram)
    .filter((h): h is string => Boolean(h));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 md:px-10">
      <p className="eyebrow text-purple/70">Private</p>
      <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight">
        {event.title}
      </h1>
      <p className="mt-3 text-sm text-ink/70">
        {attendees.length} of {rows.length} on the list marked as attending.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <CopyButton
          label={`Copy attendee emails (${attendeeEmails.length})`}
          getText={() => attendeeEmails.join(", ")}
        />
        <CopyButton
          label={`Copy attendee Instagram handles (${attendeeHandles.length})`}
          getText={() => attendeeHandles.map((h) => `@${h}`).join(", ")}
        />
      </div>

      {rows.length === 0 ? (
        <p className="mt-10 text-sm text-ink/60">No volunteers on the list yet.</p>
      ) : (
        <div className="mt-8 flex flex-col divide-y divide-purple/10 rounded-3xl border border-purple/10">
          {rows.map((signup) => (
            <label
              key={signup.id}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              <AttendanceToggle
                eventId={event.id}
                signupId={signup.id}
                checked={attendeeIds.has(signup.id)}
              />
              <span className="flex-1">
                <span className="font-medium">{signup.name}</span>
                <span className="ml-2 text-sm text-ink/50">
                  {signup.instagram ? `@${signup.instagram}` : signup.email ?? ""}
                </span>
              </span>
            </label>
          ))}
        </div>
      )}
    </main>
  );
}
