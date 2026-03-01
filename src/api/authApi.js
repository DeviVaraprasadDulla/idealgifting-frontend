import API from "./axios";

// ===============================
// LOGIN
// ===============================
export const loginUser = async (data) => {
  const response = await API.post("/users/login/", data);
  return response.data;
};

// ===============================
// SIGNUP
// ===============================
export const signupUser = async (data) => {
  const response = await API.post("/users/signup/", data);
  return response.data;
};

// ===============================
// LOGOUT
// ===============================
export const logoutUser = async (data) => {
  const response = await API.post("/users/logout/", data);
  return response.data;
};

// ===============================
// GET CURRENT USER
// ===============================
export const getCurrentUser = async () => {
  const response = await API.get("/users/me/");
  return response.data;
};

// ===============================
// GOOGLE LOGIN
// ===============================
export const googleLoginUser = async (data) => {
  const response = await API.post("/users/google-login/", data);
  return response.data;
};

// ================= RESET PASSWORD =================

export const sendResetOTP = async (email) => {
  const response = await API.post("/users/auth/reset/send-otp/", {
    email,
  });
  return response.data;
};

export const verifyResetOTP = async (data) => {
  const response = await API.post("/users/auth/reset/verify-otp/", data);
  return response.data;
};
