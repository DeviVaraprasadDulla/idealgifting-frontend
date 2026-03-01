import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <CartProvider>
            <>
              <App />

              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: "#0B1C2D",
                    color: "#ffffff",
                    borderRadius: "12px",
                    padding: "14px 18px",
                    fontSize: "14px",
                  },
                  success: {
                    iconTheme: {
                      primary: "#D4AF37",
                      secondary: "#ffffff",
                    },
                  },
                }}
              />
            </>
          </CartProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
