import { createContext, useContext, useState, useEffect } from "react";
import { getWishlist, toggleWishlistProduct } from "../api/wishlistApi";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // ================= LOAD =================
  // Wishlist is authenticated-only; a guest (no access token) simply gets
  // a 401 here, which we treat the same as "empty" - matches CartContext's
  // own error-swallowing pattern.
  const loadWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlistItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Wishlist load skipped:", error?.response?.status || error?.message);
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const isWishlisted = (productId) =>
    wishlistItems.some((item) => item.product.id === productId);

  // ================= TOGGLE =================
  const toggleWishlist = async (productId) => {
    const wasWishlisted = isWishlisted(productId);

    try {
      await toggleWishlistProduct(productId);
      await loadWishlist();
      return !wasWishlisted;
    } catch (error) {
      console.log("Wishlist toggle failed:", error?.response?.status || error?.message);
      return wasWishlisted;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loadWishlist,
        isWishlisted,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
