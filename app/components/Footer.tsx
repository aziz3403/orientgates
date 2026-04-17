'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#111820', color: '#F5F0E8' }}>
      {/* Gold line */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C5973E 30%, #C5973E 70%, transparent)' }} />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '3rem',
      }}>
        {/* Brand */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '1.4rem',
            color: '#C5973E',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}>The Orient Gates</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: '#8A8578', maxWidth: '240px' }}>
            Preserving the art of traditional Levantine craftsmanship since 1975. Each piece is a testament to the enduring beauty of Damascus.
          </p>
        </div>

        {/* Collections */}
        <div>
          <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5973E', marginBottom: '1.5rem' }}>
            Collections
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              { label: 'All Pieces', href: '/collection' },
              { label: 'Mirrors', href: '/collection' },
              { label: 'Furniture', href: '/collection' },
              { label: 'Antiques', href: '/collection' },
              { label: 'Custom Orders', href: '/custom' },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                style={{ color: '#8A8578', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C5973E')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A8578')}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5973E', marginBottom: '1.5rem' }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <a
              href="mailto:abidalazizharb4846@gmail.com"
              style={{ color: '#8A8578', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C5973E')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A8578')}
            >
              abidalazizharb4846@gmail.com
            </a>
            <span style={{ color: '#8A8578', fontSize: '0.85rem' }}>New York City, USA</span>
            <a
              href="https://wa.me/19298329645"
              style={{ color: '#8A8578', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C5973E')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A8578')}
            >
              WhatsApp: +1 929 832 9645
            </a>
            <a
              href="https://www.instagram.com/theorientgates/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#8A8578', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C5973E')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A8578')}
            >
              Instagram: @theorientgates
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5973E', marginBottom: '1.5rem' }}>
            Navigate
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about' },
              { label: 'Contact', href: '/contact' },
              { label: 'Custom & Bespoke', href: '/custom' },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                style={{ color: '#8A8578', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C5973E')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A8578')}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid rgba(197,151,62,0.1)',
        textAlign: 'center',
        padding: '1.5rem 2rem',
        color: '#8A8578',
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
      }}>
        © 2026 The Orient Gates. All Rights Reserved.
      </div>
    </footer>
  );
}
