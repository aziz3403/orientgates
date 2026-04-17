'use client';

import Image from 'next/image';

export default function MaintenancePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #435762 0%, #3a4d58 40%, #2e4250 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
    }}>
      {/* Original logo — bg matches page bg so it blends perfectly */}
      <Image
        src="/logo.jpg"
        alt="The Orient Gates"
        width={360}
        height={225}
        style={{
          marginBottom: '3rem',
          objectFit: 'contain',
          mixBlendMode: 'normal',
        }}
        unoptimized
        priority
      />

      {/* Thin gold line */}
      <div style={{
        width: '60px',
        height: '1px',
        background: '#C5973E',
        marginBottom: '2rem',
      }} />

      {/* Coming Soon */}
      <h1 style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: '#C5973E',
        fontSize: '0.85rem',
        fontWeight: 400,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
      }}>
        Coming Soon
      </h1>

      <p style={{
        color: '#9AA8B0',
        fontSize: '0.9rem',
        lineHeight: 1.8,
        maxWidth: '360px',
        marginBottom: '3rem',
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}>
        Our new home is being crafted with the same care we put into every piece.
      </p>

      {/* Contact button */}
      <a
        href="mailto:abidalazizharb4846@gmail.com"
        style={{
          display: 'inline-block',
          padding: '0.65rem 2.5rem',
          border: '1px solid rgba(197,151,62,0.4)',
          color: '#C5973E',
          textDecoration: 'none',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontFamily: "Georgia, 'Times New Roman', serif",
          transition: 'all 0.3s',
        }}
      >
        Get In Touch
      </a>

      {/* Bottom */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <a
          href="https://www.instagram.com/theorientgates/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#7A8890',
            textDecoration: 'none',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
          }}
        >
          @theorientgates
        </a>
      </div>
    </div>
  );
}
