import API from "./axios";

export const getBanners = async () => {
  const response = await API.get("/banners/");
  return response.data;
};
