import api from "./axiosIntance";

export default {
  getAll: (params) => api.get("/app/user", { params }),
  store: (data) => api.post("/app/user", data),
  show: (id) => api.get(`/app/user/${id}`),
  update: (data) => api.post(`/app/user/${data.id}?_method=PUT`, data),
  destroy: (id) => api.delete(`/app/user/${id}`),
};
