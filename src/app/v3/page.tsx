import type { Metadata } from "next";
import "./v3.css";
import { CubeGallery } from "@/components/v3/CubeGallery";

export const metadata: Metadata = {
  title: "Be The Good | Version C, Action Impact",
  description:
    "A student-led nonprofit at Western University. Be The Good Care for caregiver burnout, community kits, and mentorship. Scroll the cube.",
};

export default function VersionC() {
  return <CubeGallery />;
}
