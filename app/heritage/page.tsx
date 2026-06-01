import type { Metadata } from "next";
import HeritageView from "./HeritageView";

export const metadata: Metadata = {
  title: "Our Heritage · Four Generations of the Harb Family",
  description:
    "Four generations of Damascene craftsmanship — from Abou Sobhi Al-Tinawi (Muhammad Harb) to the present day. The story of The Orient Gates, a family practice in rare antiques and mother-of-pearl furniture.",
  alternates: { canonical: "https://theorientgates.com/heritage" },
  openGraph: {
    title: "Our Heritage · The Orient Gates",
    description:
      "Four generations of the Harb family — Damascene artists and collectors since the late 19th century.",
    url: "https://theorientgates.com/heritage",
    type: "article",
  },
};

export default function Page() {
  return <HeritageView />;
}
