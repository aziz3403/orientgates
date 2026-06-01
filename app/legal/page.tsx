import type { Metadata } from "next";
import PolicyLayout, { PolicyH2 } from "@/components/PolicyLayout";
import { contact, locations, waLink } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Legal Notice",
  description:
    "Operator, contact, and legal information for The Orient Gates.",
};

const LAST_UPDATED = "21 May 2026";

export default function LegalPage() {
  return (
    <PolicyLayout eyebrow="Legal" title="Legal Notice" lastUpdated={LAST_UPDATED}>
      <p>
        This page identifies the operator of <em>theorientgates.com</em> and
        provides the legal contact information required for transparency and,
        where applicable, regulatory compliance (e.g. the EU Digital Services
        Act and similar disclosure regimes).
      </p>

      <PolicyH2>Legal entity</PolicyH2>
      <p>
        <strong>The Orient Gates LLC</strong>, a New York limited liability
        company. Trading as <em>The Orient Gates</em> — a family practice in
        rare antiques and handcrafted mother-of-pearl furniture, operated by
        the Harb family across four generations.
      </p>

      <PolicyH2>Operator & responsible editor</PolicyH2>
      <p>
        Aziz Harb, on behalf of The Orient Gates LLC. Editorial responsibility
        for the content of the Site rests with the operator.
      </p>

      <PolicyH2>Contact</PolicyH2>
      <p>
        General inquiries:{" "}
        <a href={`mailto:${contact.email}`} className="text-brass hover:underline">
          {contact.email}
        </a>
      </p>
      <ul className="list-none p-0 space-y-3 mt-4">
        {locations.map((loc) => (
          <li key={loc.city} className="text-[13px] text-warm-gray/80">
            <span className="text-ivory/85 font-medium">{loc.city}, {loc.country}</span>
            <span className="block text-warm-gray/60 text-[12px]">{loc.address}</span>
            <a
              href={waLink(loc.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass/80 hover:text-brass text-[12px] font-mono"
            >
              {loc.whatsappDisplay}
            </a>
          </li>
        ))}
      </ul>

      <PolicyH2>Hosting</PolicyH2>
      <p>
        Site hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA
        91723, United States. Product data stored by Supabase Inc.
      </p>

      <PolicyH2>Authorship & images</PolicyH2>
      <p>
        Unless otherwise indicated, photography, illustrations, and editorial
        text on this Site are © The Orient Gates LLC and may not be reproduced
        without written permission. Where third-party images are used, they
        appear with the consent of, or under licence from, the rights holder.
      </p>

      <PolicyH2>Sotheby&apos;s reference</PolicyH2>
      <p>
        The work <em>Antar and Abla</em> by Abou Sobhi Al-Tinawi (Muhammad
        Harb, great-grandfather of the present operator) appeared in the
        Sotheby&apos;s sale <em>A Love Letter to Beirut: Arts and Culture
        1960s–2020s</em> (2024). This reference is provided as historical
        context and does not constitute a sponsorship, endorsement, or
        partnership with Sotheby&apos;s.
      </p>

      <PolicyH2>Out-of-court dispute resolution</PolicyH2>
      <p>
        The European Commission provides an online dispute resolution platform
        at{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brass hover:underline"
        >
          ec.europa.eu/consumers/odr
        </a>
        . We are not obliged, and not willing, to participate in dispute
        resolution proceedings before a consumer arbitration body — but we are
        always happy to address any concern directly. Please write to us first.
      </p>
    </PolicyLayout>
  );
}
