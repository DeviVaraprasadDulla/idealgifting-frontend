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
  const [selectedMethod, setSelectedMethod] = useState("razorpay");

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
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};
 const handleRazorpayPayment = async () => {
  if (!order) return;

  try {
    setLoading(true);

    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const res = await API.post(
      "/payments/create-order/",
      {
        order_token: token,
      }
    );

    const data = res.data;

    const options = {
      key: data.key,

      amount: data.amount,

      currency: "INR",

      name: "Ideal Gifting",

      description: "Order Payment",

      order_id: data.razorpay_order_id,

      handler: async function (response) {
        try {
          await API.post(
            "/payments/verify/",
            {
              order_token: token,

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            }
          );

          navigate(
            `/payment-success/${token}`
          );
        } catch (error) {
          alert(
            "Payment verification failed"
          );
        }
      },

      theme: {
        color: "#db1e57",
      },
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();
  } catch (err) {
    alert(
      err.response?.data?.error ||
        "Payment failed"
    );
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
            onClick={() => setSelectedMethod("razorpay")}
            className={`border-2 rounded-2xl p-4 mb-4 cursor-pointer transition ${
              selectedMethod === "razorpay"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">
                  Razorpay
                </h3>

                <p className="text-sm text-gray-500">
                  UPI, Cards, Net Banking & Wallets
                </p>
              </div>

              <input
                type="radio"
                checked={selectedMethod === "razorpay"}
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
          {selectedMethod === "razorpay" ? (
            <button
              onClick={handleRazorpayPayment}
              disabled={loading}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Processing..." : "Pay Securely"}
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
