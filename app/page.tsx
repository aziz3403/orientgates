import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import SignatureMasterpieces from "@/components/home/SignatureMasterpieces";
import HeritageStory from "@/components/home/HeritageStory";
import CraftsmanshipPreview from "@/components/home/CraftsmanshipPreview";
import TrustSection from "@/components/home/TrustSection";
import InquiryCTA from "@/components/home/InquiryCTA";
import ArabesqueDivider from "@/components/ui/ArabescqueDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <ArabesqueDivider />
      <FeaturedCategories />
      <SignatureMasterpieces />
      <ArabesqueDivider />
      <HeritageStory />
      <CraftsmanshipPreview />
      <ArabesqueDivider />
      <TrustSection />
      <InquiryCTA />
    </>
  );
}
