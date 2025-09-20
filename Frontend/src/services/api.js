import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Error Details:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Member API functions
export const memberAPI = {
  findByPhone: (phone) => api.get(`/members/phone/${encodeURIComponent(phone)}`),
  create: (memberData) => api.post('/members', memberData),
  getById: (id) => api.get(`/members/${id}`),
  update: (id, memberData) => api.put(`/members/${id}`, memberData),
  delete: (id) => api.delete(`/members/${id}`),
  getRecharges: (id) => api.get(`/members/${id}/recharges`),
  getTransactions: (id) => api.get(`/members/${id}/transactions`),
  getAll: () => api.get('/members'),
};

// Game API functions
export const gameAPI = {
  getAll: () => api.get('/games'),
  getById: (id) => api.get(`/games/${id}`),
  create: (gameData) => api.post('/games', gameData),
  update: (id, gameData) => api.put(`/games/${id}`, gameData),
  delete: (id) => api.delete(`/games/${id}`),
};

// Recharge API functions
export const rechargeAPI = {
  create: (rechargeData) => api.post('/recharges', rechargeData),
  getAll: () => api.get('/recharges'),
  getById: (id) => api.get(`/recharges/${id}`),
  update: (id, rechargeData) => api.put(`/recharges/${id}`, rechargeData),
  delete: (id) => api.delete(`/recharges/${id}`),
};

// Transaction API functions
export const transactionAPI = {
  create: (transactionData) => api.post('/transactions', transactionData),
  getAll: () => api.get('/transactions'),
  getById: (id) => api.get(`/transactions/${id}`),
  update: (id, transactionData) => api.put(`/transactions/${id}`, transactionData),
  delete: (id) => api.delete(`/transactions/${id}`),
};

// Collection API functions
export const collectionAPI = {
  getByDay: (dateStr) => api.get(`/collections/day/${dateStr}`),
  getByTimestamp: (timestamp) => api.get(`/collections/date/${timestamp}`),
  create: (collectionData) => api.post('/collections', collectionData),
  getAll: () => api.get('/collections'),
  getById: (id) => api.get(`/collections/${id}`),
  update: (id, collectionData) => api.put(`/collections/${id}`, collectionData),
  delete: (id) => api.delete(`/collections/${id}`),
};

// Admin User API functions
export const adminAPI = {
  getAll: () => api.get('/admin_users'),
  getById: (id) => api.get(`/admin_users/${id}`),
  findByPhone: (phone) => api.get(`/admin_users/phone/${encodeURIComponent(phone)}`),
  create: (adminData) => api.post('/admin_users', adminData),
  update: (id, adminData) => api.put(`/admin_users/${id}`, adminData),
  delete: (id) => api.delete(`/admin_users/${id}`),
  // Login by phone number
  loginByPhone: async (phone, password) => {
    const response = await adminAPI.findByPhone(phone);
    const admin = response.data;
    if (admin.password === password) {
      return { data: admin };
    } else {
      throw new Error('Invalid password');
    }
  },
  // Legacy login by username (for backward compatibility)
  login: async (username, password) => {
    const response = await api.get('/admin_users');
    const admins = response.data;
    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
      return { data: admin };
    } else {
      throw new Error('Invalid credentials');
    }
  },
};

export default api;
