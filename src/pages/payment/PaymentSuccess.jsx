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
    <div className="min-h-screen flex items-center justify-center px-4">
      <ConfettiEffect />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-paper rounded-rxl shadow-lift p-10 max-w-xl w-full text-center"
      >
        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-d3 text-navy mb-4">
          The gift story has begun!
        </h2>

        <p className="text-muted mb-6">
          Your order has been confirmed successfully.
        </p>

        <div className="text-left bg-world-soft p-5 rounded-rm mb-6 space-y-1.5 text-navy">
          <p>
            <strong className="font-display">Order Number:</strong> {order.order_number}
          </p>
          <p>
            <strong className="font-display">Total:</strong>{" "}
            <span className="font-num">₹{order.total_amount}</span>
          </p>
          <p>
            <strong className="font-display">Status:</strong> {order.order_status}
          </p>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="bg-navy text-ivory px-6 py-3.5 rounded-full font-semibold shadow-card hover:-translate-y-0.5 hover:shadow-elevated transition-all"
        >
          Go to My Orders
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
