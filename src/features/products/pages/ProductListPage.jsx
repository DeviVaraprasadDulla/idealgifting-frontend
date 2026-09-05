import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

import { getProducts, getFilters } from "../../../api/productApi";
import { getMegaMenu } from "../../../api/categoryApi";

import ProductCard from "../components/ProductCard";
import PageBanner from "../../../components/common/PageBanner";

const FilterGroups = ({ filters, selectedFilters, toggleFilter, compact }) => (
  <>
    {filters.length === 0 && (
      <p className="text-sm text-muted">No filters available for this category.</p>
    )}

    {filters.map((filter) => (
      <div key={filter.filter_id} className={compact ? "mb-6" : "mb-5"}>
        <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold mb-3">
          {filter.filter_name}
        </h4>

        <div className="flex flex-wrap gap-2">
          {filter.options.map((opt) => {
            const on = selectedFilters.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleFilter(opt.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  on
                    ? "bg-navy text-ivory shadow-none"
                    : "bg-paper text-navy shadow-[inset_0_0_0_1.3px_rgba(15,33,64,.13)] hover:shadow-[inset_0_0_0_1.3px_rgba(15,33,64,.4)] hover:-translate-y-0.5"
                }`}
              >
                {opt.value}
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </>
);

function ProductListPage() {
  const { categorySlug } = useParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ================= LOAD CATEGORIES =================
  const loadCategories = useCallback(async () => {
    try {
      const data = await getMegaMenu();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

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

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div>
      <PageBanner
        eyebrow="Shop"
        title={activeCategory ? activeCategory.name : "All Gifts"}
        lede="Browse the full catalogue and narrow it down by category and filters."
      />

      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)] grid grid-cols-1 lg:grid-cols-4 gap-[clamp(20px,3vw,40px)]">
        {/* ================= DESKTOP SIDEBAR ================= */}
        <div className="hidden lg:block lg:col-span-1 space-y-6 sticky top-[112px] h-fit">
          {/* Categories */}
          <div className="bg-paper p-5 rounded-rl shadow-card">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold mb-4">
              Categories
            </h3>

            <div className="space-y-1">
              <Link
                to="/products"
                className={`block px-3 py-2 rounded-rs text-sm transition-colors ${
                  !categorySlug
                    ? "bg-navy text-ivory font-semibold"
                    : "text-navy hover:bg-navy/[0.05]"
                }`}
              >
                All Products
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products/category/${cat.slug}`}
                  className={`block px-3 py-2 rounded-rs text-sm transition-colors ${
                    categorySlug === cat.slug
                      ? "bg-navy text-ivory font-semibold"
                      : "text-navy hover:bg-navy/[0.05]"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Filters */}
          {categorySlug && (
            <div className="bg-paper p-5 rounded-rl shadow-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  Filters
                </h3>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-burgundy font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              <FilterGroups
                filters={filters}
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
              />
            </div>
          )}
        </div>

        {/* ================= PRODUCT GRID ================= */}
        <div className="lg:col-span-3">
          {/* Mobile Filter Button */}
          {categorySlug && (
            <div className="lg:hidden mb-5">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="inline-flex items-center gap-2 bg-navy text-ivory px-5 py-3 rounded-full w-full justify-center font-medium shadow-card"
              >
                <SlidersHorizontal size={16} />
                Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
              </button>
            </div>
          )}

          <p className="text-sm text-muted mb-6">
            {loading ? "Loading..." : `${products.length} gifts match your selection`}
          </p>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(14px,1.7vw,24px)]">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-paper rounded-rl h-72 animate-pulse"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-paper rounded-rl shadow-card">
              <p className="text-navy font-display font-semibold text-lg mb-2">
                Nothing matches that combination — yet.
              </p>
              <p className="text-muted text-sm">Try clearing a filter or two.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(14px,1.7vw,24px)]"
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
            <motion.div
              className="fixed inset-0 bg-navy/40 z-[140]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
            />

            <motion.div
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-ivory z-[150] p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-semibold text-lg text-navy">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-9 h-9 rounded-full grid place-items-center hover:bg-navy/5"
                >
                  <X size={20} className="text-navy" />
                </button>
              </div>

              <FilterGroups
                filters={filters}
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                compact
              />

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="bg-navy text-ivory w-full py-3 rounded-full font-semibold shadow-card"
                >
                  Apply Filters
                </button>

                <button
                  onClick={clearFilters}
                  className="w-full py-3 rounded-full font-medium text-navy shadow-[inset_0_0_0_1.4px_rgba(15,33,64,.2)]"
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
