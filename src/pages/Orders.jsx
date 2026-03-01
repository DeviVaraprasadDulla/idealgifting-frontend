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
        return "bg-blue-100 text-blue-600";
      case "PACKED":
        return "bg-yellow-100 text-yellow-600";
      case "SHIPPED":
        return "bg-purple-100 text-purple-600";
      case "DELIVERED":
        return "bg-green-100 text-green-600";
      case "CANCELLED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      <h2 className="text-3xl font-bold text-[#0B1C2D] mb-10">My Orders</h2>

      {/* ================= EMPTY STATE ================= */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <div className="text-6xl mb-6">📦</div>

          <h3 className="text-2xl font-semibold text-[#0B1C2D] mb-3">
            No Orders Yet
          </h3>

          <p className="text-gray-500 mb-8 max-w-md">
            Looks like you haven't placed any orders.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-[#0B1C2D] hover:bg-[#142f47] text-white px-8 py-3 rounded-2xl transition font-medium"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.order_token}
              className="bg-white shadow-md rounded-2xl p-6 border"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order Number: {order.order_number}
                  </p>
                  <p className="text-sm text-gray-500">
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
                    className="flex justify-between border-b py-4"
                  >
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                      )}

                      <div>
                        <p className="font-medium text-[#0B1C2D]">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-[#0B1C2D]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-6">
                <p className="font-bold text-lg text-[#0B1C2D]">
                  ₹{order.total_amount}
                </p>

                <div className="flex space-x-4 items-center">
                  <button
                    onClick={() =>
                      navigate(`/orders/track/${order.order_token}`)
                    }
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Track Order
                  </button>

                  {["PLACED", "CONFIRMED", "PACKED"].includes(
                    order.order_status,
                  ) && (
                    <button
                      onClick={() => setCancelToken(order.order_token)}
                      className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition px-4 py-2 rounded-xl text-sm"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-semibold mb-3">Cancel this order?</h3>

            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone. Refund will be processed
              automatically.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCancelToken(null)}
                className="px-4 py-2 text-gray-600"
              >
                No
              </button>

              <button
                onClick={confirmCancel}
                disabled={cancelLoading}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
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
