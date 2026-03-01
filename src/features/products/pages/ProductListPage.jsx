import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { getProducts, getFilters } from "../../../api/productApi";
import { getMegaMenu } from "../../../api/categoryApi";

import ProductCard from "../components/ProductCard";

function ProductListPage() {
  const { categorySlug } = useParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ================= LOAD CATEGORIES =================
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getMegaMenu();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
  }, []);

  // ================= LOAD CATEGORY FILTERS =================
  useEffect(() => {
    const loadFilters = async () => {
      try {
        if (!categorySlug) {
          setFilters([]);
          return;
        }

        const selectedCategory = categories.find(
          (cat) => cat.slug === categorySlug,
        );

        if (!selectedCategory) {
          setFilters([]);
          return;
        }

        const res = await getFilters(selectedCategory.id);
        setFilters(res.data);
        setSelectedFilters([]);
      } catch (err) {
        console.error("Filter load error:", err);
      }
    };

    if (categories.length > 0) {
      loadFilters();
    }
  }, [categorySlug, categories]);

  // ================= LOAD PRODUCTS =================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const res = await getProducts({
          categorySlug: categorySlug,
          filters: selectedFilters,
        });

        setProducts(res.data);
      } catch (err) {
        console.error("Product load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categorySlug, selectedFilters]);

  // ================= HANDLE FILTER =================
  const toggleFilter = (id) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ================= DESKTOP SIDEBAR ================= */}
        <div className="hidden lg:block lg:col-span-1 space-y-6 sticky top-28 h-fit">
          {/* Categories */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-4">Categories</h3>

            <div className="space-y-2">
              <Link
                to="/products"
                className={!categorySlug ? "block font-bold" : "block"}
              >
                All Products
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products/category/${cat.slug}`}
                  className={
                    categorySlug === cat.slug ? "block font-bold" : "block"
                  }
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Filters */}
          {categorySlug && (
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filters</h3>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500"
                  >
                    Clear
                  </button>
                )}
              </div>

              {filters.length === 0 && (
                <p className="text-sm text-gray-400">No filters available</p>
              )}

              {filters.map((filter) => (
                <div key={filter.filter_id} className="mb-4">
                  <h4 className="text-sm font-medium mb-2">
                    {filter.filter_name}
                  </h4>

                  {filter.options.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 text-sm mb-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(opt.id)}
                        onChange={() => toggleFilter(opt.id)}
                      />
                      {opt.value}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= PRODUCT GRID ================= */}
        <div className="lg:col-span-3">
          {/* Mobile Filter Button */}
          {categorySlug && (
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="bg-black text-white px-4 py-2 rounded-lg w-full"
              >
                Filters ({selectedFilters.length})
              </button>
            </div>
          )}

          <h1 className="text-2xl font-bold mb-6 capitalize">
            {categorySlug || "All Products"}
          </h1>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl h-72 animate-pulse"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 h-full w-3/4 bg-white z-50 p-5 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-red-500"
                >
                  Close
                </button>
              </div>

              {filters.map((filter) => (
                <div key={filter.filter_id} className="mb-4">
                  <h4 className="text-sm font-medium mb-2">
                    {filter.filter_name}
                  </h4>

                  {filter.options.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 text-sm mb-1"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(opt.id)}
                        onChange={() => toggleFilter(opt.id)}
                      />
                      {opt.value}
                    </label>
                  ))}
                </div>
              ))}

              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="bg-black text-white w-full py-2 rounded-lg"
                >
                  Apply Filters
                </button>

                <button
                  onClick={clearFilters}
                  className="border w-full py-2 rounded-lg"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductListPage;
