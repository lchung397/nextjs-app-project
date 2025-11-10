'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Typography, Space, Spin, message, Table } from 'antd';
import { AuthService, type UserProfile } from '@/lib/api';

const { Title, Text } = Typography;

export default function AdminPage() {
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
        message.error('Session expired');
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
    message.success('Logged out successfully!');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  // Mock data for admin dashboard
  const dataSource = [
    { key: '1', name: 'Total Users', value: '1,234', status: 'Active' },
    { key: '2', name: 'New Signups', value: '56', status: 'Today' },
    { key: '3', name: 'Active Sessions', value: '789', status: 'Online' },
  ];

  const columns = [
    { title: 'Metric', dataIndex: 'name', key: 'name' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-5 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Title level={1} className="!mb-2">Admin Dashboard</Title>
            <Text className="text-gray-600">Welcome back, {user?.name}!</Text>
          </div>
          <Space>
            <Button onClick={() => router.push('/dashboard')}>
              User Dashboard
            </Button>
            <Button onClick={() => router.push('/')}>
              Home
            </Button>
            <Button danger onClick={handleLogout}>
              Logout
            </Button>
          </Space>
        </div>

        {/* User Info Card */}
        <Card className="mb-6 shadow-lg">
          <Title level={4}>Admin Information</Title>
          <Space direction="vertical" className="w-full">
            <div className="flex gap-2">
              <Text strong>ID:</Text>
              <Text code>{user?.id}</Text>
            </div>
            <div className="flex gap-2">
              <Text strong>Name:</Text>
              <Text>{user?.name}</Text>
            </div>
            <div className="flex gap-2">
              <Text strong>Email:</Text>
              <Text>{user?.email}</Text>
            </div>
            <div className="flex gap-2">
              <Text strong>Created:</Text>
              <Text>{user?.createdAt ? new Date(user.createdAt).toLocaleString('vi-VN') : 'N/A'}</Text>
            </div>
          </Space>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Title level={2} className="!text-white !mb-2">1,234</Title>
            <Text className="text-white text-lg">Total Users</Text>
          </Card>
          <Card className="shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <Title level={2} className="!text-white !mb-2">56</Title>
            <Text className="text-white text-lg">New Today</Text>
          </Card>
          <Card className="shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <Title level={2} className="!text-white !mb-2">789</Title>
            <Text className="text-white text-lg">Active Now</Text>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="shadow-lg">
          <Title level={4} className="mb-4">System Metrics</Title>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
      </div>
    </div>
  );
}
