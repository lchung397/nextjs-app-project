'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { AuthService, type SignInData } from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values: SignInData) => {
    try {
      setLoading(true);
      const response = await AuthService.signIn(values);
      AuthService.saveToken(response.access_token);
      message.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Background Image for Mobile */}
      <div className="absolute inset-0 z-0 hidden md:hidden mobile-bg">
        <img 
          src="/login.png" 
          alt="Background"
          className="w-full h-full object-cover blur-[8px]"
        />
      </div>

      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 md:px-10 bg-white relative z-10 overflow-y-auto md:bg-white/95 md:backdrop-blur-[10px] md:rounded-[20px] md:m-5 md:shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        <div className="w-full max-w-[400px]">
          <h1 className="text-[32px] font-bold mb-2 text-black">
            Welcome back!
          </h1>
          <p className="text-gray-600 mb-10 text-sm">
            Enter your credentials to access your account
          </p>

          <Form
            name="login"
            onFinish={handleLogin}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label={<span className="text-black">User name</span>}
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Invalid email!' }
              ]}
            >
              <Input 
                placeholder="Enter your username"
                className="h-[45px] rounded-lg border-gray-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-black">Password</span>}
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password 
                placeholder="Enter your password"
                className="h-[45px] rounded-lg border-gray-300"
              />
            </Form.Item>

            <div className="flex justify-between items-center mb-6">
              <Checkbox>Remember for 30 days</Checkbox>
              <Link href="#" className="text-[#00b4a8] text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="h-[45px] rounded-lg bg-[#00b4a8] hover:bg-[#009a8f] border-none text-base font-medium mb-5"
            >
              Login
            </Button>

            <div className="text-center text-gray-400 mb-5 text-sm">
              Or
            </div>

            <div className="flex gap-3 mb-8">
              <Button
                block
                className="h-[45px] rounded-lg border-gray-300 flex items-center justify-center gap-2"
              >
                <span className="text-lg">G</span> Sign in with Google
              </Button>
              <Button
                block
                className="h-[45px] rounded-lg border-gray-300 flex items-center justify-center gap-2"
              >
                <span className="text-lg"></span> Sign in with Apple
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don`t have an account? </span>
              <Link href="/signup" className="text-[#00b4a8] font-medium hover:underline">
                Sign Up
              </Link>
            </div>
          </Form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex flex-1 bg-gray-100 items-center justify-center relative overflow-hidden">
        <img 
          src="/login.png" 
          alt="Login illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
