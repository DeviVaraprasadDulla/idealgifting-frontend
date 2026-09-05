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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-paper w-full max-w-md rounded-rxl shadow-lift p-6 sm:p-8 md:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logoHorizontal} alt="Ideal Gifting" className="h-10" />
        </div>

        <h2 className="text-d4 text-navy text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username or Email"
            className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-peach-deep font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-burgundy/5 text-burgundy text-sm p-3 rounded-rs border border-burgundy/20">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:-translate-y-0.5 text-ivory p-3 rounded-full font-semibold shadow-card hover:shadow-elevated transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 text-center text-muted text-sm">OR</div>

        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setErrorMessage("Google Login Failed")}
          />
        </div>

        <p className="text-center text-sm text-muted mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-peach-deep font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
