import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const FREE_SHIPPING_LIMIT = 999;

const Cart = () => {
  const { cartItems, loadCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
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
      <div className="bg-gray-50 py-24 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  // ================= MAIN CART =================
  return (
    <div className="bg-gray-50 py-8 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= ITEMS ================= */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-xl shadow-sm p-4 flex gap-6 items-center"
                >
                  <div className="w-28 h-28 rounded-lg overflow-hidden">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.product_name}</h3>

                    <div className="text-green-600 font-semibold mt-1">
                      ₹{item.product_price}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>

                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="px-4"
                        >
                          {item.quantity}
                        </motion.span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-28">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

            {/* Free Shipping Progress */}
            <div className="mb-4">
              <div className="text-xs mb-1">
                {subtotal >= FREE_SHIPPING_LIMIT
                  ? "You unlocked free shipping!"
                  : `Add ₹${FREE_SHIPPING_LIMIT - subtotal} more for free shipping`}
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-green-500"
                />
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>You saved</span>
                  <span>₹{savings.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>{getDeliveryDate()}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
