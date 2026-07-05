import type { Metadata } from "next";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  title: "Contact · Private Inquiry & Viewings",
  description:
    "Request a private viewing, custom commission, or expert appraisal. By appointment in Beirut, Rome, and Brooklyn. Email info@theorientgates.com.",
  alternates: { canonical: "https://theorientgates.com/contact" },
  openGraph: {
    title: "Contact · The Orient Gates",
    description:
      "Private inquiries, viewings, and commissions. Three cities, by appointment.",
    url: "https://theorientgates.com/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactView />;
}
