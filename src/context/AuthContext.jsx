import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  signupUser,
  logoutUser,
  getCurrentUser,
  googleLoginUser,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =============================
  // 🔐 CHECK EXISTING LOGIN
  // =============================
  useEffect(() => {
    const initializeAuth = async () => {
      const access = localStorage.getItem("access");

      if (!access) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.log("Token invalid. Logging out.");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  // =============================
  // 🔑 LOGIN
  // =============================
  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  // =============================
  // 🌍 GOOGLE LOGIN
  // =============================
  const googleLogin = async (token) => {
    try {
      const data = await googleLoginUser({ token });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Google login failed",
      };
    }
  };

  // =============================
  // 📝 SIGNUP
  // =============================
  const signup = async (formData) => {
    try {
      await signupUser(formData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Signup failed",
      };
    }
  };

  // =============================
  // 🚪 LOGOUT
  // =============================
  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        await logoutUser({ refresh });
      }
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        googleLogin,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
