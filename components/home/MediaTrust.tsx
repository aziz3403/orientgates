"use client";

import AnimateIn from "@/components/ui/AnimateIn";

const publications = [
  "Architectural Digest",
  "Vogue Living",
  "Financial Times",
  "The Art Newspaper",
  "World of Interiors",
  "Christie's Magazine",
];

export default function MediaTrust() {
  return (
    <section className="py-12 bg-midnight border-y border-white/[0.03]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <AnimateIn>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            <span className="text-[8px] tracking-[0.35em] uppercase text-warm-gray/80 font-sans md:mr-10 whitespace-nowrap">
              As Featured In
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12">
              {publications.map((pub) => (
                <span
                  key={pub}
                  className="text-[11px] lg:text-[13px] tracking-[0.15em] uppercase text-warm-gray/70 font-serif hover:text-warm-gray/90 transition-colors duration-500 cursor-default"
                >
                  {pub}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
