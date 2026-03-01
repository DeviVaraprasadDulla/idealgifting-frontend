import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logoHorizontal from "../assets/logos/logo-horizontal.png";

const Login = () => {
  const { login, googleLogin } = useAuth(); // ✅ added googleLogin (no logic removed)
  const { loadCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= NORMAL LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(form);

      if (response.success) {
        await loadCart(); // 🔥 existing logic kept
        navigate(from, { replace: true });
      } else {
        alert(response.error || "Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN (FIXED ONLY HERE) =================
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);

    try {
      // ✅ Use AuthContext method instead of direct API
      const response = await googleLogin(credentialResponse.credential);

      if (response.success) {
        await loadCart(); // 🔥 existing cart merge logic preserved
        navigate(from, { replace: true });
      } else {
        alert(response.error || "Google login failed");
      }
    } catch (err) {
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightbg px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logoHorizontal} alt="Ideal Gifting" className="h-10" />
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-center">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white p-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 text-center text-gray-400">OR</div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Login Failed")}
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
