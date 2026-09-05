/**
 * Shared tinted hero-strip used at the top of most non-home pages,
 * matching the client reference's `pageBanner()` pattern.
 */
const PageBanner = ({ eyebrow, title, lede, world, glyph, children }) => {
  return (
    <section
      data-world={world}
      className="relative overflow-hidden bg-world-soft"
    >
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(40px,6vw,72px)]">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold before:content-[''] before:w-[26px] before:h-px before:bg-current before:opacity-60">
            {glyph ? `${glyph} ` : ""}
            {eyebrow}
          </span>
        )}

        {title && (
          <h1 className="mt-3 text-d2 text-navy max-w-3xl">{title}</h1>
        )}

        {lede && (
          <p className="mt-4 max-w-2xl text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-muted">
            {lede}
          </p>
        )}

        {children}
      </div>
    </section>
  );
};

export default PageBanner;
