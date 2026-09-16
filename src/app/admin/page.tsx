import type { Metadata } from "next";
import {
  PURPOSE_LABEL,
  VOLUNTEER_INTERESTS,
} from "@/lib/content";
import { isAdminConfigured, isAdminSession } from "@/lib/signups/admin";
import { getSignupsForAdmin } from "@/lib/signups/actions";
import type { InvolveSignup } from "@/lib/signups/types";
import { logoutAdmin } from "./actions";
import { AdminLoginForm } from "./login-form";
import { AddPersonForm } from "./add-person-form";

export const metadata: Metadata = {
  title: "Signups · Be The Good",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function interestLabel(value: string) {
  return (
    VOLUNTEER_INTERESTS.find((item) => item.value === value)?.label ?? value
  );
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminPage() {
  const authed = await isAdminSession();

  if (!authed) {
    return (
      <main className="flex min-h-full flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl border border-purple/10 bg-cream p-8 md:p-10">
          <p className="eyebrow text-purple/70">Private</p>
          <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight">
            Signups
          </h1>
          <p className="mt-3 text-sm text-ink/70">
            {isAdminConfigured()
              ? "Team only. Enter the password to see who raised a hand."
              : "Set ADMIN_PASSWORD on the server, then come back."}
          </p>
          {isAdminConfigured() ? <AdminLoginForm /> : null}
        </div>
      </main>
    );
  }

  const signups = (await getSignupsForAdmin()) ?? [];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-purple/70">Private</p>
          <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight">
            Signups
          </h1>
          <p className="mt-3 text-sm text-ink/70">
            {signups.length === 0
              ? "Nobody’s landed yet. Get Involved on the site writes here."
              : `${signups.length} ${signups.length === 1 ? "person" : "people"} on the list.`}
          </p>
        </div>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-full border border-purple/20 px-5 py-2.5 text-sm font-medium text-purple transition-colors hover:bg-purple/5"
          >
            Log out
          </button>
        </form>
      </div>

      <div className="mt-8 rounded-3xl border border-purple/10 bg-lavender-soft/40 p-6">
        <p className="eyebrow text-purple/70">Add a person</p>
        <AddPersonForm />
      </div>

      {signups.length === 0 ? null : (
        <div className="mt-10 overflow-x-auto rounded-3xl border border-purple/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-lavender-soft/60 text-xs font-medium uppercase tracking-widest text-ink/50">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Instagram</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Path</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {signups.map((row) => (
                <SignupRow key={row.id} signup={row} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

function SignupRow({ signup }: { signup: InvolveSignup }) {
  const extras = [
    signup.phone,
    signup.westernStudent === true
      ? "Western student"
      : signup.westernStudent === false
        ? "Not a Western student"
        : null,
    signup.interests?.map(interestLabel).join(", "),
    signup.note,
  ].filter(Boolean);

  return (
    <tr className="border-t border-purple/10 align-top">
      <td className="whitespace-nowrap px-4 py-4 text-ink/60">
        {formatWhen(signup.createdAt)}
      </td>
      <td className="px-4 py-4 font-medium">
        {signup.name}
        {signup.addedByAdmin ? (
          <span className="ml-2 rounded-full bg-purple/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-purple/70">
            Added
          </span>
        ) : null}
      </td>
      <td className="px-4 py-4">
        {signup.instagram ? (
          <a
            href={`https://www.instagram.com/${signup.instagram}/`}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-purple"
          >
            @{signup.instagram}
          </a>
        ) : (
          "—"
        )}
      </td>
      <td className="px-4 py-4">
        {signup.email ? (
          <a
            href={`mailto:${signup.email}`}
            className="underline underline-offset-2 hover:text-purple"
          >
            {signup.email}
          </a>
        ) : (
          "—"
        )}
      </td>
      <td className="px-4 py-4">{PURPOSE_LABEL[signup.purpose]}</td>
      <td className="max-w-sm px-4 py-4 text-ink/70">
        {extras.length ? extras.join(" · ") : "—"}
      </td>
    </tr>
  );
}
