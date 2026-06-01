import type { Metadata } from "next";
import WishlistView from "./WishlistView";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description: "Pieces you've saved.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <WishlistView />;
}
