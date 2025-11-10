// Định nghĩa các types cho API responses

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status?: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Thêm các interface khác cho các entity của bạn
// Ví dụ:
// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }
