import type { Metadata } from "next";

// Admin section is gated by middleware; also tell crawlers to ignore it
// for belt-and-braces on top of robots.txt.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
