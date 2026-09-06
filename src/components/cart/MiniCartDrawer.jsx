import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { worldFor } from "../../data/taxonomyMeta";

/**
 * Exact reproduction of the reference's .drawer / .scrim cart panel
 * (dimensions, head/body/foot structure, .line-item rows, .qty stepper,
 * .rowline summary, slide-in transition) - real CartContext data/API
 * underneath. Shipping/Personalisation footer rows reflect the real
 * checkout's actual behaviour (no shipping fee is ever charged;
 * personalisation is included in the product price), not fabricated
 * figures - the reference's own conditional ₹99 shipping fee has no
 * backend equivalent here, so it is not reproduced.
 */
const MiniCartDrawer = ({ open, onClose }) => {
  const { cartItems, getCartTotal, updateQuantity, removeFromCart } = useCart();
  const total = getCartTotal ? getCartTotal() : 0;

  return (
    <>
      <div className={`scrim${open ? " on" : ""}`} onClick={onClose} style={{ zIndex: 85 }} />

      <aside className={`drawer${open ? " on" : ""}`} role="dialog" aria-label="Your gift box" aria-modal="true">
        <div className="drawer-head">
          <div>
            <h3 className="d4">Your gift box 🎁</h3>
            <p className="xs muted" style={{ marginTop: 4 }}>
              A few beautiful surprises, waiting to become someone's favourite memory.
            </p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close gift box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty">
              <div className="big">🎁</div>
              <h3 className="d3">Nothing here yet — but we're full of ideas.</h3>
              <p className="sm muted" style={{ margin: "12px auto 22px", maxWidth: "32ch" }}>
                Let's find someone worth surprising.
              </p>
              <Link className="btn btn-peach" to="/finder" onClick={onClose}>
                Find my ideal gift
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="line-item" key={item.id} data-world={worldFor(item)}>
                <div className="mini">
                  {item.product_image && (
                    <img src={item.product_image} alt={item.product_name} style={{ width: "100%", borderRadius: 8 }} />
                  )}
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <Link to={`/products/${item.product_slug}`} onClick={onClose} style={{ fontFamily: "var(--f-d)", fontWeight: 600, lineHeight: 1.2 }}>
                      {item.product_name}
                    </Link>
                    <button onClick={() => removeFromCart(item.id)} className="xs muted" aria-label="Remove">
                      ✕
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                    <div className="qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <b className="price" style={{ fontSize: "1rem" }}>
                      ₹{(item.product_price * item.quantity).toFixed(2)}
                    </b>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-foot">
            <div className="rowline">
              <span className="muted">Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="rowline">
              <span className="muted">Shipping</span>
              <span>Free</span>
            </div>
            <div className="rowline">
              <span className="muted">Personalisation</span>
              <span style={{ color: "var(--leaf)" }}>Included</span>
            </div>
            <div className="rowline total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <Link className="btn btn-block btn-lg" to="/checkout" onClick={onClose} style={{ marginTop: 16 }}>
              You're about to make someone's day ❤️
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default MiniCartDrawer;
