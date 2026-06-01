import type { Metadata } from "next";
import CartView from "./CartView";

export const metadata: Metadata = {
  title: "Your Selection",
  description: "Your cart at The Orient Gates.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CartView />;
}
