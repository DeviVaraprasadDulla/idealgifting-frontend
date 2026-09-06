import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../products/components/ProductCard";
import Button from "../../components/ui/Button";

function StoriesPreview() {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    getProducts({ sort: "best_selling" })
      .then((res) => {
        const rated = res.data
          .filter((p) => (p.rating_count || 0) > 0)
          .sort((a, b) => b.average_rating - a.average_rating)
          .slice(0, 4);
        setTopRated(rated);
      })
      .catch(() => setTopRated([]));
  }, []);

  if (topRated.length === 0) return null;

  return (
    <section className="py-[clamp(56px,7.5vw,110px)]">
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
              Our stories
            </span>
            <h2 className="text-d2 text-navy mt-3">Loved, one gift at a time.</h2>
          </div>
          <Button to="/stories" variant="ghost">
            Read our stories →
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(14px,1.7vw,24px)]">
          {topRated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoriesPreview;
