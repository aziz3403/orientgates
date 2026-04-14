"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";

const services = [
  {
    title: "Private Collection Advisory",
    description: "Work directly with our specialists to build or expand a collection of distinction. We offer authentication, valuation guidance, and strategic acquisition advice across all our categories.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="20" cy="20" r="18" />
        <path d="M20 10v10l6 4" />
        <path d="M14 26l6-6 6 6" />
      </svg>
    ),
  },
  {
    title: "Bespoke Sourcing",
    description: "Looking for a specific piece or a particular type of object? Our network spans the world&apos;s leading auction houses, private collections, and estate sales. We source the extraordinary.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="18" cy="18" r="12" />
        <path d="M26 26l10 10" />
      </svg>
    ),
  },
  {
    title: "Interior Design Partnerships",
    description: "We collaborate with interior designers and architects to source statement antiques and mother-of-pearl furniture for luxury residential, hospitality, and commercial projects worldwide.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="6" y="10" width="28" height="22" rx="1" />
        <path d="M6 18h28M16 10v22" />
      </svg>
    ),
  },
  {
    title: "Gallery & Institutional Services",
    description: "We work with galleries, museums, and cultural institutions to supply exhibition pieces, provide scholarly expertise, and facilitate acquisitions for permanent collections.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M4 36h32M8 36V18M32 36V18M20 6l16 12H4z" />
        <rect x="16" y="24" width="8" height="12" />
      </svg>
    ),
  },
  {
    title: "Hospitality & Luxury Projects",
    description: "From boutique hotels to private yachts, we supply extraordinary decorative objects and furniture that elevate luxury spaces with authentic historical character and artistry.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M20 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
        <rect x="8" y="22" width="24" height="14" rx="1" />
      </svg>
    ),
  },
  {
    title: "White-Glove Delivery",
    description: "Specialist fine art packing, shipping, and installation by experienced handlers. We deliver worldwide with full insurance and customs handling for complete peace of mind.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="4" y="14" width="24" height="16" rx="1" />
        <path d="M28 20h8v10h-8M32 14v6M32 30a3 3 0 100M12 30a3 3 0 100" />
      </svg>
    ),
  },
];

export default function DesignersCollectorsPage() {
  const { ref, position } = useMousePosition();

  return (
    <>
      {/* Hero */}
      <section
        ref={ref}
        className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{
            transform: `scale(1.05) translate(${(position.x - 0.5) * -8}px, ${(position.y - 0.5) * -8}px)`,
          }}
        >
          <LuxuryImage
            src="/images/designers-hero.jpg"
            alt="Luxury interior with antiques"
            width={1920}
            height={1080}
            className="w-full h-full"
            label="For Designers & Collectors"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/30" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-brass" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">Professional Services</span>
          </div>
          <h1 className="text-display font-serif text-ivory mb-6">
            For Designers<br />& Collectors
          </h1>
          <p className="text-lg text-pearl/70 max-w-xl leading-relaxed">
            A dedicated partnership for those who seek the extraordinary —
            from private collectors to the world&apos;s finest interior designers.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimateIn>
              <h2 className="text-display font-serif text-ivory mb-8">
                Your Partner in
                <br />
                <span className="italic text-pearl/80">Extraordinary Acquisitions</span>
              </h2>
              <p className="text-warm-gray leading-relaxed mb-6">
                Whether you are building a world-class collection, sourcing a
                centrepiece for a landmark project, or seeking a single object of
                exceptional beauty — The Orient Gates offers a level of expertise,
                access, and personal service that only 150 years of experience can
                provide.
              </p>
              <p className="text-warm-gray leading-relaxed">
                We understand that at this level, trust is everything. Our clients
                return to us because we combine deep knowledge with absolute
                discretion, and because we share their passion for objects that
                transcend the ordinary.
              </p>
            </AnimateIn>

            <AnimateIn direction="right">
              <div className="aspect-[4/5] overflow-hidden luxury-border">
                <LuxuryImage
                  src="/images/designers-interior.jpg"
                  alt="Luxury interior"
                  width={800}
                  height={1000}
                  className="w-full h-full"
                  label="Luxury Interior"
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-section bg-charcoal">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimateIn className="text-center mb-20">
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
              Our Services
            </span>
            <h2 className="text-display font-serif text-ivory mt-4">
              How We Serve You
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimateIn key={service.title} delay={i * 100}>
                <div className="p-10 luxury-border luxury-border-hover group hover:bg-midnight transition-colors duration-700 h-full">
                  <div className="text-brass mb-6 transition-transform duration-500 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-serif text-ivory mb-4 group-hover:text-brass transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Trust */}
      <section className="py-section bg-midnight">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <AnimateIn>
            <div className="luxury-divider-short mx-auto mb-10" />
            <p className="text-2xl font-serif text-ivory leading-relaxed mb-8 italic">
              &ldquo;The Orient Gates is a rare find in the antiques world — combining
              deep expertise with impeccable taste and a genuine passion for the
              objects they deal in. An invaluable resource for any serious
              collector.&rdquo;
            </p>
            <p className="text-sm text-warm-gray tracking-wider uppercase">
              &mdash; A Private Collector, London
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-charcoal text-center">
        <div className="max-w-2xl mx-auto px-6">
          <AnimateIn>
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">Begin a Conversation</span>
            <h2 className="text-heading font-serif text-ivory mt-4 mb-6">
              Let Us Serve Your Vision
            </h2>
            <p className="text-warm-gray mb-10 leading-relaxed">
              Every great collection begins with a conversation. Tell us what you
              are looking for, and let our 150 years of expertise work for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-luxury-gold">
                Start a Private Inquiry
              </Link>
              <Link href="/collection/mother-of-pearl" className="btn-luxury-primary">
                Browse the Collection
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
