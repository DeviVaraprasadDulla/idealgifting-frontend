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
            fixed top-0 left-0 right-0 z-[56]
            bg-navy text-cream text-[0.72rem] font-medium uppercase tracking-[0.16em]
            flex items-center justify-center
            py-[9px]
          "
        >
          <div className="max-w-wrap w-full px-[clamp(20px,5vw,64px)] flex items-center justify-center relative">
            <span className="text-center truncate">
              <span className="text-peach mr-2">✦</span>
              {announcement.message}
            </span>

            <button
              onClick={() => setDismissed(true)}
              className="absolute right-0 text-cream/70 hover:text-cream text-sm normal-case tracking-normal"
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
