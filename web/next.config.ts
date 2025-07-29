import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {}
  },
  images: {
    domains: ["127.0.0.1", "localhost"],
  }
};

export default nextConfig;
