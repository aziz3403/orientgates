'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '../../data/products';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);
  const related = getRelatedProducts(slug, 3);

  if (!product) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1A2530' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '2rem', color: '#F5F0E8', marginBottom: '1rem' }}>
            Piece Not Found
          </h1>
          <Link href="/collection" className="btn-gold">View Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Image */}
      <div style={{ position: 'relative', height: '60vh', marginTop: '72px', overflow: 'hidden' }}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, #1A2530 100%)' }} />
      </div>

      {/* Product Details */}
      <section style={{
        background: '#1A2530',
        padding: '3rem clamp(1.5rem, 5vw, 6rem) 5rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
        }}>
          {/* Main info */}
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              color: '#1A2530',
              background: '#C5973E',
              padding: '3px 10px',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}>
              {product.category}
            </span>
            <h1 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: '#F5F0E8',
              marginBottom: '0.5rem',
            }}>
              {product.title}
            </h1>
            <p style={{ color: '#C5973E', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>
              Price on Request
            </p>
            <div style={{ width: '40px', height: '1px', background: '#C5973E', marginBottom: '1.5rem' }} />
            <p style={{ color: '#8A8578', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
              {product.longDescription}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/19298329645?text=Hi, I'm interested in the ${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-filled"
              >
                Inquire via WhatsApp
              </a>
              <Link href="/contact" className="btn-gold">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Specs */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1.2rem',
              color: '#F5F0E8',
              marginBottom: '1.5rem',
              fontWeight: 400,
              letterSpacing: '0.05em',
            }}>
              Piece Details
            </h3>
            {[
              { label: 'Dimensions', value: product.dimensions },
              { label: 'Materials', value: product.materials },
              { label: 'Origin', value: product.origin },
              { label: 'Availability', value: 'Made to order · 3–6 weeks' },
              { label: 'Customisation', value: 'Available — contact for details' },
            ].map(spec => (
              <div
                key={spec.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: '1rem',
                  padding: '0.9rem 0',
                  borderBottom: '1px solid rgba(197,151,62,0.1)',
                }}
              >
                <span style={{ color: '#8A8578', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {spec.label}
                </span>
                <span style={{ color: '#F5F0E8', fontSize: '0.9rem' }}>
                  {spec.value}
                </span>
              </div>
            ))}

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#243040', borderLeft: '2px solid #C5973E' }}>
              <p style={{ color: '#8A8578', fontSize: '0.82rem', lineHeight: 1.7 }}>
                All pieces are handcrafted to order in Damascus and shipped with white-glove delivery to your door. Custom dimensions and finishes available on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pieces */}
      {related.length > 0 && (
        <section style={{
          background: '#141D27',
          padding: '4rem clamp(1.5rem, 5vw, 4rem) 5rem',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '2rem',
              fontWeight: 400,
              color: '#F5F0E8',
            }}>
              Related Pieces
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#C5973E', margin: '1rem auto 0' }} />
          </div>

          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '2rem',
          }}>
            {related.map(item => (
              <Link key={item.id} href={`/collection/${item.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: '#243040', transition: 'transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
                  </div>
                  <div style={{ padding: '1rem 1.2rem 1.4rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '1.1rem',
                      color: '#F5F0E8',
                      fontWeight: 400,
                      marginBottom: '0.4rem',
                    }}>{item.title}</h3>
                    <p style={{ color: '#C5973E', fontSize: '0.72rem' }}>Price on Request</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
