import { useNavigate } from "react-router-dom";
import OrderItemRow from "./OrderItemRow";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-600";
      case "SHIPPED":
      case "OUT_FOR_DELIVERY":
        return "bg-blue-100 text-blue-600";
      case "CANCELLED":
        return "bg-red-100 text-red-600";
      case "CONFIRMED":
      case "PACKED":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  const canCancel =
    order.order_status === "PLACED" || order.order_status === "CONFIRMED";

  const handleCancel = () => {
    // we will implement backend in next step
    alert("Cancel order feature coming next step");
  };

  const trackingUrl = order.tracking_id
    ? `https://www.dtdc.in/tracking/tracking_results.asp?strCnno=${order.tracking_id}`
    : null;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition">
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">
        <div>
          <p className="text-sm text-gray-500">
            Order Number: {order.order_number}
          </p>
          <p className="text-sm text-gray-400">
            {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            order.order_status,
          )}`}
        >
          {order.order_status.replaceAll("_", " ")}
        </span>
      </div>

      {/* ================= Items ================= */}
      <div className="space-y-3">
        {order.items?.map((item, index) => (
          <OrderItemRow key={index} item={item} />
        ))}
      </div>

      {/* ================= Footer ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
        <p className="font-bold text-lg text-[#0B1C2D]">
          ₹{order.total_amount}
        </p>

        <div className="flex flex-wrap gap-3">
          {/* View Tracking Page */}
          <button
            onClick={() => navigate(`/orders/track/${order.order_token}`)}
            className="text-purple-600 hover:underline text-sm font-medium"
          >
            View Tracking →
          </button>

          {/* External DTDC Link */}
          {trackingUrl && (
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Track via DTDC
            </a>
          )}

          {/* Cancel Button */}
          {canCancel && (
            <button
              onClick={handleCancel}
              className="text-red-500 hover:underline text-sm font-medium"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
