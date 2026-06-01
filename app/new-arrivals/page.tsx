import type { Metadata } from "next";
import NewArrivalsView from "./NewArrivalsView";

export const metadata: Metadata = {
  title: "New Arrivals · Recently Acquired Pieces",
  description:
    "The latest additions to our collection of rare antiques and Damascene mother-of-pearl furniture — freshly sourced pieces available for acquisition or private inquiry.",
  alternates: { canonical: "https://theorientgates.com/new-arrivals" },
  openGraph: {
    title: "New Arrivals · The Orient Gates",
    description:
      "Recently acquired antiques and mother-of-pearl pieces. Available for private viewing.",
    url: "https://theorientgates.com/new-arrivals",
    type: "website",
  },
};

export default function Page() {
  return <NewArrivalsView />;
}
