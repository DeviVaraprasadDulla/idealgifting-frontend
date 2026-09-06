import HeroSection from "../components/HeroSection";
import Ribbon from "../components/common/Ribbon";
import FeelingsSection from "../features/home/FeelingsSection";
import OccasionMosaic from "../features/home/OccasionMosaic";
import GiftFinderTeaser from "../features/home/GiftFinderTeaser";
import FeaturedProducts from "../features/home/FeaturedProducts";
import EditorialBand from "../features/home/EditorialBand";
import ProcessSteps from "../features/home/ProcessSteps";
import StoriesPreview from "../features/home/StoriesPreview";
import CorporatePromo from "../features/home/CorporatePromo";

// Exact reference section order: hero, ribbon, feelings, occasions,
// gift-finder teaser, featured, editorial, how-it-works, stories, corporate.
function Home() {
  return (
    <>
      <HeroSection />
      <Ribbon />
      <FeelingsSection />
      <OccasionMosaic />
      <GiftFinderTeaser />
      <FeaturedProducts />
      <EditorialBand />
      <ProcessSteps />
      <StoriesPreview />
      <CorporatePromo />
    </>
  );
}

export default Home;
