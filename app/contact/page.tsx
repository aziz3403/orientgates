import type { Metadata } from "next";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  title: "Contact · Private Inquiry & Viewings",
  description:
    "Request a private viewing, custom commission, or expert appraisal. By appointment in Damascus, Beirut, Rome, and Brooklyn. Email info@theorientgates.com.",
  alternates: { canonical: "https://theorientgates.com/contact" },
  openGraph: {
    title: "Contact · The Orient Gates",
    description:
      "Private inquiries, viewings, and commissions. Four cities, by appointment.",
    url: "https://theorientgates.com/contact",
    type: "website",
  },
};

export default function Page({
  searchParams,
}: {
  searchParams?: { piece?: string | string[] };
}) {
  // Checkout's "Continue to Private Inquiry" links here with ?piece=… so the
  // form arrives pre-filled with what the visitor was looking at.
  const piece = typeof searchParams?.piece === "string" ? searchParams.piece : "";
  return <ContactView initialPiece={piece} />;
}
