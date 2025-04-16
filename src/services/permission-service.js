import api from "./axiosIntance";

export default {
  getAll: (params) => api.get("/app/permission", { params }),
  store: (data) => api.post("/app/permission", data),
  show: (id) => api.get(`/app/permission/${id}`),
  update: (data) => api.post(`/app/permission/${data.id}?_method=PUT`, data),
  destroy: (id) => api.delete(`/app/permission/${id}`),
};
