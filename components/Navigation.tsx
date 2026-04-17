"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "Mother of Pearl",
    href: "/mother-of-pearl-furniture",
    featured: true,
    children: [
      { href: "/mother-of-pearl-furniture/mop-mirrors", label: "Mirrors & Wall Decor" },
      { href: "/mother-of-pearl-furniture/mop-tables", label: "Tables" },
      { href: "/mother-of-pearl-furniture/mop-consoles-cabinets", label: "Consoles & Cabinets" },
      { href: "/mother-of-pearl-furniture/mop-game-tables", label: "Game Tables" },
    ],
  },
  {
    label: "Antiques",
    href: "/antiques",
    children: [
      { href: "/antiques/islamic-antiques", label: "Islamic Antiques" },
      { href: "/antiques/european-antiques", label: "European Antiques" },
      { href: "/antiques/asian-antiques", label: "Asian Antiques" },
      { href: "/carpets-textiles", label: "Carpets & Textiles" },
    ],
  },
  { href: "/new-arrivals", label: "New Arrivals" },
  {
    label: "The House",
    href: "/heritage",
    children: [
      { href: "/heritage", label: "Our Heritage" },
      { href: "/craftsmanship", label: "Craftsmanship" },
      { href: "/designers-collectors", label: "For Designers" },
    ],
  },
  { href: "/customize", label: "Bespoke" },
  { href: "/contact", label: "Inquire" },
];

function DropdownMenu({
  item,
  isOpen,
  onClose,
}: {
  item: (typeof navLinks)[0];
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!("children" in item) || !item.children) return null;

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-500 ${
        isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="bg-midnight/98 backdrop-blur-xl border border-white/[0.06] min-w-[240px] py-3">
        {/* Parent link */}
        <Link
          href={item.href!}
          onClick={onClose}
          className="block px-7 py-2.5 text-[10px] tracking-[0.35em] uppercase text-brass/60 hover:text-brass transition-colors font-sans border-b border-white/[0.04] mb-1"
        >
          View All {item.label}
        </Link>
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            onClick={onClose}
            className="block px-7 py-2.5 text-[12px] text-ivory/60 hover:text-ivory hover:bg-white/[0.02] transition-all duration-300 font-sans"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleDropdownEnter = (label: string) => {
    clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  // Filter nav items for desktop (exclude Home and Inquire from main nav)
  const desktopNav = navLinks.filter(
    (l) => l.label !== "Home" && l.label !== "Inquire"
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-midnight/97 backdrop-blur-xl border-b border-brass/[0.07]"
            : "bg-gradient-to-b from-midnight/80 to-transparent"
        }`}
      >
        {/* Announcement bar */}
        <div
          className={`hidden lg:flex justify-center items-center text-[8px] tracking-[0.35em] uppercase text-warm-gray/80 border-b border-white/[0.03] overflow-hidden transition-all duration-700 font-sans ${
            scrolled ? "h-0 opacity-0" : "h-7 opacity-100"
          }`}
        >
          <span>Est. 1870 &mdash; Over 150 Years of Heritage in Rare Antiques & Mother-of-Pearl Artistry</span>
        </div>

        <div className="max-w-[1600px] mx-auto px-5 lg:px-12">
          <div
            className={`flex items-center justify-between transition-all duration-700 ${
              scrolled ? "h-16" : "h-20 lg:h-[88px]"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              <Logo
                size={scrolled ? 36 : 40}
                className="transition-all duration-700 group-hover:drop-shadow-[0_0_12px_rgba(184,151,47,0.25)]"
              />
              <div className="flex flex-col">
                <span className="text-[14px] lg:text-[15px] tracking-[0.2em] uppercase font-serif text-ivory group-hover:text-brass transition-colors duration-500">
                  The Orient Gates
                </span>
                <span className="text-[7px] tracking-[0.45em] uppercase text-warm-gray/55 mt-px font-sans">
                  Rare Antiques &bull; Mother-of-Pearl
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-0.5">
              {desktopNav.map((item) => {
                const hasChildren = "children" in item && item.children;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
                    onMouseLeave={() => hasChildren && handleDropdownLeave()}
                  >
                    <Link
                      href={item.href!}
                      className={`relative px-2.5 2xl:px-3.5 py-2 text-[10px] tracking-[0.18em] uppercase transition-all duration-500 group inline-flex items-center gap-1 font-sans ${
                        item.featured
                          ? "text-brass/90 hover:text-brass"
                          : "text-warm-gray/80 hover:text-ivory/90"
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                          className={`transition-transform duration-300 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        >
                          <path d="M2 3l2 2 2-2" stroke="currentColor" strokeWidth="0.8" />
                        </svg>
                      )}
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-px bg-gradient-to-r from-transparent via-brass/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                    </Link>
                    {hasChildren && (
                      <DropdownMenu
                        item={item}
                        isOpen={activeDropdown === item.label}
                        onClose={() => setActiveDropdown(null)}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right side: Cart + Inquire + Mobile toggle */}
            <div className="flex items-center gap-4">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative text-ivory/60 hover:text-ivory transition-colors p-2 hidden sm:block"
                aria-label="Wishlist"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brass text-midnight text-[8px] font-sans font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-ivory/60 hover:text-ivory transition-colors p-2"
                aria-label="Cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brass text-midnight text-[8px] font-sans font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Inquire */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-brass/80 border border-brass/20 px-5 py-2 hover:bg-brass/[0.06] hover:border-brass/40 transition-all duration-500 font-sans"
              >
                Inquire
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
                aria-label="Toggle menu"
              >
                <span
                  className={`block h-px bg-ivory transition-all duration-500 origin-center ${
                    mobileOpen ? "w-5 rotate-45 translate-y-[3px]" : "w-7"
                  }`}
                />
                <span
                  className={`block h-px bg-ivory transition-all duration-500 origin-center ${
                    mobileOpen ? "w-5 -rotate-45 -translate-y-[3px]" : "w-4"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 xl:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-midnight/[0.99] backdrop-blur-2xl" />

        <div className="relative h-full overflow-y-auto pt-24 pb-12 px-8">
          {/* Logo */}
          <div
            className={`flex justify-center mb-10 transition-all duration-700 ${
              mobileOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ transitionDelay: mobileOpen ? "100ms" : "0ms" }}
          >
            <Logo size={48} />
          </div>

          {/* Links */}
          <div className="max-w-sm mx-auto space-y-0.5">
            {navLinks.map((item, i) => {
              const hasChildren = "children" in item && item.children;
              const isExpanded = expandedMobile === item.label;

              return (
                <div
                  key={item.label}
                  className={`transition-all duration-500 ${
                    mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: mobileOpen ? `${150 + i * 40}ms` : "0ms" }}
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href!}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-xl font-serif tracking-wider ${
                        item.featured ? "text-brass" : "text-ivory/80 hover:text-brass"
                      } transition-colors`}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() =>
                          setExpandedMobile(isExpanded ? null : item.label)
                        }
                        className="p-2 text-warm-gray/55"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        >
                          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Sub-links */}
                  {hasChildren && (
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-6 pb-2 space-y-0.5 border-l border-brass/10">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-[15px] text-ivory/75 hover:text-brass transition-colors font-sans"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom social */}
          <div
            className={`mt-14 text-center transition-all duration-700 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: mobileOpen ? "700ms" : "0ms" }}
          >
            <div className="w-12 h-px bg-brass/20 mx-auto mb-6" />
            <div className="flex items-center justify-center gap-8 text-[9px] tracking-[0.3em] uppercase text-warm-gray/80 font-sans">
              <span className="hover:text-brass transition-colors cursor-pointer">WhatsApp</span>
              <span className="hover:text-brass transition-colors cursor-pointer">Instagram</span>
              <span className="hover:text-brass transition-colors cursor-pointer">Email</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
