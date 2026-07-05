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
  "Four generations of the Harb family — Damascene artists since the time of Abou Sobhi Al-Tinawi (Muhammad Harb). Rare Islamic, European, and Asian antiques and handcrafted mother-of-pearl furniture, by appointment in Beirut, Rome, and Brooklyn.";

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

// Site-wide Organization schema so Google's knowledge graph associates
// the legal entity (The Orient Gates LLC) with the brand.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Orient Gates",
  legalName: "The Orient Gates LLC",
  url: "https://theorientgates.com",
  logo: "https://theorientgates.com/logo-final.png",
  email: "info@theorientgates.com",
  sameAs: ["https://instagram.com/theorientgates"],
  foundingDate: "1870",
  description:
    "Four generations of the Harb family — Damascene artists and collectors since the time of Abou Sobhi Al-Tinawi (Muhammad Harb). Rare antiques and handcrafted mother-of-pearl furniture, by appointment in Beirut, Rome, and Brooklyn.",
};

// WebSite schema — enables Google sitelinks search box and signals canonical brand name.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Orient Gates",
  alternateName: "Orient Gates",
  url: "https://theorientgates.com",
  inLanguage: "en",
  publisher: { "@type": "Organization", name: "The Orient Gates LLC" },
};

// LocalBusiness / Place entities for each city — helps local search
// ("antiques dealer Brooklyn", "Damascene furniture Beirut", etc.).
const locationsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://theorientgates.com/#new-york",
      name: "The Orient Gates · New York",
      parentOrganization: { "@type": "Organization", name: "The Orient Gates LLC" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brooklyn",
        addressRegion: "NY",
        addressCountry: "US",
      },
      telephone: "+1-929-832-9645",
      url: "https://theorientgates.com/contact",
      image: "https://theorientgates.com/images/contact-showroom.jpg",
      priceRange: "$$$$",
      areaServed: "Worldwide",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://theorientgates.com/#beirut",
      name: "The Orient Gates · Beirut",
      parentOrganization: { "@type": "Organization", name: "The Orient Gates LLC" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bechara El Khoury Square",
        addressLocality: "Beirut",
        addressCountry: "LB",
      },
      telephone: "+961-71-773231",
      url: "https://theorientgates.com/contact",
      priceRange: "$$$$",
      areaServed: "Worldwide",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://theorientgates.com/#rome",
      name: "The Orient Gates · Rome",
      parentOrganization: { "@type": "Organization", name: "The Orient Gates LLC" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Piazza Santa Maria, Trastevere",
        addressLocality: "Rome",
        addressCountry: "IT",
      },
      telephone: "+39-327-7772780",
      url: "https://theorientgates.com/contact",
      priceRange: "$$$$",
      areaServed: "Worldwide",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsJsonLd) }}
        />
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
