import type { Metadata } from "next";
import CheckoutView from "./CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CheckoutView />;
}
