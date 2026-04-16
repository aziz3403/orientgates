"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";

const team = [
  {
    name: "The Founding Family",
    title: "Principal & Director",
    specialization: "Mother-of-Pearl Furniture, Levantine Decorative Arts",
    experience: "5th generation. Over 30 years of personal expertise in authentication, sourcing, and conservation of Damascene furniture and Islamic decorative arts.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=face",
  },
  {
    name: "Head of Antiques",
    title: "Senior Specialist",
    specialization: "Islamic Art, Ottoman Calligraphy, Mamluk Metalwork",
    experience: "Former specialist at a leading international auction house. 20+ years in Islamic art authentication. Published scholar with contributions to major exhibition catalogues.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&fit=crop&crop=face",
  },
  {
    name: "Head of European Collection",
    title: "Senior Specialist",
    specialization: "European Furniture, Decorative Arts, Grand Tour Objects",
    experience: "Trained at the Wallace Collection, London. Specialist in 17th-19th century European furniture with expertise in French ormolu and Italian giltwood.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop&crop=face",
  },
  {
    name: "Master Craftsman",
    title: "Head of Workshop",
    specialization: "Mother-of-Pearl Inlay, Conservation, Custom Commissions",
    experience: "Trained in Damascus in the traditional atelier system. 25+ years mastering the art of shell inlay, geometric pattern design, and antique furniture conservation.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&fit=crop&crop=face",
  },
];

export default function ExpertTeam() {
  return (
    <section className="py-section bg-charcoal overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
        <AnimateIn>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-px bg-brass/40" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-brass/60 font-sans">Our Specialists</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-serif text-ivory leading-[1.05] mb-4">
            Decades of Expertise
            <br />
            <span className="italic text-pearl/40">at Your Service</span>
          </h2>
          <p className="text-[14px] text-warm-gray/50 max-w-lg leading-[1.8] font-sans mb-16">
            Our team combines generations of family knowledge with formal training
            at the world&apos;s leading institutions and auction houses.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <AnimateIn key={member.name} delay={i * 100}>
              <div className="group border border-white/[0.04] hover:border-brass/15 transition-all duration-700">
                <div className="aspect-[3/4] overflow-hidden">
                  <LuxuryImage
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={533}
                    className="w-full h-full transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    label={member.name}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[15px] font-serif text-ivory mb-1">{member.name}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-brass/50 font-sans mb-3">{member.title}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-warm-gray/40 font-sans mb-4">{member.specialization}</p>
                  <p className="text-[11px] text-warm-gray/40 leading-relaxed font-sans">{member.experience}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
