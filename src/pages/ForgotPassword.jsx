import { useState } from "react";
import { sendResetOTP } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import logoHorizontal from "../assets/logos/logo-horizontal.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendResetOTP(email);
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-md mx-auto bg-paper p-8 rounded-rxl shadow-lift">
        <div className="flex justify-center mb-6">
          <img src={logoHorizontal} alt="Ideal Gifting" className="h-10" />
        </div>

        <h2 className="text-d4 text-navy text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:-translate-y-0.5 text-ivory p-3 rounded-full font-semibold shadow-card hover:shadow-elevated transition-all disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
