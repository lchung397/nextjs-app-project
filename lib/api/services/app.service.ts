import { apiClient } from '../config';

/**
 * Service để gọi các API endpoints chính của ứng dụng
 */
export class AppService {
  /**
   * Lấy thông điệp hello từ backend
   */
  static async getHello(): Promise<string> {
    const response = await apiClient.get<string>('/');
    return response.data;
  }

  // Thêm các methods khác ở đây
  // Ví dụ:
  // static async getUsers(): Promise<User[]> {
  //   const response = await apiClient.get<User[]>('/users');
  //   return response.data;
  // }
  //
  // static async createUser(userData: CreateUserDto): Promise<User> {
  //   const response = await apiClient.post<User>('/users', userData);
  //   return response.data;
  // }
}
