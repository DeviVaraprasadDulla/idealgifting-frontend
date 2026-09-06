import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";

import ProductListPage from "./features/products/pages/ProductListPage";
import ProductDetailPage from "./features/products/pages/ProductDetailPage";

import Checkout from "./features/checkout/pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";

import Payment from "./pages/payment/Payment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import OrderTracking from "./pages/OrderTracking";
import AboutSection from "./components/AboutSection";

import RefundPolicy from "./pages/legal/RefundPolicy";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Terms from "./pages/legal/Terms";
import Contact from "./pages/legal/Contact";
import Faq from "./pages/Faq";
import HowItWorks from "./pages/HowItWorks";
import Corporate from "./pages/Corporate";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import Occasions from "./pages/Occasions";
import OccasionDetail from "./pages/OccasionDetail";
import Recipients from "./pages/Recipients";
import RecipientDetail from "./pages/RecipientDetail";
import GiftFinder from "./pages/GiftFinder";
import Stories from "./pages/Stories";
import FeelingDetail from "./pages/FeelingDetail";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      {/* ================= Layout Wrapper ================= */}
      <Route element={<MainLayout />}>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route
          path="/products/category/:categorySlug"
          element={<ProductListPage />}
        />
        <Route
            path="/products/:slug"
            element={<ProductDetailPage />}
          />

        {/* Forgot Password Pages INSIDE Layout */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Protected */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/:token"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-success/:token"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/track/:token"
          element={
            <ProtectedRoute>
              <OrderTracking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/how" element={<HowItWorks />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/occasions" element={<Occasions />} />
        <Route path="/occasions/:id" element={<OccasionDetail />} />
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/recipients/:id" element={<RecipientDetail />} />
        <Route path="/finder" element={<GiftFinder />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/feelings/:id" element={<FeelingDetail />} />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* 404 (inside layout so nav/footer still render) */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;
