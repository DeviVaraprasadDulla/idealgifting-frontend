import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../api/axios";
import PaymentSummary from "./components/PaymentSummary";
import WhatsAppOrderButton from "./components/WhatsAppOrderButton";

const Payment = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("phonepe");

  // Fetch Order
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

  // PhonePe Payment
  const handlePhonePePayment = async () => {
    if (!order) return;

    try {
      setLoading(true);

      const res = await API.post("/payments/initiate/", {
        order_id: order.id,
      });

      if (res.data.payment_status === "PAID") {
        navigate(`/payment-success/${token}`);
      }
    } catch (err) {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 md:p-10 grid md:grid-cols-2 gap-8"
      >
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Select Payment Method
          </h2>

          {/* PHONEPE OPTION */}
          <div
            onClick={() => setSelectedMethod("phonepe")}
            className={`border-2 rounded-2xl p-4 mb-4 cursor-pointer transition ${
              selectedMethod === "phonepe"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">PhonePe</h3>
                <p className="text-sm text-gray-500">Pay securely using UPI</p>
              </div>

              <input
                type="radio"
                checked={selectedMethod === "phonepe"}
                readOnly
              />
            </div>
          </div>

          {/* WHATSAPP OPTION */}
          <div
            onClick={() => setSelectedMethod("whatsapp")}
            className={`border-2 rounded-2xl p-4 cursor-pointer transition ${
              selectedMethod === "whatsapp"
                ? "border-green-500 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">WhatsApp Order</h3>
                <p className="text-sm text-gray-500">
                  Send order details directly to seller
                </p>
              </div>

              <input
                type="radio"
                checked={selectedMethod === "whatsapp"}
                readOnly
              />
            </div>
          </div>

          {/* CONDITIONAL BUTTON */}
          {selectedMethod === "phonepe" ? (
            <button
              onClick={handlePhonePePayment}
              disabled={loading}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Processing..." : "Pay with PhonePe"}
            </button>
          ) : (
            <WhatsAppOrderButton order={order} />
          )}
        </div>

        {/* RIGHT SIDE */}
        <PaymentSummary order={order} />
      </motion.div>
    </div>
  );
};

export default Payment;
