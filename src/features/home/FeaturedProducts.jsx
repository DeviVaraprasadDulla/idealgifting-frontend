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
        setProducts(response.data); // IMPORTANT
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 bg-lightbg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Gifts
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Handpicked just for you
            </p>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <p className="text-gray-500 text-center">
            No featured products available.
          </p>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
