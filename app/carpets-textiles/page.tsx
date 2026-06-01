import type { Metadata } from "next";
import CarpetsView from "./CarpetsView";

export const metadata: Metadata = {
  title: "Carpets & Textiles · Persian, Ottoman & Silk Road",
  description:
    "Handwoven antique carpets, silk textiles, and embroidered works from Persia, the Ottoman Empire, and the Silk Road. Each piece authenticated and condition-reported.",
  alternates: { canonical: "https://theorientgates.com/carpets-textiles" },
  openGraph: {
    title: "Carpets & Textiles · The Orient Gates",
    description:
      "Persian, Ottoman, and Silk Road handwoven carpets, silk textiles, and embroidered works.",
    url: "https://theorientgates.com/carpets-textiles",
    type: "website",
  },
};

export default function Page() {
  return <CarpetsView />;
}
