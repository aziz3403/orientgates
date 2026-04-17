'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { products } from './data/products';

const featuredProducts = products.filter(p => p.featured).slice(0, 6);

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function HomePage() {
  const heritage = useIntersection();
  const collection = useIntersection();
  const craft = useIntersection();
  const cta = useIntersection();

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <Image
          src="/cover.jpg"
          alt="The Orient Gates — Luxury Interior"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15,20,28,0.55)',
          zIndex: 1,
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 1.5rem',
        }}>
          <div style={{ marginBottom: '2rem', animation: 'fadeInUp 1s ease-out both' }}>
            <Image
              src="/logo-transparent.png"
              alt="The Orient Gates"
              width={180}
              height={180}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '0.12em',
            color: '#F5F0E8',
            marginBottom: '0.5rem',
            animation: 'fadeInUp 1s ease-out 0.2s both',
          }}>
            Handcrafted Luxury Since 1975
          </h1>

          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C5973E',
            marginBottom: '2.5rem',
            animation: 'fadeInUp 1s ease-out 0.4s both',
          }}>
            Damascus · Mother of Pearl · Levantine Craft
          </p>

          <div style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
            <Link href="/collection" className="btn-gold">
              Explore Collection
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          animation: 'fadeInUp 1s ease-out 1s both',
        }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: '#8A8578', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #C5973E, transparent)',
          }} />
        </div>
      </section>

      {/* ── HERITAGE ── */}
      <section
        ref={heritage.ref}
        style={{
          background: '#1A2530',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
          opacity: heritage.visible ? 1 : 0,
          transform: heritage.visible ? 'none' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Text */}
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              Our Heritage
            </p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 400,
              color: '#F5F0E8',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}>
              Nearly Fifty Years<br />of Craft
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#C5973E', marginBottom: '1.5rem' }} />
            <p style={{ color: '#8A8578', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '2rem' }}>
              For generations, The Orient Gates has preserved the art of traditional Levantine craftsmanship. Each piece is handcrafted in Damascus by master artisans using techniques passed down through centuries. Thousands of individual mother of pearl pieces are hand-cut and inlaid into solid walnut wood.
            </p>
            <Link
              href="/about"
              style={{
                color: '#C5973E',
                textDecoration: 'none',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(197,151,62,0.4)',
                paddingBottom: '2px',
                transition: 'border-color 0.2s',
              }}
            >
              Our Story →
            </Link>
          </div>

          {/* Image */}
          <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
            <Image
              src="/cover.jpg"
              alt="Damascus craftsmanship"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid rgba(197,151,62,0.2)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </section>

      {/* ── GOLD DIVIDER ── */}
      <div className="gold-divider" style={{ margin: '0 clamp(1.5rem, 5vw, 6rem)' }} />

      {/* ── FEATURED COLLECTION ── */}
      <section
        ref={collection.ref}
        style={{
          background: '#1A2530',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          opacity: collection.visible ? 1 : 0,
          transform: collection.visible ? 'none' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* Section title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '0.8rem' }}>
            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(to right, transparent, #C5973E)' }} />
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 400,
              color: '#F5F0E8',
              letterSpacing: '0.08em',
            }}>The Collection</h2>
            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(to left, transparent, #C5973E)' }} />
          </div>
          <p style={{ color: '#8A8578', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Mother of Pearl · Damascus · Handcrafted
          </p>
        </div>

        {/* Product Grid */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem',
        }}>
          {featuredProducts.map((product, i) => (
            <Link
              key={product.id}
              href={`/collection/${product.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="product-card"
                style={{
                  background: '#243040',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  className="product-image"
                  style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                </div>
                <div style={{ padding: '1.2rem 1.4rem 1.5rem' }}>
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    {product.category}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '1.2rem',
                    color: '#F5F0E8',
                    fontWeight: 400,
                    marginBottom: '0.6rem',
                  }}>
                    {product.title}
                  </h3>
                  <p style={{ color: '#C5973E', fontSize: '0.75rem', letterSpacing: '0.1em' }}>Price on Request</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/collection" className="btn-gold">
            View All Pieces
          </Link>
        </div>
      </section>

      {/* ── CRAFTSMANSHIP ── */}
      <section
        ref={craft.ref}
        className="islamic-pattern"
        style={{
          background: '#141D27',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          opacity: craft.visible ? 1 : 0,
          transform: craft.visible ? 'none' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1rem' }}>
            The Craft
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 400,
            color: '#F5F0E8',
          }}>
            Artistry in Every Detail
          </h2>
        </div>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
        }}>
          {[
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C5973E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11V6l-4-2-4 2v5L4 14v4l4 2 4-2 4 2 4-2v-4l-6-3z"/>
                  <line x1="10" y1="9" x2="10" y2="20"/>
                  <line x1="14" y1="7" x2="14" y2="18"/>
                </svg>
              ),
              title: 'Handcrafted',
              desc: 'Every piece made entirely by hand',
            },
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C5973E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ),
              title: 'Mother of Pearl',
              desc: 'Thousands of individual pieces per item',
            },
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C5973E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                  <circle cx="8" cy="12" r="1.5" fill="#C5973E"/>
                  <circle cx="16" cy="6" r="1.5" fill="#C5973E"/>
                  <circle cx="12" cy="18" r="1.5" fill="#C5973E"/>
                </svg>
              ),
              title: 'Custom Sizes',
              desc: 'Made to your exact specifications',
            },
          ].map(item => (
            <div key={item.title} style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, #C5973E, transparent)', margin: '0 auto 1.2rem' }} />
              <h3 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '1.3rem',
                color: '#F5F0E8',
                marginBottom: '0.6rem',
                fontWeight: 400,
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#8A8578', fontSize: '0.85rem', lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        ref={cta.ref}
        style={{
          background: '#1A2530',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
          opacity: cta.visible ? 1 : 0,
          transform: cta.visible ? 'none' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        <div className="gold-divider" style={{ marginBottom: '4rem' }} />
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Private Viewings Available
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 300,
          color: '#F5F0E8',
          marginBottom: '1.2rem',
          letterSpacing: '0.05em',
        }}>
          Interested in a piece?
        </h2>
        <p style={{ color: '#8A8578', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Contact us for pricing, custom sizes, or to schedule a private viewing in New York City.
        </p>
        <Link href="/contact" className="btn-gold">
          Inquire Now
        </Link>
      </section>
    </>
  );
}
