"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useRef, useState } from "react";

const homeCategories = [
  {
    slug: "mother-of-pearl-furniture",
    title: "Mother of Pearl Furniture",
    subtitle: "The Signature Collection",
    description: "Exquisite handcrafted furniture adorned with intricate mother-of-pearl inlay — the signature of The Orient Gates.",
    image: "/images/cat-mop.jpg",
    accent: "from-amber-900/40 to-yellow-900/20",
    featured: true,
    href: "/mother-of-pearl-furniture",
  },
  {
    slug: "islamic-antiques",
    title: "Islamic Antiques",
    subtitle: "Sacred Heritage",
    description: "Calligraphy, metalwork, ceramics from the great Islamic civilizations spanning over a millennium.",
    image: "/images/cat-islamic.jpg",
    accent: "from-emerald-900/30 to-teal-900/20",
    href: "/antiques/islamic-antiques",
  },
  {
    slug: "european-antiques",
    title: "European Antiques",
    subtitle: "Continental Grandeur",
    description: "Fine furniture, decorative arts, and collector pieces from the Renaissance through Art Deco.",
    image: "/images/cat-european.jpg",
    accent: "from-blue-900/30 to-slate-900/20",
    href: "/antiques/european-antiques",
  },
  {
    slug: "carpets-textiles",
    title: "Carpets & Textiles",
    subtitle: "Woven Heritage",
    description: "Handwoven carpets, silk textiles, and embroidered works from Persia and the Ottoman Empire.",
    image: "/images/cat-carpets.jpg",
    accent: "from-red-900/30 to-rose-900/20",
    href: "/carpets-textiles",
  },
  {
    slug: "asian-antiques",
    title: "Asian Antiques",
    subtitle: "Eastern Mastery",
    description: "Porcelain, jade, lacquerwork, and decorative arts from China, Japan, and Southeast Asia.",
    image: "/images/cat-asian.jpg",
    accent: "from-red-900/25 to-orange-900/15",
    href: "/antiques/asian-antiques",
  },
];

function CategoryCard({ category, index }: { category: typeof homeCategories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  const isHero = category.featured;

  return (
    <AnimateIn delay={200 + index * 120} className={isHero ? "lg:col-span-2 lg:row-span-2" : ""}>
      <Link href={category.href}>
        <div
          ref={cardRef}
          className={`group relative overflow-hidden cursor-pointer border border-white/[0.04] hover:border-brass/20 transition-all duration-700 ${
            isHero ? "h-[500px] lg:h-full min-h-[500px] lg:min-h-[700px]" : "h-[350px] lg:h-[400px]"
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={handleMouseMove}
        >
          <div
            className="absolute inset-0 transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: hovered ? `scale(1.12) translate(${(mousePos.x - 0.5) * -12}px, ${(mousePos.y - 0.5) * -12}px)` : "scale(1.02)",
            }}
          >
            <LuxuryImage src={category.image} alt={category.title} width={isHero ? 1200 : 800} height={isHero ? 900 : 600} className="w-full h-full" label={category.title} />
          </div>

          <div className={`absolute inset-0 bg-gradient-to-t ${category.accent} opacity-40 mix-blend-multiply`} />
          <div className={`absolute inset-0 transition-all duration-700 ${hovered ? "bg-gradient-to-t from-midnight/95 via-midnight/50 to-midnight/10" : "bg-gradient-to-t from-midnight/80 via-midnight/20 to-transparent"}`} />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(500px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(232,224,212,0.06), transparent 50%)` }}
          />

          <div className="absolute top-6 left-8 lg:top-8 lg:left-10">
            <span className={`text-[80px] lg:text-[100px] font-serif leading-none transition-all duration-700 ${hovered ? "gold-text opacity-20" : "text-white/[0.04]"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
            <div className={`flex items-center gap-3 mb-3 transition-all duration-500 ${hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-70"}`}>
              <div className={`h-px bg-brass transition-all duration-700 ${hovered ? "w-10" : "w-6"}`} />
              <span className="text-[9px] tracking-[0.4em] uppercase text-brass font-sans">{category.subtitle}</span>
            </div>

            <h3 className={`font-serif text-ivory transition-all duration-500 group-hover:-translate-y-1 ${isHero ? "text-3xl lg:text-5xl" : "text-2xl lg:text-3xl"}`}>
              {category.title}
            </h3>

            <div className={`overflow-hidden transition-all duration-700 ${hovered ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}>
              <p className={`text-[13px] text-pearl/75 leading-relaxed ${isHero ? "max-w-md" : "max-w-sm"}`}>{category.description}</p>
              <div className="flex items-center gap-2 mt-5">
                <span className="text-[10px] tracking-[0.3em] uppercase text-brass font-sans">Explore Collection</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#b8972f" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`absolute top-6 right-6 transition-all duration-700 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <div className="w-8 h-8 border-t border-r border-brass/25" />
          </div>
        </div>
      </Link>
    </AnimateIn>
  );
}

export default function FeaturedCategories() {
  return (
    <section className="relative py-section bg-midnight overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
        <div className="mb-20 lg:mb-28">
          <AnimateIn>
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-px bg-brass/40" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-brass/70 font-sans">The Collection</span>
            </div>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h2 className="text-[clamp(2.5rem,5vw,5.5rem)] font-serif text-ivory leading-[1.05] tracking-[-0.02em]">
              Five Curated<br /><span className="italic text-pearl/70">Worlds of Beauty</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p className="text-[14px] text-warm-gray/60 max-w-lg mt-8 leading-[1.9] font-sans">
              Each collection represents a distinct tradition of artistry — from the luminous inlay of Damascus to the scholarly beauty of Islamic calligraphy.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 auto-rows-auto">
          {homeCategories.map((cat, i) => (
            <CategoryCard key={cat.slug} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
