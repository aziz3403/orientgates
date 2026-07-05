"use client";

import { useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";
import { locations, contact, waLink } from "@/lib/locations";

const inquiryTypes = [
  "General Inquiry",
  "Private Viewing",
  "Bespoke Sourcing",
  "Interior Design Project",
  "Institutional / Gallery",
  "Custom Furniture Commission",
];

const budgetRanges = ["Under $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000 – $100,000", "$100,000+"];
const collectorTypes = ["Private Collector", "Interior Designer", "Architect", "Gallery / Dealer", "Museum / Institution", "Hospitality / Commercial"];
const contactMethods = ["Email", "Phone", "WhatsApp", "Video Call"];
const timelines = ["Immediate", "1–3 Months", "3–6 Months", "Exploring"];

export default function ContactPage() {
  const { ref, position } = useMousePosition();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", country: "",
    inquiryType: "", budgetRange: "", collectorType: "",
    preferredContact: "", timeline: "", pieceName: "",
    message: "", confidentiality: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Submission failed (${res.status}).`);
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "We couldn't send that just now. Please try WhatsApp or email."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section ref={ref} className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{ transform: `scale(1.05) translate(${(position.x - 0.5) * -8}px, ${(position.y - 0.5) * -8}px)` }}>
          <LuxuryImage src="/images/contact-hero.jpg" alt="Private consultation" width={1920} height={1080} className="w-full h-full" label="Private Inquiry" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 pb-12 w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-brass/40" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-brass/60 font-sans">Get in Touch</span>
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-serif text-ivory">Private Inquiry</h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">
            <div className="lg:col-span-7">
              <AnimateIn>
                {submitted ? (
                  <div className="text-center py-20 border border-white/[0.04] p-12">
                    <div className="w-12 h-px bg-brass/40 mx-auto mb-8" />
                    <h2 className="text-3xl font-serif text-ivory mb-4">Thank You</h2>
                    <p className="text-[14px] text-warm-gray/80 leading-[1.8] font-sans max-w-md mx-auto">
                      Your inquiry has been received. A specialist will respond within 24 hours.
                      All inquiries are handled with complete discretion and confidentiality.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-serif text-ivory mb-2">How May We Assist You?</h2>
                      <p className="text-[12px] text-warm-gray/70 font-sans mb-10">All inquiries are handled with complete discretion.</p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-base font-sans focus:border-brass outline-none transition-colors" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Email Address *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-base font-sans focus:border-brass outline-none transition-colors" placeholder="your@email.com" />
                      </div>
                    </div>

                    {/* Phone + Country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Phone</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-base font-sans focus:border-brass outline-none transition-colors" placeholder="+1 (000) 000-0000" />
                      </div>
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Country / Region</label>
                        <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-base font-sans focus:border-brass outline-none transition-colors" placeholder="For shipping context" />
                      </div>
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Type of Inquiry</label>
                      <div className="flex flex-wrap gap-2">
                        {inquiryTypes.map((type) => (
                          <button key={type} type="button" onClick={() => setFormData({ ...formData, inquiryType: type })}
                            className={`px-4 py-3 text-[10px] tracking-wider uppercase border font-sans transition-all duration-300 ${
                              formData.inquiryType === type ? "border-brass text-brass bg-brass/[0.06]" : "border-white/10 text-warm-gray/80 hover:border-white/20 hover:text-ivory"
                            }`}>{type}</button>
                        ))}
                      </div>
                    </div>

                    {/* Collector Type + Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">I Am a...</label>
                        <select value={formData.collectorType} onChange={(e) => setFormData({ ...formData, collectorType: e.target.value })}
                          className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-base font-sans focus:border-brass outline-none appearance-none">
                          <option value="" className="bg-midnight">Select...</option>
                          {collectorTypes.map((t) => <option key={t} value={t} className="bg-midnight">{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Budget Range</label>
                        <select value={formData.budgetRange} onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-base font-sans focus:border-brass outline-none appearance-none">
                          <option value="" className="bg-midnight">Select...</option>
                          {budgetRanges.map((b) => <option key={b} value={b} className="bg-midnight">{b}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Contact Method + Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Preferred Contact Method</label>
                        <div className="flex flex-wrap gap-2">
                          {contactMethods.map((m) => (
                            <button key={m} type="button" onClick={() => setFormData({ ...formData, preferredContact: m })}
                              className={`px-4 py-3 text-[10px] tracking-wider uppercase border font-sans transition-all ${
                                formData.preferredContact === m ? "border-brass text-brass bg-brass/[0.06]" : "border-white/10 text-warm-gray/80"
                              }`}>{m}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Timeline</label>
                        <div className="flex flex-wrap gap-2">
                          {timelines.map((t) => (
                            <button key={t} type="button" onClick={() => setFormData({ ...formData, timeline: t })}
                              className={`px-4 py-3 text-[10px] tracking-wider uppercase border font-sans transition-all ${
                                formData.timeline === t ? "border-brass text-brass bg-brass/[0.06]" : "border-white/10 text-warm-gray/80"
                              }`}>{t}</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Specific piece */}
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Inquiring About a Specific Piece? (Name or SKU)</label>
                      <input type="text" value={formData.pieceName} onChange={(e) => setFormData({ ...formData, pieceName: e.target.value })}
                        className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-base font-sans focus:border-brass outline-none transition-colors"
                        placeholder="e.g., Grand Mother-of-Pearl Cabinet or TOG-MOP-001" />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">Your Message *</label>
                      <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-base font-sans focus:border-brass outline-none transition-colors resize-none"
                        placeholder="Tell us about your interest, the piece you're seeking, or how we can help..." />
                    </div>

                    {/* Confidentiality */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.confidentiality} onChange={(e) => setFormData({ ...formData, confidentiality: e.target.checked })}
                        className="accent-brass mt-1" />
                      <span className="text-[11px] text-warm-gray/70 font-sans leading-relaxed">
                        I understand that all communications with The Orient Gates are treated with complete confidentiality
                        and discretion. My information will not be shared with third parties.
                      </span>
                    </label>

                    {/* Submit */}
                    <div className="space-y-4">
                      {submitError && (
                        <div className="border border-red-400/30 bg-red-500/[0.05] px-4 py-3 text-[12px] text-red-300/90 font-sans">
                          {submitError}{" "}
                          <span className="text-warm-gray/70">
                            You can also reach us via WhatsApp or at{" "}
                            <a href={`mailto:${contact.email}`} className="underline hover:text-brass">{contact.email}</a>.
                          </span>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group relative inline-flex items-center gap-3 bg-brass text-midnight px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10">
                          {submitting ? "Sending…" : "Send Inquiry"}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                      </button>
                    </div>
                  </form>
                )}
              </AnimateIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <AnimateIn delay={200}>
                <div className="space-y-12">
                  {/* Email + Instagram */}
                  <div>
                    <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-6">Reach Us Directly</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-warm-gray/80 font-sans mb-1">Email</p>
                        <a href={`mailto:${contact.email}`} className="text-ivory/80 hover:text-brass transition-colors text-sm font-sans">{contact.email}</a>
                      </div>
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-warm-gray/80 font-sans mb-1">Instagram</p>
                        <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-ivory/80 hover:text-brass transition-colors text-sm font-sans">@{contact.instagramHandle}</a>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                  {/* Locations */}
                  <div>
                    <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-6">Our Locations</h3>
                    <p className="text-[12px] text-warm-gray/60 font-sans mb-6 italic">All viewings by appointment.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {locations.map((loc) => (
                        <div key={loc.city} className="border border-white/[0.06] hover:border-brass/20 transition-colors p-4">
                          <p className="text-[11px] tracking-[0.25em] uppercase text-ivory font-sans">{loc.city}</p>
                          <p className="text-[10px] text-warm-gray/60 font-sans uppercase tracking-[0.15em] mt-0.5">{loc.country}</p>
                          <p className="text-[12px] text-warm-gray/80 font-sans mt-3 leading-relaxed">{loc.address}</p>
                          <a
                            href={waLink(loc.whatsapp)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[11px] text-brass/80 hover:text-brass transition-colors font-mono mt-3"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
                            {loc.whatsappDisplay}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                  <div>
                    <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-6">We Can Help With</h3>
                    <ul className="space-y-3">
                      {[
                        "Acquiring a specific piece", "Building a collection", "Interior design sourcing",
                        "Authentication & valuation", "Restoration & conservation", "Custom MoP furniture commissions",
                        "Worldwide white-glove shipping", "Auction advisory",
                      ].map((s) => (
                        <li key={s} className="flex items-center gap-3 text-[13px] text-warm-gray/70 font-sans">
                          <div className="w-1.5 h-1.5 bg-brass/30 rounded-full" />{s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="aspect-[4/3] overflow-hidden border border-white/[0.04]">
                    <LuxuryImage src="/images/contact-showroom.jpg" alt="Showroom" width={600} height={450} className="w-full h-full" label="Our Showroom" />
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
