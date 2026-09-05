import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import PageBanner from "../components/common/PageBanner";

const FREE_SHIPPING_LIMIT = 999;

const Cart = () => {
  const { cartItems, loadCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Intentionally runs once on mount only - loadCart comes from CartContext
  // and is not stable across renders, so it must not be a dependency here.
  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================= CALCULATIONS =================
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product_price * item.quantity,
    0,
  );

  const savings = cartItems.reduce((total, item) => {
    if (item.original_price && item.original_price > item.product_price) {
      return total + (item.original_price - item.product_price) * item.quantity;
    }
    return total;
  }, 0);

  const progress = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);

  const getDeliveryDate = () => {
    const today = new Date();
    const delivery = new Date(today);
    delivery.setDate(today.getDate() + 5);

    return delivery.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  const handleCheckout = () => {
    const access = localStorage.getItem("access");

    if (!access) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }

    navigate("/checkout");
  };

  // ================= EMPTY CART =================
  if (cartItems.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-d3 text-navy mb-3">Your gift box is empty</h2>
        <p className="text-muted mb-6">Start creating a gift someone will remember.</p>
        <Button to="/products" variant="peach">
          Start Shopping
        </Button>
      </div>
    );
  }

  // ================= MAIN CART =================
  return (
    <div className="pb-20">
      <PageBanner eyebrow="Your gift box" title="Cart" />

      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= ITEMS ================= */}
          <div className="lg:col-span-2 space-y-5">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="bg-paper rounded-rl shadow-card p-4 flex gap-6 items-center"
                >
                  <div className="w-28 h-28 rounded-rm overflow-hidden bg-world-soft p-1.5 flex-shrink-0">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-full h-full rounded-rs object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-navy">
                      {item.product_name}
                    </h3>

                    <div className="font-num font-bold text-navy mt-1">
                      ₹{item.product_price}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="inline-flex items-center rounded-full shadow-[inset_0_0_0_1.3px_rgba(15,33,64,.13)] overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="px-3.5 py-1.5 hover:bg-navy/5 text-navy"
                        >
                          −
                        </button>

                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 font-num font-bold text-navy min-w-[26px] text-center"
                        >
                          {item.quantity}
                        </motion.span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3.5 py-1.5 hover:bg-navy/5 text-navy"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-burgundy text-sm font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Button to="/products" variant="ghost" size="sm">
              ← Keep exploring
            </Button>
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="bg-paper rounded-rl shadow-card p-6 h-fit sticky top-[112px]">
            <h2 className="font-display font-semibold text-lg text-navy mb-6">
              Order Summary
            </h2>

            {/* Free Shipping Progress */}
            <div className="mb-5">
              <div className="text-xs mb-1.5 text-muted">
                {subtotal >= FREE_SHIPPING_LIMIT
                  ? "You unlocked free shipping!"
                  : `Add ₹${FREE_SHIPPING_LIMIT - subtotal} more for free shipping`}
              </div>

              <div className="h-1.5 bg-navy/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-peach"
                />
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-navy">
                <span>Subtotal</span>
                <span className="font-num font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-leaf">
                  <span>You saved</span>
                  <span className="font-num font-semibold">₹{savings.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-navy">
                <span>Estimated Delivery</span>
                <span className="font-num font-semibold">{getDeliveryDate()}</span>
              </div>

              <hr className="my-4 border-navy/10" />

              <div className="flex justify-between font-num font-extrabold text-lg text-navy pt-1">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={handleCheckout} variant="peach" block className="mt-6">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
