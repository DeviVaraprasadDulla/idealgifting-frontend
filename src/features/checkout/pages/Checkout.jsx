import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
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
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10 grid lg:grid-cols-3 gap-6 md:gap-8 overflow-x-hidden">
      {/* ================= LEFT SIDE ================= */}
      <div className="lg:col-span-2 space-y-8">
                {/* ================= REVIEW ORDER ================= */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 overflow-hidden">
          <h3 className="text-lg md:text-xl font-semibold text-[#0B1C2D] mb-4">
            Review Your Order
          </h3>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-4 gap-3"
            >
              {/* Left Side */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={
                    item.product_image ||
                    "https://via.placeholder.com/80x80?text=No+Image"
                  }
                  alt={item.product_name}
                  className="w-16 h-16 rounded-lg object-cover border flex-shrink-0"
                />

                <div className="min-w-0">
                  <p className="font-medium text-[#0B1C2D] break-words line-clamp-2">
                    {item.product_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                  <p className="text-sm text-[#db1e57] font-semibold">
                    ₹{item.product_price}
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="text-left sm:text-right">
                <p className="font-semibold text-[#0B1C2D]">
                  ₹{(item.product_price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Shipping Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C2D] mb-6">
            Shipping Address
          </h2>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            {addresses.length === 0 && (
              <div className="bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-xl">
                No shipping address found. Please add an address to continue checkout.
              </div>
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
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <p className="font-semibold text-[#0B1C2D] text-lg">
                            {addr.first_name} {addr.last_name}
                          </p>

                          <p className="text-gray-600 mt-1 leading-relaxed">
                            {addr.address_line1}
                            {addr.address_line2 && `, ${addr.address_line2}`}
                          </p>

                          <p className="text-gray-600">
                            {addr.city}, {addr.state} - {addr.zip_code}
                          </p>

                          <p className="text-gray-600">
                            Phone: {addr.phone}
                          </p>
                        </div>
                      </div>
                    </div>

            <div className="flex flex-wrap gap-4 mt-3">
              <button
                onClick={() => handleEditAddress(addr)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleRemoveAddress(addr.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      maxLength={10}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        placeholder="City"
                        value={form.city}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            city: e.target.value.replace(/[^A-Za-z ]/g, ""),
                          })
                        }
                        className="border rounded-lg px-3 py-2"
                      />
                        <select
                          value={form.state}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              state: e.target.value,
                            })
                          }
                          className="border rounded-lg px-3 py-2"
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
                            className={`border rounded-lg px-3 py-2 ${
                              errors.zip_code ? "border-red-500" : ""
                            }`}
                          />

                          {errors.zip_code && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.zip_code}
                            </p>
                          )}
                  </div>

                  <button
                    onClick={handleSaveAddress}
                    disabled={savingAddress}
                    className="bg-[#0B1C2D] text-white px-6 py-2 rounded-xl"
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
      <div className="w-full lg:sticky lg:top-24 h-fit">
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

          {/* Address Validation Messages */}

          {addresses.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-xl text-sm">
              Please add a shipping address to continue.
            </div>
          )}

          {addresses.length > 0 && !selectedAddress && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-xl text-sm">
              Please select a shipping address to place your order.
            </div>
          )}

          <button
            disabled={!selectedAddress || loading}
            onClick={handlePlaceOrder}
            className={`w-full py-3 rounded-xl text-white transition ${
              !selectedAddress || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0B1C2D] hover:bg-[#152B42]"
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
