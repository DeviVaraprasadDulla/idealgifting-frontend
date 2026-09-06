import API from "./axios";

// ==========================
// GET personalization for a cart item (or null if none)
// ==========================
export const getPersonalization = async (cartItemId) => {
  const response = await API.get(`/personalization/cart-item/${cartItemId}/`);
  return response.data;
};

// ==========================
// SAVE (create/update) personalization for a cart item
// Accepts a plain object; builds multipart form data only when a photo
// File is present, otherwise sends a normal JSON-friendly payload.
// ==========================
export const savePersonalization = async (cartItemId, { names, date, message, style, photo }) => {
  const formData = new FormData();
  if (names !== undefined) formData.append("names", names);
  if (date !== undefined) formData.append("date", date);
  if (message !== undefined) formData.append("message", message);
  if (style !== undefined) formData.append("style", style);
  if (photo) formData.append("photo", photo);

  const response = await API.post(`/personalization/cart-item/${cartItemId}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// ==========================
// REMOVE personalization from a cart item
// ==========================
export const removePersonalization = async (cartItemId) => {
  const response = await API.delete(`/personalization/cart-item/${cartItemId}/`);
  return response.data;
};
