import type { Metadata } from "next";
import MopView from "./MopView";

export const metadata: Metadata = {
  title: "Mother of Pearl Furniture · Levantine Inlaid Pieces",
  description:
    "Handcrafted Levantine mother-of-pearl furniture — mirrors, tables, consoles, cabinets, chests, seating, and game tables. Walnut, shell, and silver-wire inlay, made entirely by hand in the family workshop.",
  alternates: { canonical: "https://theorientgates.com/mother-of-pearl-furniture" },
  openGraph: {
    title: "Mother of Pearl Furniture · The Orient Gates",
    description:
      "Levantine mother-of-pearl furniture: mirrors, tables, consoles, cabinets, chests, seating, and game tables.",
    url: "https://theorientgates.com/mother-of-pearl-furniture",
    type: "website",
  },
};

export default function Page() {
  return <MopView />;
}
