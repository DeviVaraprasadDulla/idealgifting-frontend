import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { ShoppingBag, Heart } from "lucide-react";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasDiscount = product.discount_percentage > 0;
  const wishlisted = isWishlisted(product.id);

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast("Please login to save to your wishlist");
      navigate("/login", { state: { from: { pathname: "/products" } } });
      return;
    }

    const nowWishlisted = await toggleWishlist(product.id);
    toast(nowWishlisted ? "Added to wishlist ❤️" : "Removed from wishlist");
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await addToCart(product.id);

    toast.custom((t) => (
      <div
        className={`bg-paper shadow-elevated rounded-rm p-3 flex items-center gap-3 w-72 transition ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <img
          src={product.images?.[0]?.image}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-rs"
        />
        <div className="flex-1">
          <p className="text-sm font-display font-semibold text-navy line-clamp-1">
            {product.name}
          </p>
          <p className="text-xs text-leaf">Added to your gift box ✓</p>
        </div>
        <Link
          to="/cart"
          className="text-xs bg-navy text-ivory px-3 py-1.5 rounded-full"
        >
          View
        </Link>
      </div>
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="bg-paper rounded-rl shadow-card hover:shadow-lift overflow-hidden transition-shadow"
    >
      <Link to={`/products/${product.slug}`} className="block relative">
        {/* IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-world-soft">
          <img
            src={product.images?.[0]?.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-navy text-ivory text-[0.66rem] font-bold uppercase tracking-[0.1em] px-[10px] py-[5px] rounded-full">
              {product.discount_percentage}% off
            </div>
          )}

          <button
            onClick={handleToggleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 bg-paper/90 backdrop-blur-sm p-2 rounded-full shadow-card hover:scale-110 transition-transform"
          >
            <Heart
              size={16}
              className={wishlisted ? "text-burgundy fill-burgundy" : "text-navy"}
            />
          </button>

          <button
            onClick={handleAddToCart}
            aria-label="Add to gift box"
            className="absolute bottom-3 right-3 bg-navy text-ivory p-3 rounded-full shadow-card hover:scale-110 transition-transform"
          >
            <ShoppingBag size={17} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-2">
          <h3 className="font-display font-semibold text-[1.05rem] leading-snug line-clamp-2 min-h-[2.6em] text-navy">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 text-sm text-muted">
            <span className="text-gold">★</span> {product.average_rating || 0}{" "}
            ({product.rating_count || 0})
          </div>

          <div className="flex items-center gap-2">
            <span className="font-num font-extrabold text-[1.15rem] text-navy">
              ₹{product.discounted_price}
            </span>

            {hasDiscount && (
              <span className="font-num text-muted line-through text-sm">
                ₹{product.price}
              </span>
            )}
          </div>

          <div className="pt-1">
            <span className="inline-flex items-center gap-1 text-sm text-peach-deep font-semibold">
              Personalise it <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;
