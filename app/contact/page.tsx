"use client";

import { useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";

const inquiryTypes = [
  "General Inquiry",
  "Private Viewing Request",
  "Bespoke Sourcing",
  "Interior Design Project",
  "Institutional / Gallery",
  "Shipping & Logistics",
];

export default function ContactPage() {
  const { ref, position } = useMousePosition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        ref={ref}
        className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{
            transform: `scale(1.05) translate(${(position.x - 0.5) * -8}px, ${(position.y - 0.5) * -8}px)`,
          }}
        >
          <LuxuryImage
            src="/images/contact-hero.jpg"
            alt="Private consultation"
            width={1920}
            height={1080}
            className="w-full h-full"
            label="Private Inquiry"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pb-12 w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-brass" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">Get in Touch</span>
          </div>
          <h1 className="text-display font-serif text-ivory">
            Private Inquiry
          </h1>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Form */}
            <div className="lg:col-span-7">
              <AnimateIn>
                {submitted ? (
                  <div className="text-center py-20 luxury-border p-12">
                    <div className="luxury-divider-short mx-auto mb-8" />
                    <h2 className="text-heading font-serif text-ivory mb-4">
                      Thank You
                    </h2>
                    <p className="text-warm-gray leading-relaxed max-w-md mx-auto">
                      Your inquiry has been received. A member of our team will
                      respond within 24 hours. We look forward to assisting you.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <h2 className="text-heading font-serif text-ivory mb-2">
                        How May We Assist You?
                      </h2>
                      <p className="text-sm text-warm-gray mb-10">
                        All inquiries are handled with complete discretion.
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-brass mb-3">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-ivory focus:border-brass outline-none transition-colors duration-500 text-sm"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-brass mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-ivory focus:border-brass outline-none transition-colors duration-500 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-brass mb-3">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-ivory focus:border-brass outline-none transition-colors duration-500 text-sm"
                        placeholder="+1 (000) 000-0000"
                      />
                    </div>

                    {/* Inquiry type */}
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-brass mb-3">
                        Type of Inquiry
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, inquiryType: type })}
                            className={`px-4 py-2.5 text-xs tracking-wider uppercase border transition-all duration-300 ${
                              formData.inquiryType === type
                                ? "border-brass text-brass bg-brass/10"
                                : "border-white/15 text-warm-gray hover:border-white/30 hover:text-ivory"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-brass mb-3">
                        Your Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-ivory focus:border-brass outline-none transition-colors duration-500 text-sm resize-none"
                        placeholder="Tell us about your interest, the piece you're seeking, or how we can help..."
                      />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn-luxury-gold">
                      Send Inquiry
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                  </form>
                )}
              </AnimateIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <AnimateIn delay={200}>
                <div className="space-y-12">
                  {/* Contact info */}
                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-brass mb-6">
                      Reach Us Directly
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-1">Email</p>
                        <p className="text-ivory text-sm">inquiries@theorientgates.com</p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-1">WhatsApp</p>
                        <p className="text-ivory text-sm">+1 (000) 000-0000</p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-1">Instagram</p>
                        <p className="text-ivory text-sm">@theorientgates</p>
                      </div>
                    </div>
                  </div>

                  <div className="luxury-divider" />

                  {/* Viewing */}
                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-brass mb-6">
                      Private Viewings
                    </h3>
                    <p className="text-sm text-warm-gray leading-relaxed mb-4">
                      We welcome visitors by appointment. Private viewings allow
                      you to experience pieces in person, with our specialists on
                      hand to provide context, history, and guidance.
                    </p>
                    <p className="text-sm text-ivory italic">By Appointment Only</p>
                  </div>

                  <div className="luxury-divider" />

                  {/* Services */}
                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-brass mb-6">
                      We Can Help With
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Acquiring a specific piece",
                        "Building a collection",
                        "Interior design sourcing",
                        "Authentication & valuation",
                        "Restoration & conservation",
                        "Worldwide shipping",
                      ].map((service) => (
                        <li key={service} className="flex items-center gap-3 text-sm text-warm-gray">
                          <div className="w-1.5 h-1.5 bg-brass/50 rounded-full" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden luxury-border mt-8">
                    <LuxuryImage
                      src="/images/contact-showroom.jpg"
                      alt="Showroom"
                      width={600}
                      height={450}
                      className="w-full h-full"
                      label="Our Showroom"
                    />
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
