import type { NextConfig } from "next";

const rawImageDomain =
  process.env.NEXT_PUBLIC_IMAGE_DOMAIN ||
  "https://urban-living-bucket.s3.us-east-1.amazonaws.com";

let customHost = "urban-living-bucket.s3.us-east-1.amazonaws.com";
let customProtocol: "http" | "https" = "https";

try {
  const parsed = new URL(
    rawImageDomain.startsWith("http") ? rawImageDomain : `https://${rawImageDomain}`
  );
  customHost = parsed.hostname;
  customProtocol = parsed.protocol.replace(":", "") as "http" | "https";
} catch {
  // Use default host
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: customProtocol,
        hostname: customHost,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev-urban-living-bucket.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "urbanliving.client.intecai.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.urbanlivings.co.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "urban-living-bucket.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
    qualities: [70, 75, 80, 85, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
