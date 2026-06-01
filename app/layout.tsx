import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import GateIntro from "@/components/GateIntro";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_NAME = "The Orient Gates";
const SITE_TITLE = "The Orient Gates | Rare Antiques & Mother-of-Pearl Furniture";
const SITE_DESCRIPTION =
  "Four generations of the Harb family — Damascene artists since the time of Abou Sobhi Al-Tinawi (Muhammad Harb). Rare Islamic, European, and Asian antiques and handcrafted mother-of-pearl furniture, by appointment in Damascus, Beirut, Rome, and Brooklyn.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | The Orient Gates",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "antiques", "mother-of-pearl furniture", "Islamic antiques", "European antiques",
    "luxury furniture", "Damascus furniture", "antique collector", "rare antiques",
    "Abou Sobhi Al-Tinawi", "Muhammad Harb", "Damascene art", "custom furniture",
  ],
  metadataBase: new URL("https://theorientgates.com"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://theorientgates.com",
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Orient Gates — Mother-of-Pearl mirror and console",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <WishlistProvider>
            <GateIntro />
            <Navigation />
            <main>{children}</main>
            <CartSidebar />
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
