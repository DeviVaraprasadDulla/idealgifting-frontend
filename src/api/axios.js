import axios from "axios";
import { getGuestId } from "../utils/guest";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(
  (config) => {
    // 🔥 Attach Guest ID
    const guestId = getGuestId();
    if (guestId) {
      config.headers["X-GUEST-ID"] = guestId;
    }

    // 🔥 Attach JWT Token (if logged in)
    const accessToken = localStorage.getItem("access");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ================= RESPONSE INTERCEPTOR (Optional future refresh) =================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request");
    }

    return Promise.reject(error);
  },
);

export default API;
