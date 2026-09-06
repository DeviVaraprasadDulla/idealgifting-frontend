import HeroSection from "../components/HeroSection";
import FeelingsSection from "../features/home/FeelingsSection";
import OccasionMosaic from "../features/home/OccasionMosaic";
import GiftFinderTeaser from "../features/home/GiftFinderTeaser";
import FeaturedProducts from "../features/home/FeaturedProducts";
import StoriesPreview from "../features/home/StoriesPreview";
import CorporatePromo from "../features/home/CorporatePromo";
import AboutSection from "../components/AboutSection";
import Highlights from "../components/common/Highlights";

function Home() {
  return (
    <>
      <HeroSection />
      <FeelingsSection />
      <OccasionMosaic />
      <GiftFinderTeaser />
      <FeaturedProducts />
      <StoriesPreview />
      <CorporatePromo />
      <AboutSection />
      <Highlights />
    </>
  );
}

export default Home;
