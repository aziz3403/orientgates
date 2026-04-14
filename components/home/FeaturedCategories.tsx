"use client";

import Link from "next/link";
import { categories } from "@/lib/data";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";
import { useRef, useState } from "react";

function CategoryCard({
  category,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const isHero = category.featured;

  return (
    <AnimateIn delay={index * 150} className={isHero ? "md:col-span-2 md:row-span-2" : ""}>
      <Link href={`/collection/${category.slug}`}>
        <div
          ref={cardRef}
          className={`group relative overflow-hidden luxury-border luxury-border-hover cursor-pointer ${
            isHero ? "h-[500px] md:h-full min-h-[600px]" : "h-[350px] md:h-[400px]"
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Image */}
          <div
            className="absolute inset-0 transition-transform duration-[1200ms] ease-out"
            style={{
              transform: hovered
                ? `scale(1.08) translate(${(mousePos.x - 0.5) * -8}px, ${(mousePos.y - 0.5) * -8}px)`
                : "scale(1)",
            }}
          >
            <LuxuryImage
              src={category.image}
              alt={category.title}
              width={isHero ? 1200 : 800}
              height={isHero ? 900 : 600}
              className="w-full h-full"
              label={category.title}
            />
          </div>

          {/* Overlays */}
          <div className={`absolute inset-0 bg-gradient-to-t ${category.accent} opacity-60`} />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/30 to-transparent" />

          {/* Pearl shimmer on hero */}
          {isHero && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(232,224,212,0.06), transparent 40%)`,
              }}
            />
          )}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
            {/* Category label */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-brass group-hover:w-12 transition-all duration-500" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-brass">
                {category.subtitle}
              </span>
            </div>

            {/* Title */}
            <h3
              className={`font-serif text-ivory mb-3 transition-transform duration-500 group-hover:-translate-y-1 ${
                isHero ? "text-3xl lg:text-4xl" : "text-2xl"
              }`}
            >
              {category.title}
            </h3>

            {/* Description - visible on hover for non-hero, always visible for hero */}
            <p
              className={`text-sm text-pearl/60 leading-relaxed transition-all duration-500 ${
                isHero
                  ? "max-w-md opacity-100"
                  : "max-w-sm opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0"
              }`}
            >
              {category.description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 mt-5 text-[11px] tracking-[0.2em] uppercase text-brass opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <span>Explore Collection</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-6 h-6 border-t border-r border-brass/30" />
          </div>
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-6 h-6 border-b border-l border-brass/30" />
          </div>
        </div>
      </Link>
    </AnimateIn>
  );
}

export default function FeaturedCategories() {
  return (
    <section className="relative py-section bg-midnight">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <AnimateIn className="text-center mb-16">
          <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
            The Collection
          </span>
          <h2 className="text-display font-serif text-ivory mt-4 mb-6">
            Curated Worlds of Beauty
          </h2>
          <p className="text-warm-gray max-w-2xl mx-auto text-sm leading-relaxed">
            Explore our carefully curated categories, each representing a
            distinct tradition of artistry and craftsmanship spanning centuries
            and civilizations.
          </p>
        </AnimateIn>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-auto">
          {categories.map((category, i) => (
            <CategoryCard key={category.slug} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
