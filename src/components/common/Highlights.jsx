import { motion } from "framer-motion";

const items = [
  "🎁 Thoughtfully Curated Gifts for Every Occasion",
  "🚚 Fast & Reliable Delivery Across India",
  "💝 10,000+ Happy Customers & Counting",
  "✨ Unique & Personalized Gifting Experience",
];
const Highlights = () => {
  return (
    <div className="mt-6 md:mt-8">
      {/* CONTAINER ALIGNMENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* STRIP 1 */}
        <div className="rotate-[-1deg] bg-orange-500 py-1.5 rounded-md overflow-hidden">
          <motion.div
            className="flex gap-10 text-white text-sm font-medium whitespace-nowrap"
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
        <div className="rotate-[1deg] bg-gray-900 py-1.5 rounded-md mt-2 overflow-hidden">
          <motion.div
            className="flex gap-10 text-white text-sm font-medium whitespace-nowrap"
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
