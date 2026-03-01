import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext";
import toast from "react-hot-toast";
import { ShoppingCart, Eye } from "lucide-react";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const hasDiscount = product.discount_percentage > 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await addToCart(product.id);

    toast.custom((t) => (
      <div
        className={`bg-white shadow-xl rounded-xl p-3 flex items-center gap-3 w-72 transition ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <img
          src={product.images?.[0]?.image}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div className="flex-1">
          <p className="text-sm font-medium line-clamp-1">{product.name}</p>
          <p className="text-xs text-green-600">Added to cart ✓</p>
        </div>
        <Link
          to="/cart"
          className="text-xs bg-black text-white px-3 py-1.5 rounded-lg"
        >
          View
        </Link>
      </div>
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transition"
    >
      <Link to={`/products/${product.id}`} className="block relative">
        {/* IMAGE */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images?.[0]?.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500 hover:scale-105"
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-md font-medium shadow">
              {product.discount_percentage}% OFF
            </div>
          )}

          {/* Floating Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-black text-white 
                       p-2.5 rounded-full shadow-md 
                       hover:scale-110 transition"
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-[16px] leading-snug line-clamp-2 min-h-[42px]">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            ⭐ {product.average_rating || 0} ({product.rating_count || 0})
          </div>

          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold text-[17px]">
              ₹{product.discounted_price}
            </span>

            {hasDiscount && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.price}
              </span>
            )}
          </div>

          {/* View Button */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black transition font-medium">
              <Eye size={16} />
              View
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;
