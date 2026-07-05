import type { Metadata } from "next";
import CraftsmanshipView from "./CraftsmanshipView";

export const metadata: Metadata = {
  title: "Craftsmanship · The Art of Damascene Mother-of-Pearl Inlay",
  description:
    "The five hand-crafted stages behind every piece — shell selection, hand carving, silver wire lining, shell inlay, and polishing. Centuries-old Damascene technique, performed entirely by hand.",
  alternates: { canonical: "https://theorientgates.com/craftsmanship" },
  openGraph: {
    title: "Craftsmanship · The Orient Gates",
    description:
      "Mother-of-pearl inlay, silver wire lining, hand carving — the Damascene tradition explained step by step.",
    url: "https://theorientgates.com/craftsmanship",
    type: "article",
  },
};

export default function Page() {
  return <CraftsmanshipView />;
}
