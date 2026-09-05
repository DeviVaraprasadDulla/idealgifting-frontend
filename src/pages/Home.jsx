import HeroSection from "../components/HeroSection";
import HomeCategories from "../features/home/HomeCategories";
import FeaturedProducts from "../features/home/FeaturedProducts";
import AboutSection from "../components/AboutSection";
import Highlights from "../components/common/Highlights";

function Home() {
  return (
    <>
      <HeroSection />
      <HomeCategories />
      <FeaturedProducts />
      <AboutSection />
      <Highlights />
    </>
  );
}

export default Home;
