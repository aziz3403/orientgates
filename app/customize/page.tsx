"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";
import Logo from "@/components/Logo";

const furnitureTypes = [
  { id: "mirror", label: "Mirror & Wall Decor", icon: "◇" },
  { id: "table", label: "Table", icon: "▭" },
  { id: "chair", label: "Chair & Seating", icon: "△" },
  { id: "console", label: "Console & Cabinet", icon: "▯" },
  { id: "chest", label: "Chest of Drawers", icon: "▤" },
  { id: "game", label: "Game Table", icon: "◈" },
  { id: "accessory", label: "Accessory", icon: "◯" },
];

const sizes = [
  { id: "small", label: "Small", desc: "Accent pieces, side tables, boxes" },
  { id: "medium", label: "Medium", desc: "Coffee tables, mirrors, chairs" },
  { id: "large", label: "Large", desc: "Dining tables, cabinets, grand mirrors" },
  { id: "custom", label: "Custom Dimensions", desc: "Specify your exact requirements" },
];

const patterns = [
  { id: "geometric-star", label: "Geometric Star", color: "from-amber-800/30 to-yellow-900/20" },
  { id: "floral-arabesque", label: "Floral Arabesque", color: "from-emerald-800/25 to-green-900/15" },
  { id: "mixed", label: "Mixed Geometric & Floral", color: "from-blue-800/20 to-indigo-900/15" },
  { id: "custom-pattern", label: "Custom Pattern", color: "from-purple-800/20 to-violet-900/15" },
];

const woods = [
  { id: "walnut", label: "Walnut", hex: "#5c3d2e", desc: "Traditional, warm, rich" },
  { id: "mahogany", label: "Mahogany", hex: "#4a1c1c", desc: "Deep, luxurious, formal" },
  { id: "oak", label: "Oak", hex: "#8b7355", desc: "Light, natural, contemporary" },
  { id: "cedar", label: "Cedar", hex: "#6b3a2a", desc: "Aromatic, durable, historic" },
];

const accents = [
  { id: "bone", label: "Bone Inlay" },
  { id: "ebony", label: "Ebony Stringing" },
  { id: "brass", label: "Brass Hardware" },
  { id: "silver", label: "Silver Wire" },
  { id: "turquoise", label: "Turquoise Stone" },
  { id: "gold-leaf", label: "Gold Leaf Detail" },
];

export default function CustomizePage() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    type: "",
    size: "",
    customDimensions: "",
    pattern: "",
    wood: "",
    accents: [] as string[],
    notes: "",
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 7;

  const toggleAccent = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      accents: prev.accents.includes(id)
        ? prev.accents.filter((a) => a !== id)
        : [...prev.accents, id],
    }));
  };

  const selectedWood = woods.find((w) => w.id === config.wood);

  if (submitted) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-6 pt-28">
        <div className="text-center max-w-md">
          <Logo size={56} className="mx-auto mb-8" />
          <h1 className="text-3xl font-serif text-ivory mb-4">Thank You</h1>
          <p className="text-[14px] text-warm-gray/80 leading-[1.8] font-sans mb-8">
            Your custom furniture inquiry has been received. Our master craftsmen
            and design team will review your specifications and contact you within
            48 hours with a detailed consultation.
          </p>
          <a href="/" className="text-brass text-sm font-sans hover:underline">Return to Homepage</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight pt-28 pb-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <AnimateIn className="text-center mb-16">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="w-12 h-px bg-brass/40" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-brass/60 font-sans">
              Bespoke Commission
            </span>
            <div className="w-12 h-px bg-brass/40" />
          </div>
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-serif text-ivory mb-4">
            Design Your Own
            <br />
            <span className="italic gold-text">Mother-of-Pearl Furniture</span>
          </h1>
          <p className="text-[14px] text-warm-gray/80 max-w-lg mx-auto leading-[1.8] font-sans">
            Our master craftsmen will bring your vision to life using centuries-old
            techniques. Configure your piece below and our team will provide a
            detailed consultation and quote.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Configurator */}
          <div className="lg:col-span-7">
            {/* Progress */}
            <div className="flex items-center gap-1 mb-12">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-0.5 transition-colors duration-500 ${
                    i + 1 <= step ? "bg-brass" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Type */}
            {step === 1 && (
              <AnimateIn>
                <h2 className="text-xl font-serif text-ivory mb-2">Choose Furniture Type</h2>
                <p className="text-[12px] text-warm-gray/70 font-sans mb-8">What would you like us to create?</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {furnitureTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => { setConfig({ ...config, type: type.id }); setStep(2); }}
                      className={`p-6 border text-left transition-all duration-500 group hover:border-brass/30 hover:bg-white/[0.02] ${
                        config.type === type.id ? "border-brass/50 bg-brass/[0.05]" : "border-white/[0.06]"
                      }`}
                    >
                      <span className="text-2xl mb-3 block opacity-40 group-hover:opacity-70 transition-opacity">{type.icon}</span>
                      <span className="text-sm font-serif text-ivory block">{type.label}</span>
                    </button>
                  ))}
                </div>
              </AnimateIn>
            )}

            {/* Step 2: Size */}
            {step === 2 && (
              <AnimateIn>
                <h2 className="text-xl font-serif text-ivory mb-2">Choose Size</h2>
                <p className="text-[12px] text-warm-gray/70 font-sans mb-8">Select the scale for your piece</p>
                <div className="space-y-3">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => { setConfig({ ...config, size: size.id }); setStep(size.id === "custom" ? 2 : 3); }}
                      className={`w-full p-5 border text-left transition-all duration-500 flex justify-between items-center hover:border-brass/30 ${
                        config.size === size.id ? "border-brass/50 bg-brass/[0.05]" : "border-white/[0.06]"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-serif text-ivory block">{size.label}</span>
                        <span className="text-[11px] text-warm-gray/70 font-sans">{size.desc}</span>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-brass/40">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </button>
                  ))}
                </div>
                {config.size === "custom" && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={config.customDimensions}
                      onChange={(e) => setConfig({ ...config, customDimensions: e.target.value })}
                      placeholder="e.g., 180cm H × 120cm W × 55cm D"
                      className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-sm font-sans focus:border-brass outline-none mb-4"
                    />
                    <button onClick={() => setStep(3)} className="text-brass text-[11px] tracking-[0.2em] uppercase font-sans">Continue &rarr;</button>
                  </div>
                )}
              </AnimateIn>
            )}

            {/* Step 3: Pattern */}
            {step === 3 && (
              <AnimateIn>
                <h2 className="text-xl font-serif text-ivory mb-2">Choose Pattern Style</h2>
                <p className="text-[12px] text-warm-gray/70 font-sans mb-8">Select the inlay pattern for your piece</p>
                <div className="grid grid-cols-2 gap-3">
                  {patterns.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => { setConfig({ ...config, pattern: pattern.id }); setStep(4); }}
                      className={`p-6 border text-left transition-all duration-500 hover:border-brass/30 relative overflow-hidden ${
                        config.pattern === pattern.id ? "border-brass/50" : "border-white/[0.06]"
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${pattern.color}`} />
                      <span className="relative text-sm font-serif text-ivory block">{pattern.label}</span>
                    </button>
                  ))}
                </div>
              </AnimateIn>
            )}

            {/* Step 4: Wood */}
            {step === 4 && (
              <AnimateIn>
                <h2 className="text-xl font-serif text-ivory mb-2">Choose Wood</h2>
                <p className="text-[12px] text-warm-gray/70 font-sans mb-8">Select the primary wood for your piece</p>
                <div className="grid grid-cols-2 gap-3">
                  {woods.map((wood) => (
                    <button
                      key={wood.id}
                      onClick={() => { setConfig({ ...config, wood: wood.id }); setStep(5); }}
                      className={`p-6 border text-left transition-all duration-500 hover:border-brass/30 flex items-center gap-4 ${
                        config.wood === wood.id ? "border-brass/50 bg-brass/[0.05]" : "border-white/[0.06]"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-sm flex-shrink-0" style={{ backgroundColor: wood.hex }} />
                      <div>
                        <span className="text-sm font-serif text-ivory block">{wood.label}</span>
                        <span className="text-[10px] text-warm-gray/70 font-sans">{wood.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </AnimateIn>
            )}

            {/* Step 5: Accents */}
            {step === 5 && (
              <AnimateIn>
                <h2 className="text-xl font-serif text-ivory mb-2">Choose Accent Materials</h2>
                <p className="text-[12px] text-warm-gray/70 font-sans mb-8">Select one or more accent materials</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  {accents.map((accent) => (
                    <button
                      key={accent.id}
                      onClick={() => toggleAccent(accent.id)}
                      className={`p-5 border text-left transition-all duration-500 hover:border-brass/30 ${
                        config.accents.includes(accent.id) ? "border-brass/50 bg-brass/[0.05]" : "border-white/[0.06]"
                      }`}
                    >
                      <span className="text-sm font-serif text-ivory">{accent.label}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(6)} className="bg-brass text-midnight px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans">
                  Continue
                </button>
              </AnimateIn>
            )}

            {/* Step 6: Notes */}
            {step === 6 && (
              <AnimateIn>
                <h2 className="text-xl font-serif text-ivory mb-2">Additional Notes</h2>
                <p className="text-[12px] text-warm-gray/70 font-sans mb-8">Any specific requests, inspirations, or requirements?</p>
                <textarea
                  value={config.notes}
                  onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                  rows={5}
                  className="w-full bg-transparent border border-white/10 p-4 text-ivory text-sm font-sans focus:border-brass outline-none resize-none mb-6"
                  placeholder="Describe your vision, reference images, specific dimensions, design preferences..."
                />
                <button onClick={() => setStep(7)} className="bg-brass text-midnight px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans">
                  Continue to Contact
                </button>
              </AnimateIn>
            )}

            {/* Step 7: Contact */}
            {step === 7 && (
              <AnimateIn>
                <h2 className="text-xl font-serif text-ivory mb-2">Your Contact Information</h2>
                <p className="text-[12px] text-warm-gray/70 font-sans mb-8">We will contact you within 48 hours with a consultation</p>
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Full Name</label>
                    <input
                      type="text" value={config.name} onChange={(e) => setConfig({ ...config, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-sm font-sans focus:border-brass outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Email</label>
                    <input
                      type="email" value={config.email} onChange={(e) => setConfig({ ...config, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-sm font-sans focus:border-brass outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Phone</label>
                    <input
                      type="tel" value={config.phone} onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-sm font-sans focus:border-brass outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setSubmitted(true)}
                  className="group relative bg-brass text-midnight px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all"
                >
                  <span className="relative z-10">Submit Custom Inquiry</span>
                  <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </button>
              </AnimateIn>
            )}

            {/* Back button */}
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="mt-6 text-[10px] tracking-[0.2em] uppercase text-warm-gray/70 hover:text-ivory transition-colors font-sans">
                &larr; Back
              </button>
            )}
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <AnimateIn delay={200}>
                <div className="border border-white/[0.06] p-8">
                  <h3 className="text-[10px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-6">Your Configuration</h3>

                  {/* Visual preview */}
                  <div
                    className="aspect-square mb-8 border border-white/[0.06] flex items-center justify-center relative overflow-hidden"
                    style={{
                      backgroundColor: selectedWood?.hex || "#1a1a1a",
                      transition: "background-color 0.8s ease",
                    }}
                  >
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: config.pattern === "geometric-star"
                          ? "repeating-linear-gradient(60deg, transparent, transparent 20px, rgba(232,224,212,0.15) 20px, rgba(232,224,212,0.15) 21px), repeating-linear-gradient(-60deg, transparent, transparent 20px, rgba(232,224,212,0.15) 20px, rgba(232,224,212,0.15) 21px)"
                          : config.pattern === "floral-arabesque"
                          ? "radial-gradient(circle at 50% 50%, rgba(232,224,212,0.12) 0%, transparent 30%), radial-gradient(circle at 0% 0%, rgba(232,224,212,0.08) 0%, transparent 40%)"
                          : config.pattern === "mixed"
                          ? "repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(232,224,212,0.1) 15px, rgba(232,224,212,0.1) 16px)"
                          : "none",
                      }}
                    />

                    {/* Shell shimmer */}
                    <div className="absolute inset-0 pearl-shimmer opacity-20" />

                    {/* Center logo */}
                    <Logo size={80} className="opacity-20" />

                    {/* Type label */}
                    {config.type && (
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <span className="text-[9px] tracking-[0.3em] uppercase text-ivory/70 font-sans">
                          {furnitureTypes.find((t) => t.id === config.type)?.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Spec summary */}
                  <div className="space-y-3">
                    {[
                      { label: "Type", value: furnitureTypes.find((t) => t.id === config.type)?.label },
                      { label: "Size", value: config.size === "custom" ? config.customDimensions || "Custom" : sizes.find((s) => s.id === config.size)?.label },
                      { label: "Pattern", value: patterns.find((p) => p.id === config.pattern)?.label },
                      { label: "Wood", value: selectedWood?.label },
                      { label: "Accents", value: config.accents.map((a) => accents.find((ac) => ac.id === a)?.label).filter(Boolean).join(", ") || undefined },
                    ].map((item) =>
                      item.value ? (
                        <div key={item.label} className="flex justify-between">
                          <span className="text-[9px] tracking-[0.2em] uppercase text-warm-gray/70 font-sans">{item.label}</span>
                          <span className="text-[12px] text-ivory/70 font-sans">{item.value}</span>
                        </div>
                      ) : null
                    )}
                  </div>

                  {!config.type && (
                    <p className="text-[12px] text-warm-gray/80 font-sans text-center mt-4 italic">
                      Begin selecting options to see your configuration
                    </p>
                  )}
                </div>

                {/* Trust note */}
                <div className="mt-6 p-5 border border-white/[0.04]">
                  <p className="text-[11px] text-warm-gray/70 leading-relaxed font-sans">
                    Custom pieces are handcrafted by our master artisans in Damascus using
                    traditional techniques. Typical lead time is 8-16 weeks depending on
                    complexity. Starting from $5,000 for accessories to $80,000+ for grand
                    cabinets.
                  </p>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
