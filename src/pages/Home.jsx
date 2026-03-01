import HeroSection from "../components/HeroSection";
import HomeCategories from "../features/home/HomeCategories";
import FeaturedProducts from "../features/home/FeaturedProducts";
import AboutSection from "../components/AboutSection";

function Home() {
  return (
    <>
      <HomeCategories />
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
    </>
  );
}

export default Home;
