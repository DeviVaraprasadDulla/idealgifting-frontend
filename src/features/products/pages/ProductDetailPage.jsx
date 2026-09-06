import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { getProductDetail, getProducts } from "../../../api/productApi";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { useAuth } from "../../../context/AuthContext";
import ProductCard from "../components/ProductCard";
import PersonalizationStudio from "../components/PersonalizationStudio";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  // Lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  // Pinch zoom
  const [scale, setScale] = useState(1);
  const lastDistance = useRef(null);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProductDetail(slug);
      const data = res.data;

      setProduct(data);
      setMainImage(data.images?.[0]?.image);

      if (data.category_name) {
        const relatedRes = await getProducts({
          category_slug: data.category_name,
        });

        const filtered = relatedRes.data.filter((p) => p.id !== data.id);

        setRelated(filtered.slice(0, 4));
      }
    } catch (err) {
      console.error("Detail load error:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setScale(1);
    setIsOpen(true);
  };

  const nextImage = () => {
    setScale(1);
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setScale(1);
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  // Pinch Zoom Logic
  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (lastDistance.current) {
        const zoomFactor = distance / lastDistance.current;
        setScale((prev) => Math.min(Math.max(prev * zoomFactor, 1), 4));
      }

      lastDistance.current = distance;
    }
  };

  const handleTouchEnd = () => {
    lastDistance.current = null;
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-navy font-display">
        Loading...
      </div>
    );
  }
const handleBuyNow = async () => {
  if (!product) return;

  if (product.stock <= 0) {
    alert("This product is currently out of stock.");
    return;
  }

  try {
    setBuyNowLoading(true);

    const alreadyInCart = cartItems.some(
      (item) => item.product_id === product.id
    );

    if (!alreadyInCart) {
      await addToCart(product.id, 1);
    }

    navigate("/checkout");

  } catch (error) {
    console.error("Buy Now Error:", error);

    alert(
      error?.response?.data?.error ||
      "Unable to proceed to checkout."
    );
  } finally {
    setBuyNowLoading(false);
  }
};
const handleToggleWishlist = async () => {
  if (!user) {
    toast("Please login to save to your wishlist");
    navigate("/login", { state: { from: { pathname: `/products/${slug}` } } });
    return;
  }

  const nowWishlisted = await toggleWishlist(product.id);
  toast(nowWishlisted ? "Added to wishlist ❤️" : "Removed from wishlist");
};

const handleAddToCart = async () => {
  if (!product) return;

  if (product.stock <= 0) {
    alert("This product is currently out of stock.");
    return;
  }

  try {
    setAddToCartLoading(true);

    await addToCart(product.id, 1);
  } catch (error) {
    console.error("Add To Cart Error:", error);

    alert(
      error?.response?.data?.error ||
      "Failed to add product to cart."
    );
  } finally {
    setAddToCartLoading(false);
  }
};
  return (
    <>
      {/* ================= MAIN PAGE ================= */}
      <div className="min-h-screen py-8 md:py-12 pb-28 lg:pb-12">
        <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)]">
          {/* BREADCRUMB */}
          <div className="text-sm text-muted mb-6 flex items-center gap-2 flex-wrap">
            <span>Home</span>
            <span>/</span>
            <span>Gifts</span>
            <span>/</span>
            <span className="text-navy font-medium">{product.name}</span>
          </div>

          {/* TOP SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-paper rounded-rl shadow-card p-6 md:p-10">
            {/* IMAGE SECTION */}
            <div className="space-y-4 lg:sticky lg:top-[112px] lg:self-start">
              <div
                className="relative overflow-hidden rounded-rl group cursor-zoom-in bg-world-soft"
                onClick={() => openLightbox(0)}
              >
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  className="w-full h-[350px] sm:h-[450px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images?.map((img, index) => (
                  <img
                    key={img.id}
                    src={img.image}
                    onClick={() => {
                      setMainImage(img.image);
                      openLightbox(index);
                    }}
                    className={`h-20 w-20 object-cover rounded-rs cursor-pointer border-2 transition-colors ${
                      mainImage === img.image
                        ? "border-navy"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="space-y-6">
              <h1 className="text-d3 text-navy">{product.name}</h1>

              <div className="flex items-center gap-2">
                <span className="text-gold font-medium">
                  ★ {product.average_rating}
                </span>
                <span className="text-muted text-sm">
                  ({product.rating_count} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-num font-extrabold text-3xl text-navy">
                  ₹{product.discounted_price}
                </span>

                {product.discount_percentage > 0 && (
                  <>
                    <span className="font-num line-through text-muted text-lg">
                      ₹{product.price}
                    </span>
                    <span className="bg-navy text-ivory text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                      {product.discount_percentage}% off
                    </span>
                  </>
                )}
              </div>

              <div>
                {product.stock > 0 ? (
                  <span className="text-leaf font-medium">In Stock</span>
                ) : (
                  <span className="text-burgundy font-medium">Out of Stock</span>
                )}
              </div>

              <p className="text-muted leading-relaxed">
                {product.description}
              </p>

              <div className="pt-2">
                <PersonalizationStudio product={product} />
              </div>

              <div className="hidden lg:flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addToCartLoading || product.stock <= 0}
                  className="w-full bg-navy text-ivory py-3.5 rounded-full font-semibold shadow-card hover:-translate-y-0.5 hover:shadow-elevated transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  {addToCartLoading
                    ? "Adding..."
                    : product.stock <= 0
                      ? "Out of Stock"
                      : "Add to Gift Box"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={buyNowLoading || product.stock <= 0}
                  className="w-full bg-peach text-navy py-3.5 rounded-full font-semibold shadow-card hover:-translate-y-0.5 hover:shadow-elevated transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  {buyNowLoading ? "Processing..." : "Buy Now"}
                </button>

                <button
                  onClick={handleToggleWishlist}
                  aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  className="flex-shrink-0 w-[52px] h-[52px] rounded-full shadow-[inset_0_0_0_1.4px_rgba(15,33,64,.15)] grid place-items-center hover:bg-navy/5 transition-colors"
                >
                  <Heart
                    size={20}
                    className={isWishlisted(product.id) ? "text-burgundy fill-burgundy" : "text-navy"}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div id="reviews" className="mt-14 bg-paper rounded-rl shadow-card p-8">
            <h2 className="text-d4 text-navy mb-6">Customer Reviews</h2>

            {product.reviews?.length === 0 ? (
              <p className="text-muted">No reviews yet.</p>
            ) : (
              <div className="space-y-6">
                {product.reviews?.map((review) => (
                  <div key={review.id} className="border-b border-navy/10 pb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-navy">{review.user_name}</span>
                      <span className="text-gold">
                        {"★".repeat(review.rating)}
                      </span>
                    </div>

                    <p className="text-sm text-muted mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RELATED PRODUCTS */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-d4 text-navy mb-8">You might also like</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(14px,1.7vw,24px)]">
                {related.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE STICKY BUY BAR ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] bg-ivory/95 backdrop-blur-md border-t border-navy/10 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] flex gap-3 shadow-[0_-14px_22px_-18px_rgba(15,33,64,.45)]">
        <button
          onClick={handleAddToCart}
          disabled={addToCartLoading || product.stock <= 0}
          className="flex-1 bg-navy text-ivory py-3 rounded-full font-semibold text-sm disabled:opacity-40"
        >
          {addToCartLoading ? "Adding..." : product.stock <= 0 ? "Out of Stock" : "Add to Gift Box"}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={buyNowLoading || product.stock <= 0}
          className="flex-1 bg-peach text-navy py-3 rounded-full font-semibold text-sm disabled:opacity-40"
        >
          {buyNowLoading ? "Processing..." : "Buy Now"}
        </button>
        <button
          onClick={handleToggleWishlist}
          aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          className="flex-shrink-0 w-[46px] rounded-full shadow-[inset_0_0_0_1.4px_rgba(15,33,64,.15)] grid place-items-center"
        >
          <Heart
            size={18}
            className={isWishlisted(product.id) ? "text-burgundy fill-burgundy" : "text-navy"}
          />
        </button>
      </div>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-navy z-[160] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-ivory text-3xl"
            >
              ✕
            </button>

            <div className="absolute top-4 left-4 text-ivory bg-ivory/10 px-4 py-1 rounded-full text-sm">
              {currentIndex + 1} / {product.images.length}
            </div>

            <motion.img
              key={currentIndex}
              src={product.images[currentIndex].image}
              drag={scale > 1}
              dragConstraints={{
                left: -300,
                right: 300,
                top: -300,
                bottom: 300,
              }}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ scale }}
              className="max-h-[90vh] max-w-[95vw] object-contain"
            />

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory text-4xl"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory text-4xl"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductDetailPage;
