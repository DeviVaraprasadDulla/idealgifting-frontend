import API from "./axios";

// ==========================
// GET ALL CATEGORIES
// ==========================
export const getCategories = async () => {
  const response = await API.get("/categories/");
  return response.data;
};

// ==========================
// GET MEGA MENU
// ==========================
export const getMegaMenu = async () => {
  const response = await API.get("/mega-menu/");
  return response.data;
};

// ==========================
// GET CATEGORY DETAIL
// ==========================
export const getCategoryDetail = async (slug) => {
  const response = await API.get(`/categories/${slug}/`);
  return response.data;
};
