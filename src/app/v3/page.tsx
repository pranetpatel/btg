import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono } from "next/font/google";
import "./v3.css";
import { CubeGallery } from "@/components/v3/CubeGallery";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dmmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Be The Good | Version C, Action Impact",
  description:
    "A student-led nonprofit at Western University. Be The Good Care for caregiver burnout, community kits, and mentorship. Scroll the cube.",
};

export default function VersionC() {
  return (
    <div className={`${bebas.variable} ${dmMono.variable}`}>
      <CubeGallery />
    </div>
  );
}
