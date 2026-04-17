import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Providers from './providers';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Orient Gates — Handcrafted Luxury Furniture',
  description: 'Bespoke mother of pearl furniture and antiques handcrafted in Damascus since 1975. Each piece is a unique work of art.',
  keywords: 'mother of pearl furniture, Damascus furniture, luxury furniture, Syrian antiques, inlay furniture, handcrafted',
  openGraph: {
    title: 'The Orient Gates — Handcrafted Luxury Furniture',
    description: 'Bespoke mother of pearl furniture and antiques handcrafted in Damascus since 1975.',
    siteName: 'The Orient Gates',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif', background: '#1A2530', margin: 0 }}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
