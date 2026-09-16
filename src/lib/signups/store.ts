import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { InvolveSignup, SignupStore } from "./types";

/**
 * Temporary JSON-file store. Swap `signupStore` for a Supabase adapter
 * without changing the server action or modal — keep `create` / `list`.
 */
const LOCAL_SIGNUPS_FILE = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  ".data",
  "signups.json"
);

function signupsFilePath() {
  return process.env.VERCEL ? "/tmp/btg-signups.json" : LOCAL_SIGNUPS_FILE;
}

let writeChain: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeChain.then(fn, fn);
  writeChain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

async function readAll(): Promise<InvolveSignup[]> {
  try {
    const raw = await readFile(signupsFilePath(), "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as InvolveSignup[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeAll(signups: InvolveSignup[]) {
  const file = signupsFilePath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(signups, null, 2), "utf8");
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

const fileSignupStore: SignupStore = {
  async create(input) {
    return withLock(async () => {
      const signups = await readAll();
      const existing = signups.find(
        (row) => normalizeEmail(row.email) === normalizeEmail(input.email)
      );
      if (existing) {
        return { status: "duplicate" as const, signup: existing };
      }

      const signup: InvolveSignup = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      signups.push(signup);
      await writeAll(signups);
      return { status: "created" as const, signup };
    });
  },

  async list() {
    const signups = await readAll();
    return [...signups].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
};

export const signupStore: SignupStore = fileSignupStore;
