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
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={logoHorizontal} alt="Ideal Gifting" className="h-10" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white p-3 rounded-lg"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
