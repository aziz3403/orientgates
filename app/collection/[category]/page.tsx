"use client";

// Legacy category landing. Category browsing now lives at the root
// (/antiques, /mother-of-pearl-furniture, …). Redirect old
// /collection/<category> links to the canonical browse page.

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCategory } from "@/lib/data";

export default function LegacyCategoryRedirect() {
  const params = useParams();
  const router = useRouter();
  const slug = params.category as string;

  useEffect(() => {
    const category = getCategory(slug);
    router.replace(category ? `/${slug}` : "/");
  }, [slug, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight pt-32">
      <p className="text-warm-gray/60 font-sans text-sm">Redirecting…</p>
    </div>
  );
}
