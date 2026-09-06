/**
 * Exact reproduction of the reference's signature animated divider -
 * same viewBox and path data, drawn in via stroke-dashoffset (see
 * .ribbon-rule / @keyframes draw in index.css).
 */
const Ribbon = () => (
  <div className="wrap">
    <svg className="ribbon-rule" viewBox="0 0 1200 20" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 12 C 150 -6 250 22 400 10 S 700 -4 820 12 S 1080 20 1200 6" />
    </svg>
  </div>
);

export default Ribbon;
