import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ================= LOAD CART =================
  const loadCart = async () => {
    try {
      const res = await API.get("cart/items/");
      setCartItems(res.data);
    } catch (error) {
      console.error("Cart load error:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ================= ADD =================
  const addToCart = async (productId, quantity = 1) => {
    await API.post("cart/add/", {
      product: productId,
      quantity,
    });
    loadCart();
  };

  // ================= UPDATE =================
  const updateQuantity = async (id, quantity) => {
    await API.patch(`cart/update/${id}/`, { quantity });
    loadCart();
  };

  // ================= REMOVE =================
  const removeFromCart = async (id) => {
    await API.delete(`cart/remove/${id}/`);
    loadCart();
  };

  // ✅ ================= TOTAL FUNCTION (THIS WAS MISSING) =================
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + Number(item.product_price) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        loadCart,
        getCartTotal, // ✅ ADD THIS
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
