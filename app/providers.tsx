"use client";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </CartProvider>
  );
}
