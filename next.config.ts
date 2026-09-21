import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "https://urbanliving.client.intecai.in/api/:path*",
      },
    ];
  },
};

export default nextConfig;
