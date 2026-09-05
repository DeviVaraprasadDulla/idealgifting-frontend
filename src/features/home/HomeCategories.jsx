import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../api/axios";

const HomeCategories = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = useCallback(async () => {
    try {
      const res = await axios.get("categories/?is_trending=true");
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Category load error:", err);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  if (!Array.isArray(categories) || categories.length === 0) return null;

  return (
    <section className="bg-paper py-6">
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide md:justify-center items-start">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0"
            >
              <Link
                to={`/products?category_slug=${cat.slug}`}
                className="flex flex-col items-center group"
              >
                <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full p-[3px] bg-gradient-to-br from-peach to-peach-deep shadow-card group-hover:shadow-elevated transition-shadow">
                  <div className="w-full h-full rounded-full overflow-hidden bg-world-soft">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <p className="mt-2 text-xs md:text-sm font-medium text-center whitespace-nowrap text-navy">
                  {cat.name}
                </p>

                <p className="text-[11px] text-muted">
                  {cat.product_count} items
                </p>
              </Link>
            </motion.div>
          ))}

          <div className="flex-shrink-0">
            <Link to="/products" className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full bg-navy flex items-center justify-center shadow-card hover:scale-105 transition-transform">
                <span className="text-ivory text-lg">→</span>
              </div>
              <p className="mt-2 text-xs md:text-sm font-medium whitespace-nowrap text-navy">
                View All
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
