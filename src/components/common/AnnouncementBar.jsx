import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";

const AnnouncementBar = ({ onHeightChange }) => {
  const [announcement, setAnnouncement] = useState(null);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const barRef = useRef(null);

  // Fetch
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await API.get("/settings/announcement/");
        setAnnouncement(res.data);
      } catch (err) {
        console.log("No active announcement");
      }
    };

    fetchAnnouncement();
  }, []);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic height detection
  useEffect(() => {
    if (barRef.current && visible && !dismissed) {
      onHeightChange(barRef.current.offsetHeight);
    } else {
      onHeightChange(0);
    }
  }, [visible, dismissed, announcement]);

  if (!announcement || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={barRef}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="
            fixed top-0 left-0 right-0 z-50
            bg-gradient-to-r from-[#e0564a] to-[#cf4a3b]
            text-white text-sm font-medium
            flex items-center justify-center
            shadow-md py-2
          "
        >
          <div className="max-w-7xl w-full px-4 flex items-center justify-center relative">
            <span className="text-center truncate">{announcement.message}</span>

            <button
              onClick={() => setDismissed(true)}
              className="absolute right-4 text-white/80 hover:text-white text-lg"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
