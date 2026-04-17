'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '../data/products';

type Category = 'All' | 'Mirrors' | 'Furniture' | 'Antiques';

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Page Header */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '3rem',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
        background: '#1A2530',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Handcrafted in Damascus
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 400,
          color: '#F5F0E8',
          marginBottom: '0.8rem',
        }}>
          Our Collection
        </h1>
        <div style={{ width: '60px', height: '1px', background: '#C5973E', margin: '0 auto 1.5rem' }} />
        <p style={{ color: '#8A8578', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
          Each piece is a singular work of art, requiring weeks of meticulous hand-inlay work by master craftsmen in Damascus.
        </p>
      </section>

      {/* Filter Pills */}
      <section style={{
        background: '#1A2530',
        padding: '0 clamp(1.5rem, 5vw, 4rem) 3rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        {(['All', 'Mirrors', 'Furniture', 'Antiques'] as Category[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? '#C5973E' : 'transparent',
              border: '1px solid',
              borderColor: activeCategory === cat ? '#C5973E' : 'rgba(197,151,62,0.3)',
              color: activeCategory === cat ? '#1A2530' : '#8A8578',
              padding: '8px 24px',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </section>

      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C5973E 30%, #C5973E 70%, transparent)', margin: '0 clamp(1.5rem, 5vw, 4rem)' }} />

      {/* Grid */}
      <section style={{
        background: '#1A2530',
        padding: '3rem clamp(1.5rem, 5vw, 4rem) 6rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2.5rem',
        }}>
          {filtered.map(product => (
            <Link
              key={product.id}
              href={`/collection/${product.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#243040',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.transform = 'scale(1.05)')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '1.2rem 1.4rem 1.6rem' }}>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    color: '#1A2530',
                    background: '#C5973E',
                    padding: '3px 10px',
                    textTransform: 'uppercase',
                    marginBottom: '0.7rem',
                  }}>
                    {product.category}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '1.3rem',
                    color: '#F5F0E8',
                    fontWeight: 400,
                    marginBottom: '0.5rem',
                  }}>
                    {product.title}
                  </h3>
                  <p style={{ color: '#8A8578', fontSize: '0.82rem', marginBottom: '0.8rem', lineHeight: 1.6 }}>
                    {product.description}
                  </p>
                  <p style={{ color: '#C5973E', fontSize: '0.75rem', letterSpacing: '0.1em' }}>Price on Request</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#8A8578', padding: '4rem' }}>
            No pieces in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
