import { motion } from "framer-motion";

const items = [
  "🎁 Thoughtfully Curated Gifts for Every Occasion",
  "🚚 Fast & Reliable Delivery Across India",
  "💝 10,000+ Happy Customers & Counting",
  "✨ Unique & Personalized Gifting Experience",
];
const Highlights = () => {
  return (
    <div className="mt-8 md:mt-10">
      {/* CONTAINER ALIGNMENT */}
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] relative">
        {/* STRIP 1 */}
        <div className="rotate-[-1deg] bg-navy py-2 rounded-rs overflow-hidden">
          <motion.div
            className="flex gap-10 text-cream text-sm font-medium whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "linear",
            }}
          >
            {[...items, ...items].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </motion.div>
        </div>

        {/* STRIP 2 */}
        <div className="rotate-[1deg] bg-peach-deep py-2 rounded-rs mt-2 overflow-hidden">
          <motion.div
            className="flex gap-10 text-navy text-sm font-semibold whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "linear",
            }}
          >
            {[...items, ...items].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
