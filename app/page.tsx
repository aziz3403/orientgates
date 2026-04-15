import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import SignatureMasterpieces from "@/components/home/SignatureMasterpieces";
import HeritageStory from "@/components/home/HeritageStory";
import CraftsmanshipPreview from "@/components/home/CraftsmanshipPreview";
import TrustSection from "@/components/home/TrustSection";
import InquiryCTA from "@/components/home/InquiryCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brass/[0.08] to-transparent" />
      <FeaturedCategories />
      <SignatureMasterpieces />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brass/[0.08] to-transparent" />
      <HeritageStory />
      <CraftsmanshipPreview />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brass/[0.08] to-transparent" />
      <TrustSection />
      <InquiryCTA />
    </>
  );
}
