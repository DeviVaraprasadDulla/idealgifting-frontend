import { useEffect, useState } from "react";
import ProductCard from "../products/components/ProductCard"; // adjust path if needed
import { getFeaturedProducts } from "../../api/productApi";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getFeaturedProducts();
        setProducts(Array.isArray(response) ? response : response.data || []); // IMPORTANT
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-[clamp(56px,7.5vw,110px)]">
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)]">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-5 mb-[clamp(28px,4vw,52px)]">
          <div>
            <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold before:content-[''] before:w-[26px] before:h-px before:bg-current before:opacity-60">
              Handpicked
            </span>
            <h2 className="mt-3 text-d2 text-navy">Featured Gifts</h2>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[clamp(14px,1.7vw,24px)]">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-paper rounded-rl h-80 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && Array.isArray(products) && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[clamp(14px,1.7vw,24px)]">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && (!Array.isArray(products) || products.length === 0) && (
          <p className="text-muted text-center">
            No featured products available.
          </p>
        )}
      </div>
    </section>
  );
}
export default FeaturedProducts;
