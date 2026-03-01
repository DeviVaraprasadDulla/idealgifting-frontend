import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { motion } from "framer-motion";
import ConfettiEffect from "./components/ConfettiEffect";

const PaymentSuccess = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/by-token/${token}/`);
        setOrder(res.data);
      } catch (err) {
        navigate("/orders");
      }
    };

    fetchOrder();
  }, [token, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <ConfettiEffect />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center"
      >
        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful
        </h2>

        <p className="text-gray-600 mb-6">
          Your order has been confirmed successfully.
        </p>

        <div className="text-left bg-gray-50 p-4 rounded-xl mb-6">
          <p>
            <strong>Order Number:</strong> {order.order_number}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.total_amount}
          </p>
          <p>
            <strong>Status:</strong> {order.order_status}
          </p>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Go to My Orders
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
