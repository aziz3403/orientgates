'use client';

import { useState } from 'react';
import { products } from '../data/products';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    piece: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry: ${formData.piece || 'General'} — The Orient Gates`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPiece of interest: ${formData.piece}\n\n${formData.message}`
    );
    window.location.href = `mailto:abidalazizharb4846@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#243040',
    border: '1px solid rgba(197,151,62,0.2)',
    color: '#F5F0E8',
    padding: '12px 16px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--font-inter), sans-serif',
  };

  return (
    <>
      {/* Hero */}
      <section style={{
        paddingTop: '140px',
        textAlign: 'center',
        background: '#1A2530',
        padding: '140px clamp(1.5rem, 5vw, 4rem) 4rem',
      }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Get in Touch
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 400,
          color: '#F5F0E8',
          marginBottom: '1rem',
        }}>
          Contact
        </h1>
        <div style={{ width: '60px', height: '1px', background: '#C5973E', margin: '0 auto 1.5rem' }} />
        <p style={{ color: '#8A8578', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
          We respond to all inquiries within 24 hours. For the fastest response, reach us on WhatsApp.
        </p>
      </section>

      {/* Contact Section */}
      <section style={{
        background: '#1A2530',
        padding: '3rem clamp(1.5rem, 5vw, 6rem) 6rem',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '5rem',
        }}>
          {/* Form */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1.8rem',
              fontWeight: 400,
              color: '#F5F0E8',
              marginBottom: '2rem',
            }}>
              Send an Inquiry
            </h2>

            {submitted ? (
              <div style={{
                background: '#243040',
                padding: '2rem',
                borderLeft: '2px solid #C5973E',
                color: '#F5F0E8',
              }}>
                <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                  Thank you for your inquiry.
                </p>
                <p style={{ color: '#8A8578', fontSize: '0.88rem' }}>
                  We'll respond within 24 hours. For immediate assistance, reach us on WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#8A8578', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#C5973E')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(197,151,62,0.2)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#8A8578', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#C5973E')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(197,151,62,0.2)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#8A8578', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#C5973E')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(197,151,62,0.2)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#8A8578', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Which Piece Interests You?
                  </label>
                  <select
                    name="piece"
                    value={formData.piece}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => (e.target.style.borderColor = '#C5973E')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(197,151,62,0.2)')}
                  >
                    <option value="">Select a piece (optional)</option>
                    <option value="Custom / Bespoke Commission">Custom / Bespoke Commission</option>
                    {products.map(p => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#8A8578', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Tell us about your interest — dimensions, location, timeline..."
                    onFocus={e => (e.target.style.borderColor = '#C5973E')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(197,151,62,0.2)')}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ marginTop: '0.5rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Send Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1.8rem',
              fontWeight: 400,
              color: '#F5F0E8',
              marginBottom: '2rem',
            }}>
              Contact Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5973E" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: 'Email',
                  value: 'abidalazizharb4846@gmail.com',
                  href: 'mailto:abidalazizharb4846@gmail.com',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5973E" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: 'Location',
                  value: 'New York City, USA',
                  href: null,
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                  label: 'WhatsApp',
                  value: '+1 929 832 9645',
                  href: 'https://wa.me/19298329645',
                },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
                  <div>
                    <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: '#C5973E', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        style={{ color: '#F5F0E8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#C5973E')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#F5F0E8')}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ color: '#F5F0E8', fontSize: '0.9rem' }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div style={{
              marginTop: '3rem',
              padding: '1.5rem',
              background: '#243040',
              borderLeft: '2px solid #C5973E',
            }}>
              <p style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '1.1rem',
                color: '#F5F0E8',
                marginBottom: '0.5rem',
                fontStyle: 'italic',
              }}>
                Response Time
              </p>
              <p style={{ color: '#8A8578', fontSize: '0.85rem', lineHeight: 1.7 }}>
                Email inquiries are answered within 24 hours. WhatsApp messages typically receive a response within a few hours during business hours (EST).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
