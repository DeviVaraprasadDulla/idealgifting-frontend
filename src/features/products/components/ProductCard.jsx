import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { OCCASION_META, FEELING_META, DEFAULT_META } from "../../../data/taxonomyMeta";

// Derives a color "world" from the product's own real tagged
// Occasion/Feeling filters - never a fabricated or random assignment.
function worldFor(product) {
  const tags = product.filters || [];
  const occasion = tags.find((t) => t.filter_name === "Occasion");
  if (occasion && OCCASION_META[occasion.filter_option_value]) {
    return OCCASION_META[occasion.filter_option_value].world;
  }
  const feeling = tags.find((t) => t.filter_name === "Feeling");
  if (feeling && FEELING_META[feeling.filter_option_value]) {
    return FEELING_META[feeling.filter_option_value].world;
  }
  return DEFAULT_META.world;
}

/**
 * Exact reproduction of the reference's .p-card structure (badges,
 * wish-btn, art image, hover-revealed quick-look, category/name/hook,
 * price + CTA row) - see .p-card and friends in index.css. Content is
 * all real product data; only the visual scaffolding is the reference's.
 */
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

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product.id);
    toast.success("Added to your gift box ✓");
  };

  return (
    <article className="p-card" data-world={worldFor(product)}>
      <div className="p-media">
        <div className="p-badges">
          {product.is_best_selling && <span className="badge peach">Bestseller</span>}
          {hasDiscount && <span className="badge world">{product.discount_percentage}% off</span>}
        </div>

        <button
          className={`wish-btn${wishlisted ? " on" : ""}`}
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to your wishlist"}
          aria-pressed={wishlisted}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 20s-7-4.6-7-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7 3c0 4.8-7 9.4-7 9.4z" />
          </svg>
        </button>

        <Link to={`/products/${product.slug}`} aria-label={product.name}>
          <div className="art">
            {product.images?.[0]?.image && <img src={product.images[0].image} alt={product.name} />}
          </div>
        </Link>

        <div className="p-quick">
          <button className="btn btn-ivory btn-sm btn-block" onClick={handleQuickAdd}>
            Add to gift box
          </button>
        </div>
      </div>

      <div className="p-body">
        <span className="p-cat">{product.category_name}</span>
        <h3 className="p-name">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="p-hook">{product.description?.slice(0, 80)}</p>
        <div className="p-foot">
          <span className="price">
            ₹{product.discounted_price}
            {hasDiscount && <s>₹{product.price}</s>}
          </span>
          <Link className="p-cta" to={`/products/${product.slug}`}>
            Personalise it <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
