import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/signups/admin";
import { listEvents } from "@/lib/events/actions";
import { EventForm } from "./event-form";
import { DeleteEventButton } from "./delete-event-button";

export const metadata: Metadata = {
  title: "Events · Be The Good",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "No date set";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" }).format(date);
}

export default async function EventsPage() {
  if (!(await isAdminSession())) redirect("/admin");

  const events = await listEvents();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 md:px-10">
      <p className="eyebrow text-purple/70">Private</p>
      <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight">
        Events
      </h1>
      <p className="mt-3 text-sm text-ink/70">
        Create an event, then mark who showed up. Attendance shows up as tags
        on each volunteer.
      </p>

      <div className="mt-8 rounded-3xl border border-purple/10 bg-lavender-soft/40 p-6">
        <p className="eyebrow text-purple/70">New event</p>
        <EventForm />
      </div>

      {events.length === 0 ? (
        <p className="mt-10 text-sm text-ink/60">No events yet.</p>
      ) : (
        <div className="mt-10 flex flex-col gap-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple/10 px-5 py-4"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="mt-0.5 text-sm text-ink/60">
                  {formatDate(event.eventDate)} ·{" "}
                  {event.attendeeCount === 1
                    ? "1 attendee"
                    : `${event.attendeeCount} attendees`}
                  {event.description ? ` · ${event.description}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/events/${event.id}`}
                  className="rounded-full border border-purple/20 px-4 py-2 text-xs font-medium text-purple transition-colors hover:bg-purple/5"
                >
                  Manage attendance
                </Link>
                <DeleteEventButton id={event.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
