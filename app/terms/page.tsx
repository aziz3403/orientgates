import type { Metadata } from "next";
import PolicyLayout, { PolicyH2 } from "@/components/PolicyLayout";
import { contact, locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Terms of Sale & Use",
  description:
    "The terms governing your use of theorientgates.com and the sale of pieces by The Orient Gates.",
};

const LAST_UPDATED = "21 May 2026";

export default function TermsPage() {
  return (
    <PolicyLayout eyebrow="Legal" title="Terms of Sale & Use" lastUpdated={LAST_UPDATED}>
      <p>
        These terms apply to your use of theorientgates.com (&ldquo;the
        Site&rdquo;) and to any purchase or commission of pieces from The
        Orient Gates (&ldquo;we,&rdquo; &ldquo;us&rdquo;). By using the Site or
        engaging us, you agree to these terms. If you do not agree, please do
        not use the Site or engage our services.
      </p>

      <PolicyH2>1. Who we are</PolicyH2>
      <p>
        The Orient Gates is a family practice operated by the Harb family,
        with operations in {locations.map((l) => l.city).join(", ")}. All
        inquiries: <a href={`mailto:${contact.email}`} className="text-brass hover:underline">{contact.email}</a>.
      </p>

      <PolicyH2>2. Our pieces</PolicyH2>
      <p>
        Most of the pieces presented on the Site are <em>antique</em> — meaning
        they have age, history, and the marks of use that come with both.
        Photographs, descriptions, and condition reports represent our
        scholarly opinion, prepared in good faith. For higher-value pieces we
        recommend a physical inspection or an independent specialist review,
        which we are happy to arrange.
      </p>
      <p>
        New pieces — bespoke mother-of-pearl furniture and other commissions —
        are clearly identified as such and are made to order in our workshop.
      </p>

      <PolicyH2>3. Pricing & availability</PolicyH2>
      <p>
        Prices are shown in US Dollars unless otherwise noted, and may be quoted
        on request in other currencies. Some pieces are listed as &ldquo;price
        on request&rdquo; or &ldquo;by inquiry&rdquo; — in those cases, please
        contact us for a tailored quotation.
      </p>
      <p>
        Listing a piece on the Site does not constitute a binding offer. We
        reserve the right to confirm availability, condition, and price at the
        time of inquiry, and to decline a sale at our discretion.
      </p>

      <PolicyH2>4. Inquiries, deposits, and payment</PolicyH2>
      <p>
        For antique pieces and bespoke commissions, we typically agree the
        terms of sale in writing first (piece, price, shipping, timeline,
        deposit, and balance). A deposit of 30%–50% is usual to reserve a
        piece or to begin a commission, with the balance due before final
        shipment. We accept bank transfer and, where applicable, secured card
        and escrow payment.
      </p>

      <PolicyH2>5. Authentication guarantee</PolicyH2>
      <p>
        We stand behind every piece we sell. If, within 14 days of receipt,
        any piece is shown by a recognised independent expert to be materially
        not as described, we will offer a full unconditional refund and arrange
        return shipping at our cost. This is in addition to any rights you may
        have under applicable consumer-protection law.
      </p>

      <PolicyH2>6. Condition</PolicyH2>
      <p>
        Antique pieces are not new and may show age-appropriate wear, prior
        restoration, or marks of use. We disclose these in writing in the
        condition report and welcome additional photographs or video on
        request. Once you have accepted a piece on the basis of its condition
        report and have taken delivery, condition-based returns are not
        accepted (save where Section&nbsp;5 applies).
      </p>

      <PolicyH2>7. Shipping & risk</PolicyH2>
      <p>
        We arrange professional, fully insured, white-glove shipping worldwide
        through specialist fine-art handlers. The cost of shipping is either
        included in the sale price or quoted separately at the time of sale.
        Risk transfers to you upon delivery to the address you nominate. Any
        damage in transit must be reported within 48 hours of delivery so we
        can engage the insurer.
      </p>

      <PolicyH2>8. Import duties & taxes</PolicyH2>
      <p>
        You are responsible for any import duties, value-added taxes, or
        similar charges levied by the destination country. We will assist with
        customs documentation, including cultural-property paperwork where
        relevant.
      </p>

      <PolicyH2>9. Returns</PolicyH2>
      <p>
        Aside from the 14-day authentication guarantee (Section&nbsp;5) and any
        non-waivable consumer rights, sales of unique antique pieces are
        final. Bespoke commissions are non-refundable once production has
        begun, except where we have materially failed to meet agreed
        specifications.
      </p>

      <PolicyH2>10. Intellectual property</PolicyH2>
      <p>
        All text, photography, design, and code on the Site are owned by The
        Orient Gates or licensed to us, and are protected by copyright and
        other intellectual-property laws. You may not reproduce, redistribute,
        or use them commercially without our written permission.
      </p>

      <PolicyH2>11. Limitation of liability</PolicyH2>
      <p>
        To the maximum extent permitted by law, our total liability arising
        out of any sale is limited to the price paid for the piece in question.
        We are not liable for indirect, incidental, or consequential losses.
      </p>

      <PolicyH2>12. Governing law</PolicyH2>
      <p>
        These terms are governed by the laws of the jurisdiction in which the
        sale is concluded, unless we agree otherwise in writing. Disputes will
        first be addressed amicably between the parties; if unresolved, they
        will be referred to a competent court or arbitration body of the
        agreed jurisdiction.
      </p>

      <PolicyH2>13. Changes</PolicyH2>
      <p>
        We may amend these terms from time to time. The version in effect at
        the date your inquiry or order is accepted governs that transaction.
      </p>

      <PolicyH2>14. Contact</PolicyH2>
      <p>
        Questions about these terms: <a href={`mailto:${contact.email}`} className="text-brass hover:underline">{contact.email}</a>.
      </p>
    </PolicyLayout>
  );
}
