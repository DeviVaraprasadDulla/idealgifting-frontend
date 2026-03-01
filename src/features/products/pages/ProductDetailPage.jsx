import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { getProductDetail, getProducts } from "../../../api/productApi";
import { useCart } from "../../../context/CartContext";
import ProductCard from "../components/ProductCard";

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Pinch zoom
  const [scale, setScale] = useState(1);
  const lastDistance = useRef(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await getProductDetail(id);
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
  };

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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* ================= MAIN PAGE ================= */}
      <div className="bg-gray-100 min-h-screen py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* TOP SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl shadow-sm p-6 md:p-10">
            {/* IMAGE SECTION */}
            <div className="space-y-4">
              <div
                className="relative overflow-hidden rounded-xl group cursor-zoom-in"
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
                    className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 ${
                      mainImage === img.image
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>

              <div className="flex items-center gap-2">
                <span className="text-yellow-500 font-medium">
                  ⭐ {product.average_rating}
                </span>
                <span className="text-gray-500 text-sm">
                  ({product.rating_count} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.discounted_price}
                </span>

                {product.discount_percentage > 0 && (
                  <>
                    <span className="line-through text-gray-400 text-lg">
                      ₹{product.price}
                    </span>
                    <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-lg">
                      {product.discount_percentage}% OFF
                    </span>
                  </>
                )}
              </div>

              <div>
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>

                <button className="w-full border border-black py-3 rounded-xl hover:bg-gray-100 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="mt-16 bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>

            {product.reviews?.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <div className="space-y-6">
                {product.reviews?.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{review.user_name}</span>
                      <span className="text-yellow-500">
                        {"⭐".repeat(review.rating)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RELATED PRODUCTS */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-semibold mb-8">Related Products</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              ✕
            </button>

            <div className="absolute top-4 left-4 text-white bg-white/10 px-4 py-1 rounded-full text-sm">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl"
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
