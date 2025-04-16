import api from "./axiosIntance";

const authService = {
  login: (data) => api.post("/auth/login", data),
  refresh: () => api.post("/auth/refresh"),
  logout: () => api.post("/auth/logout"),
};

export default authService;
