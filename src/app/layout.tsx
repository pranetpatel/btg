import type { Metadata } from "next";
import { DM_Sans, Fraunces, Great_Vibes } from "next/font/google";
import "./globals.css";
import { InvolveProvider } from "@/lib/involve-context";
import { InvolveModal } from "@/components/InvolveModal";
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
  title: "Be The Good — Kindness that shows up | Western University",
  description:
    "Be The Good is a student-led nonprofit at Western University. We turn everyday kindness into real support — Be The Good Care for caregiver burnout, community food & hygiene kits, and mentorship for incoming students.",
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
          </InvolveProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
