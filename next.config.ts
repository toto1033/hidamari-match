import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/services', destination: '/search', permanent: true },
      { source: '/services/:id', destination: '/facilities/:id', permanent: true },
    ];
  },
};

export default nextConfig;
