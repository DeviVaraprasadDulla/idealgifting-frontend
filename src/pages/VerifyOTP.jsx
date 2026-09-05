import { useState, useEffect } from "react";
import { verifyResetOTP, sendResetOTP } from "../api/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import logoHorizontal from "../assets/logos/logo-horizontal.png";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [form, setForm] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);

  // Redirect if email missing
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (password.length < 6) return { label: "Weak", color: "bg-burgundy" };
    if (password.length < 10)
      return { label: "Medium", color: "bg-sun" };
    return { label: "Strong", color: "bg-leaf" };
  };

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.otp || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await verifyResetOTP({
        email,
        otp: form.otp,
        password: form.password,
      });

      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message || "Invalid OTP or expired.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResending(true);
      await sendResetOTP(email);
      setTimer(60);
    } catch (error) {
      setError("Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  if (!email) return null;

  return (
    <div className="py-16 px-4">
      <div className="max-w-md mx-auto bg-paper p-8 rounded-rxl shadow-lift">
        <div className="flex justify-center mb-6">
          <img src={logoHorizontal} alt="Ideal Gifting" className="h-10" />
        </div>

        <h2 className="text-d4 text-navy text-center mb-2">Verify OTP</h2>

        <p className="text-sm text-muted text-center mb-6 break-all">
          OTP sent to <span className="font-medium text-navy">{email}</span>
        </p>

        {error && (
          <div className="mb-4 text-sm text-burgundy bg-burgundy/5 p-3 rounded-rs border border-burgundy/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1">OTP Code</label>
            <input
              type="text"
              placeholder="Enter OTP"
              autoComplete="one-time-code"
              inputMode="numeric"
              className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
              required
            />

            <div className="text-sm mt-2">
              {timer > 0 ? (
                <span className="text-muted">Resend OTP in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resending}
                  className="text-peach-deep font-medium hover:underline"
                >
                  {resending ? "Resending..." : "Resend OTP"}
                </button>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                autoComplete="new-password"
                className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-muted"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password Strength */}
            {form.password && (
              <div className="mt-2">
                <div className="h-1.5 w-full bg-navy/10 rounded-full">
                  <div
                    className={`h-1.5 rounded-full ${strength.color}`}
                    style={{
                      width:
                        strength.label === "Weak"
                          ? "33%"
                          : strength.label === "Medium"
                            ? "66%"
                            : "100%",
                    }}
                  />
                </div>
                <p className="text-xs mt-1 text-muted">
                  Strength: {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter new password"
              autoComplete="new-password"
              className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:-translate-y-0.5 text-ivory p-3 rounded-full font-semibold shadow-card hover:shadow-elevated transition-all disabled:opacity-60"
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
