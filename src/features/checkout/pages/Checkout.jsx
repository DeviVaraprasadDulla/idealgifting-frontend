import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const total = getCartTotal();

  // ================= Redirect if cart empty =================
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // ================= Load Addresses =================
  const loadAddresses = async () => {
    try {
      const res = await API.get("/orders/addresses/");
      setAddresses(res.data);
    } catch (err) {
      console.log("Failed to load addresses", err);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // ================= Save Address =================
  const handleSaveAddress = async () => {
    try {
      setSavingAddress(true);

      const res = await API.post("/orders/save-address/", form);

      await loadAddresses();

      if (res.data?.id) {
        setSelectedAddress(res.data.id);
      }

      setForm({
        first_name: "",
        last_name: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip_code: "",
      });

      setShowForm(false);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save address");
    } finally {
      setSavingAddress(false);
    }
  };

  // ================= Remove Address =================
  const handleRemoveAddress = async (id) => {
    try {
      await API.delete(`/orders/addresses/${id}/delete/`);
      await loadAddresses();
      if (selectedAddress === id) setSelectedAddress(null);
    } catch (err) {
      alert("Failed to remove address");
    }
  };

  // ================= Place Order =================
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    try {
      setLoading(true);

      const orderRes = await API.post("/orders/create/", {
        address_id: selectedAddress,
      });

      const orderToken = orderRes.data.order_token;
      const orderId = orderRes.data.order_id;

      navigate(`/payment/${orderToken}`, {
        state: { orderId },
      });
    } catch (err) {
      alert(err.response?.data?.error || "Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid lg:grid-cols-3 gap-8">
      {/* ================= LEFT SIDE ================= */}
      <div className="lg:col-span-2 space-y-8">
        {/* Shipping Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C2D] mb-6">
            Shipping Address
          </h2>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            {addresses.length === 0 && (
              <p className="text-gray-500">No saved addresses</p>
            )}

            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`border rounded-xl p-4 transition ${
                  selectedAddress === addr.id
                    ? "border-[#0B1C2D] bg-blue-50"
                    : "hover:border-gray-400"
                }`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedAddress(addr.id)}
                >
                  <p className="font-semibold text-[#0B1C2D]">
                    {addr.first_name} {addr.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.address_line1}, {addr.city}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveAddress(addr.id)}
                  className="text-xs text-red-500 mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="w-full border-2 border-dashed border-[#C6A14A] text-[#0B1C2D] py-3 rounded-xl hover:bg-[#FFF8E7] transition"
            >
              {showForm ? "Cancel" : "+ Add New Address"}
            </button>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      placeholder="First Name"
                      value={form.first_name}
                      onChange={(e) =>
                        setForm({ ...form, first_name: e.target.value })
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                    <input
                      placeholder="Last Name"
                      value={form.last_name}
                      onChange={(e) =>
                        setForm({ ...form, last_name: e.target.value })
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>

                  <input
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="border rounded-lg px-3 py-2 w-full"
                  />

                  <input
                    placeholder="Address Line 1"
                    value={form.address_line1}
                    onChange={(e) =>
                      setForm({ ...form, address_line1: e.target.value })
                    }
                    className="border rounded-lg px-3 py-2 w-full"
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      placeholder="City"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                    <input
                      placeholder="State"
                      value={form.state}
                      onChange={(e) =>
                        setForm({ ...form, state: e.target.value })
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                    <input
                      placeholder="Zip Code"
                      value={form.zip_code}
                      onChange={(e) =>
                        setForm({ ...form, zip_code: e.target.value })
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>

                  <button
                    onClick={handleSaveAddress}
                    disabled={savingAddress}
                    className="bg-[#0B1C2D] text-white px-6 py-2 rounded-xl"
                  >
                    {savingAddress ? "Saving..." : "Save Address"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ================= REVIEW ORDER ================= */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg md:text-xl font-semibold text-[#0B1C2D] mb-4">
            Review Your Order
          </h3>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-3">
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>

              <p className="font-semibold text-[#0B1C2D]">
                ₹{(item.product_price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT SUMMARY ================= */}
      <div className="lg:sticky lg:top-24 h-fit">
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-[#0B1C2D]">
            Order Summary
          </h3>

          <div className="flex justify-between text-gray-600">
            <span>Items Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg text-[#0B1C2D]">
            <span>Order Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            disabled={!selectedAddress || loading}
            onClick={handlePlaceOrder}
            className="w-full py-3 rounded-xl text-white bg-[#0B1C2D]"
          >
            {loading ? "Creating Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
