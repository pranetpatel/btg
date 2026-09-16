import type { Metadata } from "next";
import { DM_Sans, Fraunces, Great_Vibes } from "next/font/google";
import "./globals.css";
import { InvolveProvider } from "@/lib/involve-context";
import { InvolveModal } from "@/components/InvolveModal";
import { InvolveAutoOpen } from "@/components/InvolveAutoOpen";
import { MotionProvider } from "@/components/MotionProvider";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-next",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif-next",
  style: ["normal", "italic"],
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Be The Good | Kindness that shows up, Western University",
  description:
    "A student-led nonprofit at Western University. Be The Good Care for caregiver burnout, community food and hygiene kits, and mentorship for new students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${sans.variable} ${serif.variable} ${script.variable}`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        <MotionProvider>
          <InvolveProvider>
            {children}
            <InvolveModal />
            <InvolveAutoOpen />
          </InvolveProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
