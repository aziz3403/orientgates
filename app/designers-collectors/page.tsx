import type { Metadata } from "next";
import DesignersView from "./DesignersView";

export const metadata: Metadata = {
  title: "For Designers & Collectors · Private Acquisition Advisory",
  description:
    "Trusted sourcing, authentication, valuation, and white-glove delivery for interior designers, galleries, hotels, and private collectors. Four generations of Damascene expertise.",
  alternates: { canonical: "https://theorientgates.com/designers-collectors" },
  openGraph: {
    title: "For Designers & Collectors · The Orient Gates",
    description:
      "Private collection advisory, bespoke sourcing, interior design partnerships, and white-glove delivery worldwide.",
    url: "https://theorientgates.com/designers-collectors",
    type: "website",
  },
};

export default function Page() {
  return <DesignersView />;
}
