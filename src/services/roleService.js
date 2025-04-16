import api from "./axiosIntance";

export default {
  getAll: (params) => api.get("/app/role", { params }),
  store: (data) => api.post("/app/role", data),
  show: (id) => api.get(`/app/role/${id}`),
  update: (data) => api.post(`/app/role/${data.id}?_method=PUT`, data),
  destroy: (id) => api.delete(`/app/role/${id}`),
};
