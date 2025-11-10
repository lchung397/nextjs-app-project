# Hướng dẫn sử dụng API Client

## Cấu trúc thư mục

```
lib/api/
├── config.ts           # Cấu hình axios client và interceptors
├── types.ts            # Định nghĩa TypeScript types/interfaces
├── services/           # Các service classes để gọi API
│   └── app.service.ts  # Service cho app endpoints
└── index.ts            # Export tất cả
```

## Cách sử dụng

### 1. Gọi API trong Client Component

```tsx
'use client';

import { useEffect, useState } from 'react';
import { AppService } from '@/lib/api';

export default function MyComponent() {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AppService.getHello();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return <div>{data}</div>;
}
```

### 2. Gọi API trong Server Component

```tsx
import { AppService } from '@/lib/api';

export default async function MyServerComponent() {
  const data = await AppService.getHello();
  
  return <div>{data}</div>;
}
```

### 3. Thêm service mới

Tạo file mới trong `services/`, ví dụ `user.service.ts`:

```typescript
import { apiClient } from '../config';

export class UserService {
  static async getUsers() {
    const response = await apiClient.get('/users');
    return response.data;
  }

  static async getUserById(id: string) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  }

  static async createUser(userData: any) {
    const response = await apiClient.post('/users', userData);
    return response.data;
  }
}
```

Sau đó export trong `index.ts`:

```typescript
export * from './services/user.service';
```

## Cấu hình

Backend URL được cấu hình trong file `.env.local`:

```
NEXT_PUBLIC_API_URL=http://34.87.142.32:8080
```

## Xử lý lỗi

Tất cả lỗi API đã được xử lý trong interceptor. Bạn có thể tùy chỉnh trong `config.ts`.
