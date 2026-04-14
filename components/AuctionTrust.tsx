"use client";

import AnimateIn from "@/components/ui/AnimateIn";

const auctionHouses = [
  { name: "Sotheby's", desc: "Oriental Art & Islamic World" },
  { name: "Christie's", desc: "Art of the Islamic & Indian Worlds" },
  { name: "Bonhams", desc: "Islamic & Indian Art" },
];

export default function AuctionTrust() {
  return (
    <section className="py-section bg-midnight border-y border-white/[0.04] overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center">
          {/* Left */}
          <div className="lg:col-span-5">
            <AnimateIn>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-12 h-px bg-brass/40" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-brass/60 font-sans">
                  Auction Partners
                </span>
              </div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-serif text-ivory leading-[1.05] mb-6">
                We Buy & Sell at the
                <br />
                <span className="italic text-pearl/70">World&apos;s Leading Auctions</span>
              </h2>
              <p className="text-[14px] text-warm-gray/80 leading-[1.8] font-sans">
                The Orient Gates actively participates in the world&apos;s most
                prestigious auction houses, both as buyers sourcing extraordinary
                pieces for our collection and as sellers placing important objects
                in the international market.
              </p>
            </AnimateIn>
          </div>

          {/* Right — Auction houses */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {auctionHouses.map((house, i) => (
                <AnimateIn key={house.name} delay={i * 120}>
                  <div className="p-8 border border-white/[0.06] hover:border-brass/15 transition-all duration-700 group text-center">
                    <span className="text-xl font-serif text-ivory group-hover:text-brass transition-colors duration-500">
                      {house.name}
                    </span>
                    <span className="block text-[10px] text-warm-gray/70 font-sans mt-2 tracking-wider">
                      {house.desc}
                    </span>
                  </div>
                </AnimateIn>
              ))}
            </div>

            {/* Stats */}
            <AnimateIn delay={400}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
                {[
                  { number: "200+", label: "Auction Acquisitions" },
                  { number: "50+", label: "Auction Consignments" },
                  { number: "25+", label: "Years at Auction" },
                ].map((stat) => (
                  <div key={stat.label} className="p-5 border border-white/[0.04] text-center">
                    <span className="text-2xl font-serif gold-text">{stat.number}</span>
                    <span className="block text-[9px] text-warm-gray/80 font-sans mt-1 tracking-wider uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
