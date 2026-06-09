import type { Metadata } from "next";
import Link from "next/link";
import PolicyLayout, { PolicyH2 } from "@/components/PolicyLayout";
import { contact, locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about authenticity, provenance, private viewings, worldwide shipping, bespoke mother-of-pearl commissions, and how buying from The Orient Gates works.",
  alternates: { canonical: "https://theorientgates.com/faq" },
};

const LAST_UPDATED = "9 June 2026";

// Plain-text mirror of the page content for the FAQPage rich-result schema.
const faqs: { q: string; a: string }[] = [
  {
    q: "Are your pieces authentic?",
    a: "Yes. Every antique is vetted by the family before it is offered, with our scholarly opinion on age, origin, and condition set out in writing. We back this with a 14-day authentication guarantee: if an independent expert shows a piece is materially not as described, you receive a full refund and we pay the return shipping.",
  },
  {
    q: "Can I see a piece before buying?",
    a: "Yes — we are by appointment in Damascus, Beirut, Rome, and Brooklyn, and we are happy to arrange a private viewing, a live video walkthrough, or additional photographs and condition details of any piece.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship worldwide through specialist fine-art handlers. Every piece travels fully insured, custom-packed or crated, with white-glove delivery to the room of your choice for larger furniture. Shipping is quoted before you pay.",
  },
  {
    q: "How do payments work?",
    a: "Smaller purchasable pieces can be paid by card directly on the site. For significant antiques and commissions we agree terms in writing first — typically a 30–50% deposit with the balance before shipment — by bank transfer, secured card, or escrow.",
  },
  {
    q: "Can you make a custom mother-of-pearl piece?",
    a: "Yes. Bespoke commissions — from a single mirror to a complete interior — are made to order in our own workshop, continuing four generations of Damascene craft. Share your vision through the customization page and we will respond with options, timeline, and a quotation.",
  },
  {
    q: "What is your return policy?",
    a: "Beyond the 14-day authentication guarantee and your statutory rights, sales of unique antique pieces are final, which is why we document condition thoroughly and encourage every question before shipment. Bespoke commissions are non-refundable once production begins, unless we have failed to meet the agreed specification.",
  },
  {
    q: "Where does your collection come from?",
    a: "The Harb family has collected and crafted in Damascus since the era of Abou Sobhi Al-Tinawi. Pieces come from the family's own holdings, long-standing relationships with collectors, and estates across the Levant and Europe, with provenance shared wherever it is known.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PolicyLayout
        eyebrow="Client Care"
        title="Frequently Asked Questions"
        lastUpdated={LAST_UPDATED}
      >
        <p>
          The questions collectors and designers ask us most. For anything not
          covered here, write to{" "}
          <a href={`mailto:${contact.email}`} className="text-brass hover:underline">{contact.email}</a>{" "}
          or reach us on WhatsApp in {locations.map((l) => l.city).join(", ")} —
          a member of the family answers every message.
        </p>

        {faqs.map((f) => (
          <div key={f.q}>
            <PolicyH2>{f.q}</PolicyH2>
            <p>{f.a}</p>
          </div>
        ))}

        <p>
          See also{" "}
          <Link href="/shipping-returns" className="text-brass hover:underline">
            Shipping &amp; Returns
          </Link>{" "}
          and the full{" "}
          <Link href="/terms" className="text-brass hover:underline">Terms of Sale</Link>.
        </p>
      </PolicyLayout>
    </>
  );
}
