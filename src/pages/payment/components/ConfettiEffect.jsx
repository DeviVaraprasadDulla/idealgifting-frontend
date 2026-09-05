import { useEffect } from "react";
import confetti from "canvas-confetti";

const ConfettiEffect = () => {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#0F2140", "#F3C39C", "#E5A170", "#C79A5B", "#FCF8F1"],
    });
  }, []);

  return null;
};

export default ConfettiEffect;
