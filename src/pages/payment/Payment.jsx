import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../api/axios";
import PaymentSummary from "./components/PaymentSummary";
import WhatsAppOrderButton from "./components/WhatsAppOrderButton";
import { useCart } from "../../context/CartContext";
const Payment = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("razorpay");
const { setCartItems } = useCart();
const [verifyingPayment, setVerifyingPayment] = useState(false);
  // Fetch Order
  useEffect(() => {
        const fetchOrder = async () => {
          try {
            const res = await API.get(`/orders/by-token/${token}/`);

            if (res.data.payment_status === "PAID") {
              navigate(`/payment-success/${token}`, {
                replace: true,
              });
              return;
            }

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
          setVerifyingPayment(true);
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
              // Immediately clear cart badge
          setCartItems([]);
          navigate(`/payment-success/${token}`, {
            replace: true,
          });
        } catch (error) {
          setVerifyingPayment(false);
          alert(
            "Payment verification failed. Please try again or contact us if the amount was deducted."
          );
        }
      },

      theme: {
        color: "#0F2140",
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
  if (verifyingPayment) {
  return (
    <div className="fixed inset-0 bg-ivory z-[9999] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-navy/15 border-t-peach-deep rounded-full animate-spin" />

      <h2 className="mt-5 text-xl font-display font-semibold text-navy">
        Processing Payment...
      </h2>

      <p className="text-muted mt-2">
        Please wait. Do not refresh or go back.
      </p>
    </div>
  );
}
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-paper rounded-rxl shadow-lift p-6 md:p-10 grid md:grid-cols-2 gap-8"
      >
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-d4 text-navy mb-6">
            Select Payment Method
          </h2>

          {/* RAZORPAY OPTION */}
          <div
            onClick={() => setSelectedMethod("razorpay")}
            className={`border-2 rounded-rm p-4 mb-4 cursor-pointer transition-colors ${
              selectedMethod === "razorpay"
                ? "border-navy bg-world-soft"
                : "border-navy/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-navy">
                  Razorpay
                </h3>

                <p className="text-sm text-muted">
                  UPI, Cards, Net Banking & Wallets
                </p>
              </div>

              <input
                type="radio"
                checked={selectedMethod === "razorpay"}
                readOnly
                className="accent-navy"
              />
            </div>
          </div>

          {/* WHATSAPP OPTION */}
          <div
            onClick={() => setSelectedMethod("whatsapp")}
            className={`border-2 rounded-rm p-4 cursor-pointer transition-colors ${
              selectedMethod === "whatsapp"
                ? "border-leaf bg-leaf/10"
                : "border-navy/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-navy">WhatsApp Order</h3>
                <p className="text-sm text-muted">
                  Send order details directly to seller
                </p>
              </div>

              <input
                type="radio"
                checked={selectedMethod === "whatsapp"}
                readOnly
                className="accent-leaf"
              />
            </div>
          </div>

          {/* CONDITIONAL BUTTON */}
          {selectedMethod === "razorpay" ? (
            <button
              onClick={handleRazorpayPayment}
              disabled={loading}
              className="mt-6 w-full bg-navy text-ivory py-3.5 rounded-full font-semibold shadow-card hover:-translate-y-0.5 hover:shadow-elevated transition-all disabled:opacity-50"
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
