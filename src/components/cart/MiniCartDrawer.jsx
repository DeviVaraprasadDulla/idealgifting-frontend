import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

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
            className="fixed inset-0 bg-navy z-[140]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "102%" }}
            animate={{ x: 0 }}
            exit={{ x: "102%" }}
            transition={{ duration: 0.45, ease: [0.3, 0.9, 0.25, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-[430px] bg-ivory shadow-elevated z-[150] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-navy/10 flex justify-between items-center">
              <h2 className="font-display text-lg font-semibold text-navy">
                Your Gift Box
              </h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full grid place-items-center text-navy hover:bg-navy/5"
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">🎁</div>
                  <p className="text-muted">Your gift box is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-rm overflow-hidden bg-world-soft flex-shrink-0 p-1">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-full h-full rounded-rs object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-display font-semibold text-navy leading-tight">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-muted mt-1">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-num font-bold text-navy mt-1">
                        ₹{(item.product_price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-navy/10 space-y-4">
                <div className="flex justify-between font-num font-extrabold text-navy text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    to="/cart"
                    onClick={onClose}
                    variant="ghost"
                    block
                  >
                    View Cart
                  </Button>

                  <Button to="/checkout" onClick={onClose} variant="peach" block>
                    Checkout
                  </Button>
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
