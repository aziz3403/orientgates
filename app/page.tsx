import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import SignatureMasterpieces from "@/components/home/SignatureMasterpieces";
import HeritageStory from "@/components/home/HeritageStory";
import CraftsmanshipPreview from "@/components/home/CraftsmanshipPreview";
import AuctionTrust from "@/components/AuctionTrust";
import ExpertTeam from "@/components/home/ExpertTeam";
import MediaTrust from "@/components/home/MediaTrust";
import TrustSection from "@/components/home/TrustSection";
import InquiryCTA from "@/components/home/InquiryCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <SignatureMasterpieces />
      <HeritageStory />
      <CraftsmanshipPreview />
      <AuctionTrust />
      <ExpertTeam />
      <MediaTrust />
      <TrustSection />
      <InquiryCTA />
    </>
  );
}
