import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // thêm các tùy chọn khác ở đây
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
