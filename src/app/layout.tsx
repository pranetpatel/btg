import type { Metadata } from "next";
import "./globals.css";
import { ReservationProvider } from "@/lib/reservation-context";
import { ReservationModal } from "@/components/ReservationModal";
import { MotionProvider } from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "Closer to Nature—Closer to Yourself | Capsules®",
  description:
    "Welcome to a world of wild California desert with Capsules®, where you will discover exquisite nature observing it from capsule houses, nestled in one of the most breathtaking destinations in the United States.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        <MotionProvider>
          <ReservationProvider>
            {children}
            <ReservationModal />
          </ReservationProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
