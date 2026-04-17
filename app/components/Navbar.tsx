'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/about', label: 'About' },
  { href: '/custom', label: 'Custom Orders' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          background: scrolled ? '#1A2530' : 'transparent',
          boxShadow: scrolled ? '0 1px 0 rgba(197,151,62,0.2)' : 'none',
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <Image
            src="/logo.jpg"
            alt="The Orient Gates"
            width={52}
            height={52}
            style={{ borderRadius: '4px', objectFit: 'cover' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1.1rem',
              letterSpacing: '0.08em',
              color: '#C5973E',
              lineHeight: 1.2,
            }}>The Orient Gates</span>
            <span style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: '#8A8578',
              textTransform: 'uppercase',
            }}>Handcrafted Luxury Furniture</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: '#F5F0E8',
                textDecoration: 'none',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C5973E')}
              onMouseLeave={e => (e.currentTarget.style.color = '#F5F0E8')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: '22px', height: '1px', background: '#C5973E', transition: 'transform 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: '#C5973E', transition: 'opacity 0.3s', opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: '#C5973E', transition: 'transform 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: '#1A2530',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: '#F5F0E8',
                textDecoration: 'none',
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '2rem',
                letterSpacing: '0.1em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C5973E')}
              onMouseLeave={e => (e.currentTarget.style.color = '#F5F0E8')}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ width: '40px', height: '1px', background: '#C5973E', marginTop: '1rem' }} />
          <a
            href="https://wa.me/19298329645"
            style={{ color: '#C5973E', fontSize: '0.75rem', letterSpacing: '0.2em', textDecoration: 'none', textTransform: 'uppercase' }}
          >
            WhatsApp Inquiry
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
