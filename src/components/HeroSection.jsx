import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getBanners } from "../api/bannerApi";
import { useNavigate } from "react-router-dom";

const AUTO_DELAY = 6000;

const HeroSection = () => {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Welcome Back";

  useEffect(() => {
    getBanners().then((data) => setBanners(data));
  }, []);

  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      nextSlide();
    }, AUTO_DELAY);

    return () => clearInterval(interval);
  }, [banners, current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
    setProgressKey((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    setProgressKey((prev) => prev + 1);
  };

  const getFestivalStyle = (festival) => {
    switch (festival) {
      case "valentine":
        return "from-pink-600/70 via-rose-500/40 to-transparent";
      case "birthday":
        return "from-purple-600/70 via-indigo-500/40 to-transparent";
      case "anniversary":
        return "from-yellow-600/70 via-amber-400/40 to-transparent";
      default:
        return "from-black/60 via-black/30 to-transparent";
    }
  };

  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section className="bg-lightbg relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8">
        <div
          className="
            relative
            aspect-[16/9]
            sm:aspect-[16/7]
            lg:aspect-[16/5]
            rounded-2xl
            md:rounded-3xl
            overflow-hidden
            shadow-xl
            group
          "
        >
          {/* Background Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={banner.id}
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -80) nextSlide();
                if (offset.x > 80) prevSlide();
              }}
            />
          </AnimatePresence>

          {/* Dark Overlay for Better Readability */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Festival Gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${getFestivalStyle(
              banner.festival,
            )}`}
          />

          {/* Offer Badge */}
          {banner.offer_text && (
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-accent text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg z-20">
              ⭐ {banner.offer_text}
            </div>
          )}

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="px-6 md:px-16 max-w-md md:max-w-lg text-white">
              {/* Greeting */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-sm sm:text-base md:text-xl font-medium"
              >
                Hi {username} 👋
              </motion.h2>

              {/* Headline */}
              <motion.h1
                key={banner.id + "-title"}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-2xl sm:text-3xl md:text-5xl font-bold leading-snug mt-2"
              >
                {banner.title}
              </motion.h1>

              {/* Shop Now Button */}
              <motion.button
                onClick={() => navigate("/products")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 md:mt-6 bg-white text-primary px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold shadow-lg text-sm md:text-base"
              >
                Shop Now
              </motion.button>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-3 rounded-full shadow opacity-0 group-hover:opacity-100 transition z-20"
          >
            ❮
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-3 rounded-full shadow opacity-0 group-hover:opacity-100 transition z-20"
          >
            ❯
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
            <motion.div
              key={progressKey}
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: AUTO_DELAY / 1000,
                ease: "linear",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
