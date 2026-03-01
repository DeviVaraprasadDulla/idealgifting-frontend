import { motion } from "framer-motion";
import { useState } from "react";

const FloatingWhatsApp = () => {
  const [hovered, setHovered] = useState(false);

  const phoneNumber = "916305540600"; // change later
  const message = "Hi, I need help with my order.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center">
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{
          opacity: hovered ? 1 : 0,
          x: hovered ? 0 : 8,
        }}
        transition={{ duration: 0.2 }}
        className="relative mr-3 hidden md:block"
      >
        <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg">
          Chat with us
        </div>
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gray-900 rotate-45"></div>
      </motion.div>

      {/* Button (NO SHADOW / NO GLOW) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          className="w-6 h-6 md:w-7 md:h-7"
        >
          <path d="M16 .396C7.163.396 0 7.559 0 16.396c0 2.885.756 5.598 2.073 7.965L0 32l7.857-2.041a15.93 15.93 0 0 0 8.143 2.237c8.837 0 16-7.163 16-16S24.837.396 16 .396zm0 29.165c-2.553 0-4.967-.662-7.075-1.828l-.505-.299-4.66 1.211 1.243-4.541-.329-.527a13.962 13.962 0 0 1-2.145-7.381c0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14zm7.595-10.485c-.414-.207-2.45-1.207-2.829-1.343-.379-.138-.655-.207-.931.207s-1.07 1.343-1.312 1.621c-.241.276-.482.31-.896.103-.414-.207-1.747-.643-3.328-2.049-1.23-1.096-2.059-2.449-2.3-2.863-.241-.414-.026-.638.181-.845.187-.186.414-.482.621-.724.207-.241.276-.414.414-.69.138-.276.069-.517-.034-.724-.103-.207-.931-2.242-1.276-3.069-.336-.807-.677-.698-.931-.711l-.793-.014c-.276 0-.724.103-1.103.517s-1.448 1.414-1.448 3.448c0 2.034 1.483 4 1.69 4.276.207.276 2.92 4.459 7.084 6.254.99.427 1.762.681 2.364.871.993.315 1.897.271 2.613.165.797-.119 2.45-1 2.794-1.966.345-.965.345-1.793.241-1.966-.103-.172-.379-.276-.793-.483z" />
        </svg>
      </motion.a>
    </div>
  );
};

export default FloatingWhatsApp;
