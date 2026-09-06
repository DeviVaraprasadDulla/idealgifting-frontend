import API from "./axios";

// ==========================
// CONTACT ENQUIRY
// ==========================
export const submitContactEnquiry = async (data) => {
  const response = await API.post("/enquiries/contact/", data);
  return response.data;
};

// ==========================
// CORPORATE ENQUIRY
// ==========================
export const submitCorporateEnquiry = async (data) => {
  const response = await API.post("/enquiries/corporate/", data);
  return response.data;
};
