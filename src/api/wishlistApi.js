import API from "./axios";

// ===============================
// LIST WISHLIST
// ===============================
export const getWishlist = async () => {
  const response = await API.get("/wishlist/");
  return response.data;
};

// ===============================
// TOGGLE PRODUCT (add if absent, remove if present)
// ===============================
export const toggleWishlistProduct = async (productId) => {
  const response = await API.post("/wishlist/toggle/", { product: productId });
  return response.data;
};

// ===============================
// REMOVE PRODUCT
// ===============================
export const removeFromWishlist = async (productId) => {
  const response = await API.delete(`/wishlist/${productId}/`);
  return response.data;
};
