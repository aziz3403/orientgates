import type { Metadata } from "next";
import MopView from "./MopView";

export const metadata: Metadata = {
  title: "Mother of Pearl Furniture · Damascene Inlaid Pieces",
  description:
    "Handcrafted Damascene mother-of-pearl furniture — mirrors, tables, consoles, cabinets, chests, seating, and game tables. Walnut, shell, and silver-wire inlay, made by hand in our Damascus workshop.",
  alternates: { canonical: "https://theorientgates.com/mother-of-pearl-furniture" },
  openGraph: {
    title: "Mother of Pearl Furniture · The Orient Gates",
    description:
      "Damascene mother-of-pearl furniture: mirrors, tables, consoles, cabinets, chests, seating, and game tables.",
    url: "https://theorientgates.com/mother-of-pearl-furniture",
    type: "website",
  },
};

export default function Page() {
  return <MopView />;
}
