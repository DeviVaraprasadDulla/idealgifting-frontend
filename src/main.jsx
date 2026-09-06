import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <>
                <App />

                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: "#0F2140",
                      color: "#FCF8F1",
                      borderRadius: "100px",
                      padding: "14px 20px",
                      fontSize: "14px",
                    },
                    success: {
                      iconTheme: {
                        primary: "#E5A170",
                        secondary: "#FCF8F1",
                      },
                    },
                  }}
                />
              </>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
