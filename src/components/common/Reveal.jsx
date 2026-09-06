import { useEffect, useRef, useState } from "react";

/**
 * Exact reproduction of the reference's scroll-reveal (an
 * IntersectionObserver adding an `in` class once, rootMargin -40px,
 * staggered by index) via the .reveal / .reveal.in CSS in index.css.
 */
function Reveal({ as: Tag = "div", index = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-40px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " in" : ""} ${className}`}
      style={{ transitionDelay: `${Math.min((index % 4) * 60, 180)}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
