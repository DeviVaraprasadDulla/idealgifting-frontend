import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logoHorizontal from "../assets/logos/logo-horizontal.png";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const { loadCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ================= NORMAL LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await login(form);

      if (response.success) {
        await loadCart();
        navigate(from, { replace: true });
      } else {
        setErrorMessage(response.error || "Invalid credentials");
      }
    } catch (err) {
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await googleLogin(credentialResponse.credential);

      if (response.success) {
        await loadCart();
        navigate(from, { replace: true });
      } else {
        setErrorMessage(response.error || "Google login failed");
      }
    } catch (err) {
      setErrorMessage("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightbg px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logoHorizontal} alt="Ideal Gifting" className="h-10" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username or Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white p-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 text-center text-gray-400">OR</div>

        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setErrorMessage("Google Login Failed")}
          />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
