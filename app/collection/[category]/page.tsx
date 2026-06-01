// Legacy category landing. Category browsing now lives at the root
// (/antiques, /mother-of-pearl-furniture, …). Server-side redirect so
// crawlers and shared old links resolve to the canonical browse page.

import { redirect } from "next/navigation";
import { getCategory } from "@/lib/data";

interface Props {
  params: { category: string };
}

export default function LegacyCategoryRedirect({ params }: Props) {
  const category = getCategory(params.category);
  redirect(category ? `/${params.category}` : "/");
}
