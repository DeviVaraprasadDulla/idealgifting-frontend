import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const MiniCartDrawer = ({ open, onClose }) => {
  const { cartItems, getCartTotal } = useCart();

  const total = getCartTotal ? getCartTotal() : 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#0B1C2D]">
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0B1C2D]">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-[#0B1C2D] mt-1">
                        ₹{(item.product_price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t space-y-4">
                <div className="flex justify-between font-semibold text-[#0B1C2D]">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="block text-center border border-[#0B1C2D] text-[#0B1C2D] py-2 rounded-xl hover:bg-[#F4F6F8] transition"
                  >
                    View Cart
                  </Link>

                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block text-center bg-[#0B1C2D] text-white py-2 rounded-xl hover:bg-[#081521] transition"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCartDrawer;
