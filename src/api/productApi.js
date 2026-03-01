import axios from "./axios";

// ==========================
// GET PRODUCTS (WITH FILTER SUPPORT)
// ==========================
export const getProducts = ({
  categorySlug,
  subcategorySlug,
  filters,
  sort,
} = {}) => {
  const params = {};

  if (categorySlug) {
    params.category_slug = categorySlug;
  }

  if (subcategorySlug) {
    params.subcategory_slug = subcategorySlug;
  }

  if (filters && filters.length > 0) {
    params.filters = filters.join(",");
  }

  if (sort) {
    params.sort = sort;
  }

  return axios.get("products/", { params });
};

// ==========================
// GET FEATURED PRODUCTS
// ==========================
export const getFeaturedProducts = () => {
  return axios.get("products/featured/");
};

// ==========================
// PRODUCT DETAIL
// ==========================
export const getProductDetail = (id) => {
  return axios.get(`products/${id}/`);
};

// ==========================
// SEARCH PRODUCTS
// ==========================
export const searchProducts = (query) => {
  return axios.get("products/search/", {
    params: { q: query },
  });
};

// ==========================
// GET FILTERS (DYNAMIC)
// ==========================
export const getFilters = (categoryId) => {
  if (!categoryId) return Promise.resolve({ data: [] });

  return axios.get("filters/", {
    params: { category: categoryId },
  });
};

// ==========================
// SUBMIT RATING
// ==========================
export const submitRating = (productId, rating) => {
  return axios.post("submit-review/", {
    product: productId,
    rating: rating,
  });
};
