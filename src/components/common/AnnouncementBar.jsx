import { useEffect, useRef, useState } from "react";
import API from "../../api/axios";

/**
 * Exact reproduction of the reference's scrolling marquee (.marquee /
 * .marquee-track, 34s linear infinite, content doubled for a seamless
 * loop, pauses on hover) - not a dismissible fixed banner. The real
 * backend currently returns a single active announcement rather than a
 * list, so that one real message is repeated to fill the strip - never
 * a fabricated additional message.
 */
const AnnouncementBar = ({ onHeightChange }) => {
  const [message, setMessage] = useState(null);
  const barRef = useRef(null);

  useEffect(() => {
    API.get("/settings/announcement/")
      .then((res) => setMessage(res.data?.message || null))
      .catch(() => setMessage(null));
  }, []);

  useEffect(() => {
    if (barRef.current) onHeightChange(barRef.current.offsetHeight);
    return () => onHeightChange(0);
  }, [message, onHeightChange]);

  if (!message) return null;

  const items = Array(6).fill(message);

  return (
    <div className="marquee" ref={barRef} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((rep) => (
          <span key={rep} style={{ display: "flex" }}>
            {items.map((text, i) => (
              <span key={i}>
                <i>✦</i>
                {text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
