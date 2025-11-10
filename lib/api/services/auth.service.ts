import { apiClient } from '../config';

export interface IUser {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

/**
 * Service để xử lý authentication
 */
export class AuthService {
  /**
   * Đăng ký user mới
   */
  static async signUp(data: IUser): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  }

  /**
   * Đăng nhập
   */
  static async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signin', data);
    return response.data;
  }

  /**
   * Lấy thông tin user hiện tại
   */
  static async getMe(token: string): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  /**
   * Lưu token vào localStorage và cookies
   */
  static saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
      // Lưu vào cookie để middleware có thể đọc
      document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24}`; // 24 hours
    }
  }

  /**
   * Lấy token từ localStorage
   */
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  /**
   * Xóa token (logout)
   */
  static removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      // Xóa cookie
      document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  /**
   * Kiểm tra user đã login chưa
   */
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
