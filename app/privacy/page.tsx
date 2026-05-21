import type { Metadata } from "next";
import PolicyLayout, { PolicyH2 } from "@/components/PolicyLayout";
import { contact, locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Orient Gates collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "21 May 2026";

export default function PrivacyPage() {
  return (
    <PolicyLayout eyebrow="Legal" title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        The Orient Gates (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This Privacy
        Policy explains what personal information we collect when you visit
        theorientgates.com, why we collect it, how we use it, and the rights you
        have over it. We have operations in {locations.map((l) => l.city).join(", ")}, and we make
        a good-faith effort to align with GDPR, CCPA, and similar privacy
        frameworks regardless of where you are based.
      </p>

      <PolicyH2>1. Who we are</PolicyH2>
      <p>
        The Orient Gates is a family practice operated by the Harb family,
        trading in rare antiques and handcrafted mother-of-pearl furniture.
        For any privacy question, the data controller can be reached at{" "}
        <a href={`mailto:${contact.email}`} className="text-brass hover:underline">
          {contact.email}
        </a>.
      </p>

      <PolicyH2>2. Information we collect</PolicyH2>
      <p>We collect the minimum information needed to respond to your inquiries and to operate the site:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong className="text-ivory/85">Contact form data:</strong> name,
          email, phone (optional), country, inquiry details, and any other
          information you choose to share. We collect this only when you submit
          the form on <em>/contact</em>.
        </li>
        <li>
          <strong className="text-ivory/85">Cart and wishlist:</strong> the
          product IDs you save or add to cart are stored in your browser&apos;s
          localStorage. They never leave your device unless you contact us
          about a specific piece.
        </li>
        <li>
          <strong className="text-ivory/85">Server logs:</strong> like every
          website, our hosting provider records IP address, browser type, and
          request URLs for security and debugging. These logs are retained for
          a limited period and not used to profile visitors.
        </li>
        <li>
          <strong className="text-ivory/85">Admin sessions:</strong> if you log
          into the administration panel, a signed session cookie is set. This
          applies only to authorised staff and is not visible to public visitors.
        </li>
      </ul>
      <p>
        We do not currently use third-party tracking, analytics, or advertising
        cookies on the public-facing site. If that changes, this policy will
        be updated and a cookie banner will appear.
      </p>

      <PolicyH2>3. How we use your information</PolicyH2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To respond to inquiries you initiate.</li>
        <li>To arrange private viewings, shipping, and authentication of pieces.</li>
        <li>To keep records of communications, transactions, and provenance.</li>
        <li>To prevent fraud and secure the site.</li>
      </ul>
      <p>
        We do not sell your personal information. We do not use it to send
        marketing communications you have not requested.
      </p>

      <PolicyH2>4. Where your data lives</PolicyH2>
      <p>
        Our website is hosted by Vercel Inc. (United States). Our product
        catalogue and any structured data are stored in a database operated by
        Supabase Inc. (United States). Submitted inquiries are received by us
        via email and stored in our own correspondence systems.
      </p>

      <PolicyH2>5. Your rights</PolicyH2>
      <p>
        Subject to applicable law, you may:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Request a copy of the personal information we hold about you.</li>
        <li>Ask us to correct or update inaccurate information.</li>
        <li>Ask us to delete your personal information.</li>
        <li>Object to or restrict certain uses of your information.</li>
        <li>Withdraw consent at any time (where processing is based on consent).</li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href={`mailto:${contact.email}`} className="text-brass hover:underline">
          {contact.email}
        </a>. We will respond within 30 days.
      </p>

      <PolicyH2>6. Data retention</PolicyH2>
      <p>
        Inquiry correspondence is kept for as long as is reasonably necessary
        to respond to you and to maintain a record of the relationship —
        typically up to seven years for purchase-related records, in line with
        common commercial and tax obligations. Server logs are kept for a much
        shorter period (typically 30–90 days).
      </p>

      <PolicyH2>7. Children</PolicyH2>
      <p>
        Our site is not directed to children under 16. We do not knowingly
        collect personal information from children.
      </p>

      <PolicyH2>8. Changes to this policy</PolicyH2>
      <p>
        We may update this Privacy Policy from time to time. The &ldquo;Last
        updated&rdquo; date at the top of this page reflects the most recent revision.
        Material changes will be highlighted at the top of the page for at
        least 30 days after publication.
      </p>

      <PolicyH2>9. Contact</PolicyH2>
      <p>
        For any privacy question or to exercise any right described above,
        contact us at{" "}
        <a href={`mailto:${contact.email}`} className="text-brass hover:underline">
          {contact.email}
        </a>.
      </p>
    </PolicyLayout>
  );
}
