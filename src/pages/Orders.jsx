import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cancelToken, setCancelToken] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  // ================= LOAD ORDERS =================
  const loadOrders = async () => {
    try {
      const res = await API.get("/orders/");
      setOrders(res.data);
    } catch (err) {
      console.log("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ================= CANCEL ORDER =================
  const confirmCancel = async () => {
    try {
      setCancelLoading(true);
      await API.post(`/orders/cancel/${cancelToken}/`);
      setCancelToken(null);
      loadOrders();
    } catch (err) {
      alert(err.response?.data?.error || "Cannot cancel order");
    } finally {
      setCancelLoading(false);
    }
  };

  // ================= STATUS BADGE =================
  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-sky/15 text-[#2c5876]";
      case "PACKED":
        return "bg-sun/20 text-[#8a5a10]";
      case "SHIPPED":
        return "bg-lavender/20 text-[#4a3a78]";
      case "DELIVERED":
        return "bg-leaf/15 text-[#1f5245]";
      case "CANCELLED":
        return "bg-burgundy/10 text-burgundy";
      default:
        return "bg-navy/10 text-navy";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-navy font-display">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-12 min-h-screen">
      <h2 className="text-d3 text-navy mb-10">My Orders</h2>

      {/* ================= EMPTY STATE ================= */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <div className="text-6xl mb-6">📦</div>

          <h3 className="text-d4 text-navy mb-3">
            No Orders Yet
          </h3>

          <p className="text-muted mb-8 max-w-md">
            Looks like you haven't placed any orders.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-navy hover:-translate-y-0.5 text-ivory px-8 py-3.5 rounded-full transition-all font-semibold shadow-card"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.order_token}
              className="bg-paper shadow-card rounded-rl p-6 border border-navy/10"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-muted">
                    Order ID: #{order.order_token}
                  </p>
                  <p className="text-sm text-muted">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    order.order_status,
                  )}`}
                >
                  {order.order_status.replaceAll("_", " ")}
                </span>
              </div>

              {/* ITEMS */}
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-navy/10 py-4"
                  >
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-rm bg-world-soft"
                        />
                      )}

                      <div>
                        <p className="font-medium text-navy">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-num font-semibold text-navy">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-6">
                <p className="font-num font-extrabold text-lg text-navy">
                  ₹{order.total_amount}
                </p>

                <div className="flex space-x-4 items-center">
                  <button
                    onClick={() =>
                      navigate(`/orders/track/${order.order_token}`)
                    }
                    className="text-sm text-sky font-medium hover:underline"
                  >
                    Track Order
                  </button>

                  {["PLACED", "CONFIRMED", "PACKED"].includes(
                    order.order_status,
                  ) && (
                    <button
                      onClick={() => setCancelToken(order.order_token)}
                      className="border border-burgundy text-burgundy hover:bg-burgundy hover:text-ivory transition-colors px-4 py-2 rounded-full text-sm font-medium"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= CANCEL MODAL ================= */}
      {cancelToken && (
        <div className="fixed inset-0 bg-navy/40 flex items-center justify-center z-[140]">
          <div className="bg-paper rounded-rl p-6 w-96 shadow-lift">
            <h3 className="font-display font-semibold text-lg text-navy mb-3">Cancel this order?</h3>

            <p className="text-sm text-muted mb-6">
              This action cannot be undone. Refund will be processed
              automatically.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCancelToken(null)}
                className="px-4 py-2 text-navy/70 font-medium"
              >
                No
              </button>

              <button
                onClick={confirmCancel}
                disabled={cancelLoading}
                className="px-5 py-2.5 bg-burgundy text-ivory rounded-full font-medium disabled:opacity-60"
              >
                {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
