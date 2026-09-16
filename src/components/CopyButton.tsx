"use client";

import { useState } from "react";

export function CopyButton({
  getText,
  label,
  className = "",
}: {
  getText: () => string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    const text = getText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can fail (permissions, non-secure context); ignore.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "rounded-full border border-purple/20 px-4 py-2 text-xs font-medium text-purple transition-colors hover:bg-purple/5"
      }
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
