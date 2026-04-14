import Link from "next/link";

const footerLinks = {
  Collection: [
    { href: "/collection/mother-of-pearl", label: "Mother-of-Pearl" },
    { href: "/collection/islamic-antiques", label: "Islamic Antiques" },
    { href: "/collection/furniture", label: "Furniture" },
    { href: "/collection/carpets-textiles", label: "Carpets & Textiles" },
    { href: "/collection/decorative-objects", label: "Decorative Objects" },
  ],
  "The House": [
    { href: "/heritage", label: "Heritage" },
    { href: "/craftsmanship", label: "Craftsmanship" },
    { href: "/designers-collectors", label: "Designers & Collectors" },
  ],
  Connect: [
    { href: "/contact", label: "Private Inquiry" },
    { href: "/contact", label: "Request Viewing" },
    { href: "/contact", label: "Sourcing & Commissions" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-midnight border-t border-white/5">
      {/* Pre-footer CTA */}
      <div className="py-section text-center px-6">
        <p className="text-[11px] tracking-[0.3em] uppercase text-brass mb-4">
          Begin Your Journey
        </p>
        <h2 className="text-heading font-serif text-ivory mb-6 max-w-2xl mx-auto">
          Discover Rare & Extraordinary Pieces
        </h2>
        <p className="text-warm-gray max-w-lg mx-auto mb-10 text-sm leading-relaxed">
          Whether you are a collector seeking a masterpiece, a designer sourcing
          for a project, or a connoisseur drawn to beauty — we welcome your
          inquiry.
        </p>
        <Link href="/contact" className="btn-luxury-primary">
          Speak With Our Team
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
          </svg>
        </Link>
      </div>

      <div className="luxury-divider" />

      {/* Main footer */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <h3 className="text-xl tracking-[0.15em] uppercase font-serif text-ivory">
                The Orient Gates
              </h3>
              <p className="text-[9px] tracking-[0.35em] uppercase text-warm-gray mt-1">
                Antiques & Mother-of-Pearl
              </p>
            </div>
            <p className="text-sm text-warm-gray leading-relaxed max-w-sm">
              A family legacy of over 150 years in rare antiques and handcrafted
              mother-of-pearl furniture. Serving collectors, designers, and
              connoisseurs worldwide.
            </p>
            <div className="flex gap-6 mt-8">
              {["Instagram", "WhatsApp"].map((social) => (
                <span
                  key={social}
                  className="text-[10px] tracking-[0.2em] uppercase text-warm-gray hover:text-brass transition-colors duration-300 cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-brass mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-warm-gray hover:text-ivory transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-brass mb-6">
              Visit
            </h4>
            <div className="text-sm text-warm-gray space-y-1 leading-relaxed">
              <p>By Appointment Only</p>
              <p className="mt-3 text-ivory">inquiries@theorientgates.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6 px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.15em] text-warm-gray/60">
            &copy; {new Date().getFullYear()} The Orient Gates. All rights
            reserved.
          </p>
          <div className="flex gap-8 text-[10px] tracking-[0.15em] text-warm-gray/60">
            <span className="hover:text-warm-gray transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-warm-gray transition-colors cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
