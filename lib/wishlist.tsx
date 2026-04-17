"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

interface WishlistContextType {
  items: string[]; // product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("orient-gates-wishlist");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("orient-gates-wishlist", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToWishlist = useCallback((productId: string) => {
    setItems((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((id) => id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.includes(productId),
    [items]
  );

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist, totalItems: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
