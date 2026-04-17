'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '65vh', marginTop: '72px', overflow: 'hidden' }}>
        <Image
          src="/cover.jpg"
          alt="The Orient Gates Story"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,20,28,0.6)' }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 2rem',
        }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Since 1975
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            color: '#F5F0E8',
            letterSpacing: '0.08em',
          }}>
            Our Story
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C5973E', marginTop: '1.5rem' }} />
        </div>
      </section>

      {/* Section 1 — The Brand */}
      <section style={{
        background: '#1A2530',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 6rem)',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '2rem' }}>
            The Orient Gates
          </p>
          <p style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            fontWeight: 300,
            color: '#F5F0E8',
            lineHeight: 1.7,
            marginBottom: '2rem',
            fontStyle: 'italic',
          }}>
            "The Orient Gates was born from a simple belief: that the extraordinary craftsmanship of Damascus deserves a place in homes around the world."
          </p>
          <div style={{ width: '40px', height: '1px', background: '#C5973E', margin: '0 auto 2rem' }} />
          <p style={{ color: '#8A8578', lineHeight: 1.9, fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
            For nearly fifty years, our family has sourced, restored, and commissioned the finest mother of pearl furniture and antiques from the Levant. What began as a passion for preserving Syria's endangered craft traditions has grown into a curated collection sought by collectors, interior designers, and discerning homeowners across North America and Europe.
          </p>
        </div>
      </section>

      {/* Gold divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C5973E 30%, #C5973E 70%, transparent)', margin: '0 clamp(1.5rem, 5vw, 6rem)' }} />

      {/* Section 2 — The Craft */}
      <section style={{
        background: '#1A2530',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 6rem)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <Image
              src="/m1.jpg"
              alt="Damascus mother of pearl craftsmanship"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(197,151,62,0.2)', pointerEvents: 'none' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              The Craft
            </p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 400,
              color: '#F5F0E8',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>
              Thousands of Hours.<br />One Masterwork.
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#C5973E', marginBottom: '1.5rem' }} />
            <p style={{ color: '#8A8578', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
              The process of mother of pearl inlay — known in Arabic as <em style={{ color: '#F5F0E8' }}>sadaf</em> — begins with the careful selection of raw shell material. Each shell is cut by hand into tiny geometric or floral shapes, often no larger than a fingernail, using chisels and files unchanged in design for centuries.
            </p>
            <p style={{ color: '#8A8578', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
              These individual pieces are then inlaid one by one into the surface of solid walnut or ebony wood, set into channels carved with extraordinary precision. A single large mirror frame may contain upward of ten thousand individual shell pieces, requiring weeks of focused, patient work.
            </p>
            <p style={{ color: '#8A8578', lineHeight: 1.9, fontSize: '0.95rem' }}>
              The finished surface is sanded flush and polished until the wood and shell appear to be a single continuous material — shimmering, tactile, and alive with light.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Damascus Heritage */}
      <section style={{
        background: '#141D27',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 6rem)',
        position: 'relative',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            Damascus Heritage
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 400,
            color: '#F5F0E8',
            marginBottom: '1.5rem',
            lineHeight: 1.3,
          }}>
            A City That Has Always<br />Known Beauty
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#C5973E', margin: '0 auto 2rem' }} />
          <p style={{ color: '#8A8578', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Damascus is among the oldest continuously inhabited cities on earth. For millennia, its artisans have been celebrated throughout the Islamic world and beyond — Damascene steel, Damascene silk, Damascene inlay work. The mother of pearl tradition flourished here during the Ottoman period, when wealthy merchants commissioned elaborate furniture suites for their <em style={{ color: '#F5F0E8' }}>qasr</em> — the grand reception rooms of their palatial homes.
          </p>
          <p style={{ color: '#8A8578', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
            Today, fewer than a hundred master craftsmen continue this tradition. The Orient Gates works directly with these families, ensuring that each piece we offer is not merely a beautiful object, but a living continuation of one of the world's great artistic lineages.
          </p>
          <Link href="/custom" className="btn-gold">
            Commission a Piece
          </Link>
        </div>
      </section>
    </>
  );
}
