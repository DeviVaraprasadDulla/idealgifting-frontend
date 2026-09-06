import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageBanner from "../../components/common/PageBanner";
import { getTaxonomy } from "../../api/taxonomyApi";

/**
 * Shared index grid for a named taxonomy (Occasion / Recipient), each card
 * tinted with its color world and showing a LIVE product count from the
 * real backend - never a fabricated number.
 */
function TaxonomyIndexPage({ taxonomyName, basePath, eyebrow, title, lede, bannerWorld, bannerGlyph, metaMap, defaultMeta }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getTaxonomy(taxonomyName)
      .then((res) => {
        if (active) setOptions(res.data);
      })
      .catch(() => {
        if (active) setOptions([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [taxonomyName]);

  return (
    <div>
      <PageBanner eyebrow={eyebrow} title={title} lede={lede} world={bannerWorld} glyph={bannerGlyph} />

      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(14px,1.7vw,24px)]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-paper rounded-rl h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(14px,1.7vw,24px)]">
            {options.map((opt) => {
              const meta = metaMap[opt.value] || defaultMeta;
              return (
                <Link
                  key={opt.id}
                  to={`${basePath}/${opt.id}`}
                  data-world={meta.world}
                  className="relative bg-world-soft rounded-rl p-6 overflow-hidden transition-transform hover:-translate-y-1 shadow-[0_1px_2px_rgba(15,33,64,.05)]"
                >
                  <span className="absolute top-4 right-4 text-[0.66rem] font-bold uppercase tracking-[0.1em] bg-paper/70 px-[10px] py-[5px] rounded-full text-world-deep">
                    {opt.product_count} {opt.product_count === 1 ? "gift" : "gifts"}
                  </span>

                  <div className="w-[52px] h-[52px] rounded-[16px] bg-world grid place-items-center text-2xl mb-4">
                    {meta.glyph}
                  </div>

                  <h3 className="font-display font-semibold text-[1.2rem] text-navy mb-1">
                    {opt.value}
                  </h3>

                  {meta.line && <p className="text-sm text-muted">{meta.line}</p>}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaxonomyIndexPage;
