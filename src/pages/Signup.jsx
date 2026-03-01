import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import logo from "../assets/logos/logo-horizontal.png";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const response = await signup({
      username: form.username,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (response.success) {
      navigate("/login");
    } else {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightbg px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Ideal Gifting" className="h-10" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Your Account
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white p-3 rounded-lg font-medium hover:bg-accent transition disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Button */}
        <Link
          to="/login"
          className="w-full block text-center border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition"
        >
          Continue with Google
        </Link>

        {/* Login Link */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
