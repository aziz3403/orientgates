import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
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

export const metadata: Metadata = {
  title: {
    default: "The Orient Gates | Rare Antiques & Mother-of-Pearl Furniture",
    template: "%s | The Orient Gates",
  },
  description:
    "A family legacy of over 150 years in rare antiques and handcrafted mother-of-pearl furniture. Islamic, European, and Asian antiques for collectors and designers worldwide. Trusted auction partner of Sotheby's and Christie's.",
  keywords: [
    "antiques", "mother-of-pearl furniture", "Islamic antiques", "European antiques",
    "luxury furniture", "Damascus furniture", "antique collector", "rare antiques",
    "Sotheby's", "Christie's", "auction antiques", "custom furniture",
  ],
  metadataBase: new URL("https://theorientgates.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <WishlistProvider>
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
