import { useEffect, useState } from "react";
import PageBanner from "../components/common/PageBanner";
import ProductCard from "../features/products/components/ProductCard";
import { getProducts } from "../api/productApi";

/**
 * "Our Stories" - the reference's testimonial-wall concept, rebuilt around
 * data that is actually real. The existing Review model only stores a
 * numeric rating (no review text), so there is no real quote text to
 * display - reproducing the reference's pull-quote cards would mean
 * inventing customer words, which is not acceptable. Instead this page
 * surfaces genuinely real aggregate rating data and the real
 * highest-rated products, and keeps the narrative section clearly
 * editorial (unattributed, no invented founder biography or stats).
 */
function Stories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ sort: "best_selling" })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const totalReviews = products.reduce((sum, p) => sum + (p.rating_count || 0), 0);
  const weightedAverage =
    totalReviews > 0
      ? (
          products.reduce((sum, p) => sum + (p.average_rating || 0) * (p.rating_count || 0), 0) /
          totalReviews
        ).toFixed(1)
      : null;

  const topRated = [...products]
    .filter((p) => (p.rating_count || 0) > 0)
    .sort((a, b) => b.average_rating - a.average_rating || b.rating_count - a.rating_count)
    .slice(0, 8);

  return (
    <div>
      <PageBanner
        eyebrow="Our stories"
        title="Loved, one gift at a time."
        world="love"
        glyph="💌"
      />

      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        {/* Real, live-computed stats - never invented numbers */}
        {!loading && totalReviews > 0 && (
          <div className="flex flex-wrap gap-10 justify-center mb-16 text-center">
            <div>
              <b className="font-num text-3xl font-extrabold text-navy block">{weightedAverage}★</b>
              <span className="text-sm text-muted">Average rating</span>
            </div>
            <div>
              <b className="font-num text-3xl font-extrabold text-navy block">{totalReviews}</b>
              <span className="text-sm text-muted">Verified reviews</span>
            </div>
          </div>
        )}

        <h2 className="text-d3 text-navy text-center mb-2">What customers are loving</h2>
        <p className="text-muted text-center mb-10 max-w-xl mx-auto">
          Real ratings from real orders — sorted by what's earned the most love.
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(14px,1.7vw,24px)]">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-paper rounded-rl h-72 animate-pulse" />
            ))}
          </div>
        ) : topRated.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(14px,1.7vw,24px)]">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">
            Reviews are still coming in — check back soon.
          </p>
        )}

        {/* Clearly editorial - no invented founder, no fabricated quote */}
        <div className="mt-20 bg-navy text-cream rounded-rxl p-[clamp(26px,4vw,58px)] text-center">
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-peach mb-4">
            From the studio
          </span>
          <p className="font-display italic text-[clamp(1.4rem,2.6vw,2.1rem)] leading-snug max-w-2xl mx-auto">
            "Every gift starts with someone's story — we just help you tell it."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stories;
