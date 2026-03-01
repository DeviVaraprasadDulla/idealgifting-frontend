import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../api/axios";

const HomeCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axios.get("categories/?is_trending=true");
      setCategories(res.data);
    } catch (err) {
      console.error("Category load error:", err);
    }
  };

  if (!categories.length) return null;

  return (
    <section className="bg-white py-3">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className="
            flex 
            gap-6 
            overflow-x-auto 
            scrollbar-hide 
            md:justify-center 
            items-start
          "
        >
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
                {/* Compact Circle */}
                <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full p-[2px] bg-gradient-to-br from-[#D4AF37] to-[#b8962e] shadow-sm group-hover:shadow-md transition">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Title */}
                <p className="mt-2 text-xs md:text-sm font-medium text-center whitespace-nowrap">
                  {cat.name}
                </p>

                {/* Product Count */}
                <p className="text-[11px] text-gray-500">
                  {cat.product_count} items
                </p>
              </Link>
            </motion.div>
          ))}

          {/* View All */}
          <div className="flex-shrink-0">
            <Link to="/products" className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full bg-[#0B1C2D] flex items-center justify-center shadow-md hover:scale-105 transition">
                <span className="text-white text-lg">→</span>
              </div>
              <p className="mt-2 text-xs md:text-sm font-medium whitespace-nowrap">
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
