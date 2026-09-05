import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const OrderTracking = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTracking = async () => {
      try {
        const res = await API.get(`/orders/track/${token}/`);
        setOrder(res.data);
      } catch (err) {
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };

    if (token) loadTracking();
  }, [token, navigate]);

  const statusSteps = [
    "PLACED",
    "CONFIRMED",
    "PACKED",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  const currentIndex = statusSteps.indexOf(order?.order_status);

  const progressPercent =
    currentIndex >= 0 ? ((currentIndex + 1) / statusSteps.length) * 100 : 0;

  const timelineMap = useMemo(() => {
    if (!order?.timeline) return {};
    return order.timeline.reduce((acc, item) => {
      acc[item.status] = item.time;
      return acc;
    }, {});
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-muted font-display">
        Loading tracking...
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-wrap-narrow mx-auto space-y-8">
        {/* ================= HEADER CARD ================= */}
        <div className="bg-paper rounded-rxl shadow-lift p-6 sm:p-8 space-y-3">
          <h2 className="text-d3 text-navy">
            Order Tracking
          </h2>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted">Order Reference</p>
              <p className="font-semibold text-navy">{order.order_token}</p>
            </div>

            <div>
              <p className="text-sm text-muted">Current Status</p>
              <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-leaf/15 text-[#1f5245]">
                {order.order_status.replaceAll("_", " ")}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted">Tracking ID</p>
              <p className="font-semibold text-navy">
                {order.tracking_id || "Not assigned yet"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= PROGRESS TRACKER ================= */}
        <div className="bg-paper rounded-rxl shadow-lift p-6 sm:p-8">
          {/* Progress Bar */}
          <div className="relative mb-10">
            <div className="h-1.5 bg-navy/10 rounded-full" />
            <div
              className="absolute top-0 left-0 h-1.5 bg-peach rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {statusSteps.map((step, index) => {
              const isCompleted = currentIndex >= index;
              const isCurrent = currentIndex === index;
              const timestamp = timelineMap[step];

              return (
                <div key={step} className="space-y-2">
                  {/* Circle */}
                  <div
                    className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold font-num transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-navy text-ivory"
                          : "bg-navy/10 text-navy/50"
                      }
                      ${isCurrent ? "ring-4 ring-peach/40" : ""}
                    `}
                  >
                    {index + 1}
                  </div>

                  {/* Label */}
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isCompleted ? "text-navy" : "text-muted"
                    }`}
                  >
                    {step.replaceAll("_", " ")}
                  </p>

                  {/* Timestamp */}
                  {timestamp && (
                    <p className="text-xs text-muted/70">
                      {new Date(timestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= ACTION BUTTON ================= */}
        <div className="text-center">
          <button
            onClick={() => navigate("/orders")}
            className="px-8 py-3.5 bg-navy text-ivory rounded-full font-semibold shadow-card hover:-translate-y-0.5 hover:shadow-elevated transition-all"
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
