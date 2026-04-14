"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/collection/mother-of-pearl",
    label: "Mother-of-Pearl",
    featured: true,
  },
  { href: "/collection/islamic-antiques", label: "Islamic Antiques" },
  { href: "/collection/furniture", label: "Furniture" },
  { href: "/collection/carpets-textiles", label: "Carpets & Textiles" },
  { href: "/collection/decorative-objects", label: "Decorative Objects" },
  { href: "/heritage", label: "Heritage" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/designers-collectors", label: "Designers & Collectors" },
  { href: "/contact", label: "Inquire" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-midnight/95 backdrop-blur-md border-b border-brass/10"
            : "bg-transparent"
        }`}
      >
        {/* Top bar */}
        <div className="hidden lg:flex justify-center items-center py-2 text-[10px] tracking-[0.3em] uppercase text-warm-gray border-b border-white/5">
          <span>150 Years of Heritage in Rare Antiques & Mother-of-Pearl</span>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex flex-col items-start">
                <span className="text-lg lg:text-xl tracking-[0.15em] uppercase font-serif text-ivory group-hover:text-brass transition-colors duration-500">
                  The Orient Gates
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-warm-gray mt-0.5">
                  Antiques & Mother-of-Pearl
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.slice(1, -1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                    link.featured
                      ? "text-brass hover:text-brass-light"
                      : "text-warm-gray hover:text-ivory"
                  } group`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-brass/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className="hidden lg:inline-flex text-[11px] tracking-[0.2em] uppercase text-ivory border border-brass/30 px-5 py-2.5 hover:bg-brass/10 hover:border-brass/60 transition-all duration-500"
              >
                Inquire
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden relative z-10 w-8 h-8 flex flex-col items-end justify-center gap-1.5"
                aria-label="Toggle menu"
              >
                <span
                  className={`block h-px bg-ivory transition-all duration-500 ${
                    mobileOpen ? "w-6 rotate-45 translate-y-[3.5px]" : "w-8"
                  }`}
                />
                <span
                  className={`block h-px bg-ivory transition-all duration-500 ${
                    mobileOpen ? "w-6 -rotate-45 -translate-y-[3.5px]" : "w-5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-midnight/98 backdrop-blur-xl transition-all duration-700 xl:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full px-8">
          <div className="space-y-1 text-center">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-2xl font-serif tracking-wider transition-all duration-500 ${
                  mobileOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } ${
                  link.featured ? "text-brass" : "text-ivory hover:text-brass"
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-12 flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-warm-gray">
            <span>WhatsApp</span>
            <span className="w-1 h-1 rounded-full bg-brass/40" />
            <span>Instagram</span>
          </div>
        </div>
      </div>
    </>
  );
}
