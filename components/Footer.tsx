import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  Collections: [
    { href: "/antiques", label: "Antiques" },
    { href: "/carpets-textiles", label: "Carpets & Textiles" },
    { href: "/mother-of-pearl-furniture", label: "Mother of Pearl Furniture" },
    { href: "/new-arrivals", label: "New Arrivals" },
  ],
  "Mother of Pearl": [
    { href: "/mother-of-pearl-furniture/mop-mirrors", label: "Mirrors & Wall Decor" },
    { href: "/mother-of-pearl-furniture/mop-tables", label: "Tables" },
    { href: "/mother-of-pearl-furniture/mop-consoles-cabinets", label: "Consoles & Cabinets" },
    { href: "/mother-of-pearl-furniture/mop-game-tables", label: "Game Tables" },
  ],
  "The House": [
    { href: "/heritage", label: "Heritage" },
    { href: "/craftsmanship", label: "Craftsmanship" },
    { href: "/designers-collectors", label: "Designers & Collectors" },
    { href: "/contact", label: "Inquire" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-midnight">
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-8">
                <Logo size={36} />
                <div>
                  <h3 className="text-[15px] tracking-[0.2em] uppercase font-serif text-ivory">The Orient Gates</h3>
                  <p className="text-[8px] tracking-[0.4em] uppercase text-warm-gray/80 mt-px font-sans">Rare Antiques &bull; Mother-of-Pearl</p>
                </div>
              </div>
              <p className="text-[13px] text-warm-gray/70 leading-[1.8] max-w-sm font-sans">
                A family legacy of over 150 years in rare antiques and handcrafted mother-of-pearl furniture. Serving collectors, designers, and connoisseurs worldwide.
              </p>
              <div className="flex gap-8 mt-10">
                {["Instagram", "WhatsApp"].map((s) => (
                  <span key={s} className="text-[9px] tracking-[0.3em] uppercase text-warm-gray/80 hover:text-brass transition-colors duration-500 cursor-pointer font-sans">{s}</span>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="lg:col-span-2">
                <h4 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-7 font-sans">{title}</h4>
                <ul className="space-y-3.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[13px] text-warm-gray/70 hover:text-ivory transition-colors duration-500 font-sans">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-2">
              <h4 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-7 font-sans">Visit</h4>
              <div className="text-[13px] text-warm-gray/70 space-y-1.5 leading-relaxed font-sans">
                <p>By Appointment Only</p>
                <p className="mt-4 text-ivory/60">inquiries@theorientgates.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.03] py-6 px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[9px] tracking-[0.2em] text-warm-gray/65 font-sans">&copy; {new Date().getFullYear()} The Orient Gates. All rights reserved.</p>
          <div className="flex gap-8 text-[9px] tracking-[0.2em] text-warm-gray/65 font-sans">
            <span className="hover:text-warm-gray/80 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-warm-gray/80 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
