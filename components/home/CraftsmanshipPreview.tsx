"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import NacreBackdrop from "@/components/ui/NacreBackdrop";

// Five hand-photographed steps of the Damascene mother-of-pearl process.
// The silver-thread step (drawing and bending fine silver wire as cell
// dividers between the shell fragments) is a hallmark of the Levantine
// tradition — sometimes called "tarsi'a" or simply "Damascene inlay" —
// and is what distinguishes our pieces from pure marquetry work.
const craftSteps = [
  {
    title: "Shell Selection",
    description:
      "Each fragment of mother-of-pearl is hand-picked from Red Sea and Persian Gulf shells. Only pieces with the deepest iridescence and uniform thickness earn a place in the pattern.",
    image: "/images/craft/01-shell-selection.jpg",
  },
  {
    title: "Hand Carving",
    description:
      "The walnut blank is carved by hand using traditional chisels — each channel etched to the precise depth of the inlay that will fill it. A single panel can take weeks of patient work.",
    image: "/images/craft/02-wood-carving.jpg",
  },
  {
    title: "Silver Threading",
    description:
      "Fine silver wire is drawn through pliers and bent by hand into the carved channels. These metallic threads frame every shell cell and catch light at angles the pearl cannot — a hallmark of the Damascene tradition.",
    image: "/images/craft/03-silver-thread.jpg",
  },
  {
    title: "Shell Inlay",
    description:
      "Each fragment is cut, fitted, and set with tweezers into its allotted cell. Thousands of pieces per panel — every contour matched to its neighbour with no margin for error.",
    image: "/images/craft/04-shell-inlay.jpg",
  },
  {
    title: "Polishing",
    description:
      "Successive stages of hand polishing — from coarse to mirror-smooth — reveal the iridescence beneath. The finished surface is alive: every shift of light brings a different colour forward.",
    image: "/images/craft/05-polishing.jpg",
  },
];

export default function CraftsmanshipPreview() {
  return (
    <section className="relative py-section bg-charcoal overflow-hidden">
      <NacreBackdrop opacity={26} />
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 lg:mb-28">
          <div className="lg:col-span-6">
            <AnimateIn>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-px bg-brass/40" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-brass/70 font-sans">
                  The Art Behind the Art
                </span>
              </div>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-serif text-ivory leading-[1.05]">
                Centuries
                <br />
                <span className="italic text-pearl/70">of Craft</span>
              </h2>
            </AnimateIn>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <AnimateIn delay={200}>
              <p className="text-[14px] text-warm-gray/80 leading-[1.9] font-sans max-w-md">
                Every piece is the result of techniques refined over centuries —
                shell, walnut, and silver brought together in five exacting
                stages, every one performed by hand.
              </p>
            </AnimateIn>
          </div>
        </div>

        {/* Craft steps — 5-column editorial process row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {craftSteps.map((step, i) => (
            <AnimateIn key={step.title} delay={200 + i * 120}>
              <div className="group relative">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden border border-white/[0.04] group-hover:border-brass/15 transition-all duration-700 mb-8">
                  <LuxuryImage
                    src={step.image}
                    alt={step.title}
                    width={600}
                    height={800}
                    className="w-full h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    label={step.title}
                  />
                  {/* Step number overlay */}
                  <div className="absolute top-5 left-5">
                    <span className="text-[52px] font-serif gold-text opacity-25 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-lg font-serif text-ivory mb-3 group-hover:text-brass transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-[13px] text-warm-gray/80 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn className="mt-20 text-center">
          <Link
            href="/craftsmanship"
            className="group inline-flex items-center gap-3 border border-ivory/15 text-ivory/70 px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans transition-all duration-500 hover:border-brass/30 hover:text-ivory"
          >
            <span>Discover the Craft</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
