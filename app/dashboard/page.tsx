'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Typography, Space, Spin, message } from 'antd';
import { AuthService, type UserProfile } from '@/lib/api';

const { Title, Text } = Typography;

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = AuthService.getToken();
        if (!token) {
          router.push('/login');
          return;
        }

        const profile = await AuthService.getMe(token);
        setUser(profile);
      } catch (error) {
        message.error('Phiên đăng nhập hết hạn');
        AuthService.removeToken();
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    AuthService.removeToken();
    message.success('Đăng xuất thành công!');
    router.push('/login');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Card
          style={{
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>Dashboard</Title>
              <Text type="secondary">Chào mừng bạn đến với hệ thống!</Text>
            </div>

            {user && (
              <Card
                title="Thông tin tài khoản"
                style={{ background: '#f5f5f5' }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>ID: </Text>
                    <Text code>{user.id}</Text>
                  </div>
                  <div>
                    <Text strong>Tên: </Text>
                    <Text>{user.name}</Text>
                  </div>
                  <div>
                    <Text strong>Email: </Text>
                    <Text>{user.email}</Text>
                  </div>
                  <div>
                    <Text strong>Ngày tạo: </Text>
                    <Text>{new Date(user.createdAt).toLocaleString('vi-VN')}</Text>
                  </div>
                </Space>
              </Card>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <Button type="primary" onClick={() => router.push('/')}>
                Về trang chủ
              </Button>
              <Button onClick={() => router.push('/admin')}>
                Admin Panel
              </Button>
              <Button danger onClick={handleLogout}>
                Đăng xuất
              </Button>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
}
