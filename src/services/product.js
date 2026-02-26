import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getProducts = () => API.get("/products");

// GET product by ID
export const getProduct = (id) => API.get(`/products/${id}`);

// ADD product
export const addProduct = (data) => API.post("/products", data);

// UPDATE product
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);

// DELETE product
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const Logins = (data) => API.post('/login', data)

export const Registers = (data) => API.post('/register',data)

export const forgotPassword = (email) => API.post('/forgot-password',{email})

export const resetPassword = (data) => API.post('/reset-password', data)

API.interceptors.request.use(req => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API



