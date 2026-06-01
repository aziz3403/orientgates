import type { Metadata } from "next";
import AntiquesView from "./AntiquesView";

export const metadata: Metadata = {
  title: "Antiques · Islamic, European & Asian Rare Pieces",
  description:
    "Rare antiques spanning Islamic, European, and Asian traditions — Mamluk metalwork, Iznik ceramics, Ottoman calligraphy, European furniture, Asian decorative arts. Each piece scholar-authenticated.",
  alternates: { canonical: "https://theorientgates.com/antiques" },
  openGraph: {
    title: "Antiques · The Orient Gates",
    description:
      "Rare Islamic, European, and Asian antiques — calligraphy, metalwork, ceramics, furniture, decorative arts.",
    url: "https://theorientgates.com/antiques",
    type: "website",
  },
};

export default function Page() {
  return <AntiquesView />;
}
