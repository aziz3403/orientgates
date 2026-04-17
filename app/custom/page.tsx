'use client';

import Link from 'next/link';
import Image from 'next/image';

const steps = [
  {
    num: '01',
    title: 'Choose Your Design',
    desc: 'Browse our existing collection for inspiration, or share a reference image. Our craftsmen can recreate virtually any traditional pattern.',
  },
  {
    num: '02',
    title: 'Provide Measurements',
    desc: 'Send us the exact dimensions you need. We accommodate any size — from intimate jewelry boxes to room-defining statement mirrors.',
  },
  {
    num: '03',
    title: 'We Quote',
    desc: 'Within 48 hours, we provide a detailed quote covering craftsmanship, materials, and shipping. No surprises.',
  },
  {
    num: '04',
    title: 'We Craft',
    desc: 'Your piece enters production in Damascus. Standard lead time is 3–6 weeks depending on complexity.',
  },
  {
    num: '05',
    title: 'White Glove Delivery',
    desc: 'Your piece ships fully insured with white-glove delivery to your door. Installation guidance included.',
  },
];

export default function CustomPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '4rem',
        background: '#1A2530',
        textAlign: 'center',
        padding: '140px clamp(1.5rem, 5vw, 4rem) 4rem',
      }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Bespoke Commissions
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 400,
          color: '#F5F0E8',
          marginBottom: '1rem',
        }}>
          Custom & Bespoke
        </h1>
        <div style={{ width: '60px', height: '1px', background: '#C5973E', margin: '0 auto 1.5rem' }} />
        <p style={{ color: '#8A8578', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
          Every Orient Gates piece can be made to your exact specifications. Whether you need a precise dimension, a specific pattern, or a fully original design — our Damascus craftsmen deliver it.
        </p>
      </section>

      {/* Gold divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C5973E 30%, #C5973E 70%, transparent)', margin: '0 clamp(1.5rem, 5vw, 4rem)' }} />

      {/* What We Offer */}
      <section style={{
        background: '#1A2530',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 6rem)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
        }}>
          {[
            { title: 'Custom Mirrors', desc: 'Any dimension. Any frame profile. Any inlay pattern.' },
            { title: 'Bespoke Furniture', desc: 'Console tables, desks, cabinets, bed frames — all to your measurements.' },
            { title: 'Original Designs', desc: 'Work with our artisans to create a completely unique piece.' },
            { title: 'Gift Commissions', desc: 'A named piece, presented in our archival packaging with a provenance certificate.' },
          ].map(item => (
            <div key={item.title} style={{
              background: '#243040',
              padding: '2rem',
              borderTop: '2px solid #C5973E',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '1.3rem',
                color: '#F5F0E8',
                marginBottom: '0.8rem',
                fontWeight: 400,
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#8A8578', fontSize: '0.85rem', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{
        background: '#141D27',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 6rem)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1rem' }}>
            How It Works
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 400,
            color: '#F5F0E8',
          }}>
            The Process
          </h2>
        </div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '1.5rem',
              paddingBottom: i < steps.length - 1 ? '2.5rem' : 0,
              position: 'relative',
            }}>
              {/* Step number + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid #C5973E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '1.1rem',
                  color: '#C5973E',
                  flexShrink: 0,
                }}>
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: '1px', flex: 1, background: 'rgba(197,151,62,0.2)', marginTop: '8px' }} />
                )}
              </div>
              <div style={{ paddingTop: '10px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '1.2rem',
                  color: '#F5F0E8',
                  fontWeight: 400,
                  marginBottom: '0.5rem',
                }}>
                  {step.title}
                </h3>
                <p style={{ color: '#8A8578', fontSize: '0.88rem', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#1A2530',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
          fontWeight: 400,
          color: '#F5F0E8',
          marginBottom: '1rem',
        }}>
          Ready to Commission?
        </h2>
        <p style={{ color: '#8A8578', fontSize: '0.95rem', marginBottom: '2.5rem', maxWidth: '440px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Reach us via WhatsApp for the fastest response, or fill in our contact form and we'll reply within 24 hours.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/19298329645?text=Hi, I'd like to commission a custom piece"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-filled"
          >
            WhatsApp Us
          </a>
          <Link href="/contact" className="btn-gold">
            Contact Form
          </Link>
        </div>
      </section>
    </>
  );
}
