import type { Metadata } from "next";
import Link from "next/link";
import PolicyLayout, { PolicyH2 } from "@/components/PolicyLayout";
import { contact } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "White-glove, fully insured worldwide delivery for antiques and mother-of-pearl furniture, our 14-day authentication guarantee, and how returns work.",
  alternates: { canonical: "https://theorientgates.com/shipping-returns" },
};

const LAST_UPDATED = "9 June 2026";

export default function ShippingReturnsPage() {
  return (
    <PolicyLayout eyebrow="Client Care" title="Shipping & Returns" lastUpdated={LAST_UPDATED}>
      <p>
        Every piece we send out has survived decades — often centuries — and we
        intend for it to survive the journey to you. This page explains how
        delivery works in practice and what our guarantee covers. The binding
        terms are in our{" "}
        <Link href="/terms" className="text-brass hover:underline">Terms of Sale</Link>;
        nothing here replaces them.
      </p>

      <PolicyH2>White-glove delivery, worldwide</PolicyH2>
      <p>
        We ship worldwide through specialist fine-art handlers. Each piece is
        condition-checked, photographed, and custom-packed — crated where its
        size or fragility calls for it — and travels fully insured from our
        door to yours. For larger furniture, delivery includes placement in
        the room of your choice.
      </p>
      <p>
        Shipping is either included in the sale price or quoted separately
        before you pay — never as a surprise afterwards. Because each piece is
        unique, transit times vary with the destination and the piece itself;
        we confirm a realistic timeline when we confirm your order.
      </p>

      <PolicyH2>Duties & customs</PolicyH2>
      <p>
        Import duties, VAT, or similar charges levied by the destination
        country are the buyer&rsquo;s responsibility. We prepare the customs
        documentation, including cultural-property paperwork where relevant,
        and are happy to estimate these charges before you commit.
      </p>

      <PolicyH2>On arrival</PolicyH2>
      <p>
        Please inspect the piece on delivery. In the rare event of transit
        damage, contact us within <strong>48 hours</strong> with photographs so
        we can engage the insurer immediately — every shipment is covered.
      </p>

      <PolicyH2>Our 14-day authentication guarantee</PolicyH2>
      <p>
        We stand behind every piece we sell. If, within 14 days of receipt, a
        recognised independent expert shows that a piece is materially not as
        described, we will refund you in full and arrange return shipping at
        our cost — unconditionally.
      </p>

      <PolicyH2>Returns</PolicyH2>
      <p>
        Antique pieces are one of a kind, so beyond the authentication
        guarantee and your non-waivable consumer rights, sales are final. This
        is why we document condition so thoroughly before sale — additional
        photographs, video, or an independent inspection are always available
        on request, and we would rather answer ten questions before shipment
        than one disappointment after it.
      </p>
      <p>
        Bespoke mother-of-pearl commissions are made to order and are
        non-refundable once production has begun, except where we have
        materially failed to meet the agreed specification.
      </p>

      <PolicyH2>Questions first</PolicyH2>
      <p>
        If anything about a piece, a price, or a journey is unclear, write to{" "}
        <a href={`mailto:${contact.email}`} className="text-brass hover:underline">{contact.email}</a>{" "}
        or reach us on WhatsApp via the{" "}
        <Link href="/contact" className="text-brass hover:underline">contact page</Link>.
        Every acquisition is arranged personally, and the specific terms of
        yours are confirmed in writing before payment.
      </p>
    </PolicyLayout>
  );
}
