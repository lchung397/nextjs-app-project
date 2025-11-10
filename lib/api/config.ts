import axios from 'axios';

// Cấu hình base URL cho API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL// || 'http://34.87.142.32:8080';

// Tạo axios instance với cấu hình mặc định
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - thêm token hoặc xử lý trước khi gửi request
apiClient.interceptors.request.use(
  (config) => {
    // Tự động thêm token vào header nếu có
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - xử lý response hoặc lỗi
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi chung
    if (error.response) {
      // Server trả về lỗi
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error('Network Error:', error.request);
    } else {
      // Lỗi khác
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
