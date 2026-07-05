import type { Metadata } from "next";
import CustomizeView from "./CustomizeView";

export const metadata: Metadata = {
  title: "Bespoke Mother-of-Pearl Furniture · Commission Your Own",
  description:
    "Commission a custom Levantine mother-of-pearl piece — mirrors, tables, consoles, chests, seating, and more. Configure type and finish; our master craftsmen build to your specifications.",
  alternates: { canonical: "https://theorientgates.com/customize" },
  openGraph: {
    title: "Bespoke · The Orient Gates",
    description:
      "Commission custom mother-of-pearl furniture from our family workshop — built to your specifications.",
    url: "https://theorientgates.com/customize",
    type: "website",
  },
};

export default function Page() {
  return <CustomizeView />;
}
