import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";

const Checkout = () => {
  const { cartItems, cartLoading, getCartTotal } = useCart();
  const navigate = useNavigate();
const [errors, setErrors] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
const [editingId, setEditingId] = useState(null);
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
const states = [
  // States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",

  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

  const total = getCartTotal();

  // ================= Redirect if cart empty =================
  // Wait for the initial cart fetch to actually finish before deciding the
  // cart is empty - on a hard navigation straight to /checkout, cartItems
  // starts as [] before CartContext's own load completes, which was
  // incorrectly bouncing a non-empty cart back to /cart.
  useEffect(() => {
    if (!cartLoading && cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, cartLoading, navigate]);

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

  const validateForm = () => {
  // First Name
  if (!form.first_name.trim()) {
    alert("First name is required");
    return false;
  }

  // Last Name
  if (!form.last_name.trim()) {
    alert("Last name is required");
    return false;
  }

  // Phone Validation (10 digits only)
  if (!/^[6-9]\d{9}$/.test(form.phone)) {
    alert("Enter a valid 10-digit phone number");
    return false;
  }

  // Address Validation
  if (form.address_line1.trim().length < 10) {
    alert("Please enter a complete address");
    return false;
  }

  // City Validation
  if (!/^[A-Za-z ]+$/.test(form.city)) {
    alert("City should contain only letters");
    return false;
  }

  // State Validation
  if (!/^[A-Za-z ]+$/.test(form.state)) {
    alert("State should contain only letters");
    return false;
  }

  // ZIP Code Validation (India)
  if (!/^[1-9][0-9]{5}$/.test(form.zip_code)) {
    alert("Enter a valid 6-digit PIN code");
    return false;
  }

  return true;
};
const handleEditAddress = (addr) => {
  setForm({
    first_name: addr.first_name,
    last_name: addr.last_name,
    phone: addr.phone,
    address_line1: addr.address_line1,
    address_line2: addr.address_line2 || "",
    city: addr.city,
    state: addr.state,
    zip_code: addr.zip_code,
  });

  setEditingId(addr.id);
  setShowForm(true);
};

  // ================= Save Address =================
const handleSaveAddress = async () => {
  if (!validateForm()) return;

  try {
    setSavingAddress(true);

    let res;

    if (editingId) {
      res = await API.put(
        `/orders/addresses/${editingId}/update/`,
        form
      );
    } else {
      res = await API.post(
        "/orders/save-address/",
        form
      );
    }

    await loadAddresses();

    if (!editingId && res.data?.id) {
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

    setEditingId(null);
    setShowForm(false);

  } catch (err) {
    alert(
      err.response?.data?.error ||
      "Failed to save address"
    );
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
    <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)] grid lg:grid-cols-3 gap-8">
      {/* ================= LEFT SIDE ================= */}
      <div className="lg:col-span-2 space-y-8">
                {/* ================= REVIEW ORDER ================= */}
        <div className="bg-paper rounded-rl shadow-card p-6">
          <h3 className="font-display text-lg md:text-xl font-semibold text-navy mb-4">
            Review Your Order
          </h3>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-navy/10 py-4"
            >
              <div className="flex items-center gap-4">
                {/* Product Image */}
                <img
                  src={
                    item.product_image ||
                    "https://via.placeholder.com/80x80?text=No+Image"
                  }
                  alt={item.product_name}
                  className="w-16 h-16 rounded-rm object-cover bg-world-soft"
                />

                {/* Product Details */}
                <div>
                  <p className="font-medium text-navy">
                    {item.product_name}
                  </p>

                  <p className="text-sm text-muted">
                    Qty: {item.quantity}
                  </p>

                  <p className="text-sm text-peach-deep font-num font-semibold">
                    ₹{item.product_price}
                  </p>
                </div>
              </div>

              <p className="font-num font-semibold text-navy">
                ₹{(item.product_price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        {/* Shipping Section */}
        <div>
          <h2 className="text-d3 text-navy mb-6">
            Shipping Address
          </h2>

          <div className="bg-paper rounded-rl shadow-card p-6 space-y-4">
            {addresses.length === 0 && (
              <div className="bg-sun/10 border border-sun/30 text-[#8a5a10] p-4 rounded-rm text-sm">
                No shipping address found. Please add an address to continue checkout.
              </div>
            )}

            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`border rounded-rm p-4 transition ${
                  selectedAddress === addr.id
                    ? "border-navy bg-world-soft"
                    : "border-navy/10 hover:border-navy/30"
                }`}
              >
                <div
                      className="cursor-pointer"
                      onClick={() => setSelectedAddress(addr.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-display font-semibold text-navy text-lg">
                            {addr.first_name} {addr.last_name}
                          </p>

                          <p className="text-muted mt-1 leading-relaxed">
                            {addr.address_line1}
                            {addr.address_line2 && `, ${addr.address_line2}`}
                          </p>

                          <p className="text-muted">
                            {addr.city}, {addr.state} - {addr.zip_code}
                          </p>

                          <p className="text-muted">
                            Phone: {addr.phone}
                          </p>
                        </div>
                      </div>
                    </div>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleEditAddress(addr)}
                className="text-sm text-sky font-medium hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleRemoveAddress(addr.id)}
                className="text-sm text-burgundy font-medium hover:underline"
              >
                Remove
              </button>
            </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="w-full border-2 border-dashed border-gold text-navy py-3 rounded-rm hover:bg-cream/40 transition font-medium"
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
                      className="border border-navy/15 rounded-rs px-3 py-2.5 bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
                    />
                    <input
                      placeholder="Last Name"
                      value={form.last_name}
                      onChange={(e) =>
                        setForm({ ...form, last_name: e.target.value })
                      }
                      className="border border-navy/15 rounded-rs px-3 py-2.5 bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
                    />
                  </div>

                    <input
                      placeholder="Phone"
                      value={form.phone}
                      maxLength={10}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="border border-navy/15 rounded-rs px-3 py-2.5 w-full bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
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
                          setForm({
                            ...form,
                            city: e.target.value.replace(/[^A-Za-z ]/g, ""),
                          })
                        }
                        className="border border-navy/15 rounded-rs px-3 py-2.5 bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
                      />
                        <select
                          value={form.state}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              state: e.target.value,
                            })
                          }
                          className="border border-navy/15 rounded-rs px-3 py-2.5 bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
                        >
                          <option value="">Select State</option>

                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                          <input
                            placeholder="PIN Code"
                            value={form.zip_code}
                            maxLength={6}
                            onChange={(e) => {
                              const value = e.target.value;

                              // Check for letters/special characters first
                              if (!/^\d*$/.test(value)) {
                                setErrors((prev) => ({
                                  ...prev,
                                  zip_code: "Only numbers are allowed",
                                }));
                                return;
                              }

                              setForm({
                                ...form,
                                zip_code: value,
                              });

                              if (value.length > 0 && value.length < 6) {
                                setErrors((prev) => ({
                                  ...prev,
                                  zip_code: "PIN code must be 6 digits",
                                }));
                              } else if (
                                value.length === 6 &&
                                !/^[1-9][0-9]{5}$/.test(value)
                              ) {
                                setErrors((prev) => ({
                                  ...prev,
                                  zip_code: "Invalid PIN code",
                                }));
                              } else {
                                setErrors((prev) => ({
                                  ...prev,
                                  zip_code: "",
                                }));
                              }
                            }}
                            className={`border rounded-rs px-3 py-2.5 bg-paper focus:outline-none focus:ring-4 focus:ring-peach/30 transition ${
                              errors.zip_code ? "border-burgundy" : "border-navy/15 focus:border-peach-deep"
                            }`}
                          />

                          {errors.zip_code && (
                            <p className="text-burgundy text-xs mt-1">
                              {errors.zip_code}
                            </p>
                          )}
                  </div>

                  <button
                    onClick={handleSaveAddress}
                    disabled={savingAddress}
                    className="bg-navy text-ivory px-6 py-3 rounded-full font-semibold shadow-card hover:-translate-y-0.5 hover:shadow-elevated transition-all disabled:opacity-50"
                  >
                    {savingAddress
                        ? "Saving..."
                        : editingId
                        ? "Update Address"
                        : "Save Address"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


      </div>

      {/* ================= RIGHT SUMMARY ================= */}
      <div className="lg:sticky lg:top-[112px] h-fit">
        <div className="bg-paper rounded-rl shadow-card p-6 space-y-4">
          <h3 className="font-display text-lg md:text-xl font-semibold text-navy">
            Order Summary
          </h3>

          <div className="flex justify-between text-muted">
            <span>Items Total</span>
            <span className="font-num">₹{total.toFixed(2)}</span>
          </div>

          <hr className="border-navy/10" />

          <div className="flex justify-between font-num font-extrabold text-lg text-navy">
            <span>Order Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {/* Address Validation Messages */}

          {addresses.length === 0 && (
            <div className="bg-sun/10 border border-sun/30 text-[#8a5a10] p-3 rounded-rm text-sm">
              Please add a shipping address to continue.
            </div>
          )}

          {addresses.length > 0 && !selectedAddress && (
            <div className="bg-sky/10 border border-sky/30 text-[#2c5876] p-3 rounded-rm text-sm">
              Please select a shipping address to place your order.
            </div>
          )}

          <button
            disabled={!selectedAddress || loading}
            onClick={handlePlaceOrder}
            className={`w-full py-3.5 rounded-full font-semibold transition-all ${
              !selectedAddress || loading
                ? "bg-navy/30 text-ivory cursor-not-allowed"
                : "bg-peach text-navy shadow-card hover:-translate-y-0.5 hover:shadow-elevated"
            }`}
          >
            {loading ? "Creating Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
