import Link from "next/link";
import { isAdminSession } from "@/lib/signups/admin";
import { logoutAdmin } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminSession();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      {authed ? (
        <nav className="border-b border-purple/10 bg-cream px-6 py-4 md:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
              <Link
                href="/"
                className="text-purple/60 transition-colors hover:text-purple"
              >
                ← Back to homepage
              </Link>
              <span className="h-4 w-px bg-purple/15" aria-hidden />
              <Link
                href="/admin"
                className="text-ink transition-colors hover:text-purple"
              >
                Volunteers
              </Link>
              <Link
                href="/admin/events"
                className="text-ink transition-colors hover:text-purple"
              >
                Events
              </Link>
              <Link
                href="/admin/polls"
                className="text-ink transition-colors hover:text-purple"
              >
                Polls
              </Link>
            </div>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-full border border-purple/20 px-4 py-2 text-xs font-medium text-purple transition-colors hover:bg-purple/5"
              >
                Log out
              </button>
            </form>
          </div>
        </nav>
      ) : null}
      {children}
    </div>
  );
}
