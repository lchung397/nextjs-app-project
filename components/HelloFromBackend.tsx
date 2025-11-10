'use client';

import { useEffect, useState } from 'react';
import { AppService } from '@/lib/api';

/**
 * Component ví dụ để gọi API từ backend
 */
export default function HelloFromBackend() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await AppService.getHello();
        setMessage(data);
      } catch (err) {
        setError('Không thể kết nối đến backend');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Lỗi: {error}</div>;
  }

  return (
    <div>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
        {message}
      </p>
    </div>
  );
}
