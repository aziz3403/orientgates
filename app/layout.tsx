import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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

export const metadata: Metadata = {
  title: {
    default: "The Orient Gates | Rare Antiques & Mother-of-Pearl Furniture",
    template: "%s | The Orient Gates",
  },
  description:
    "A family legacy of over 150 years in rare antiques and handcrafted mother-of-pearl furniture. Islamic antiques, European furniture, carpets, and decorative objects for collectors and designers worldwide.",
  keywords: [
    "antiques",
    "mother-of-pearl",
    "Islamic antiques",
    "luxury furniture",
    "Damascus furniture",
    "antique collector",
    "rare antiques",
    "mother of pearl inlay",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Orient Gates",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
