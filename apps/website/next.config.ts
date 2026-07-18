import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@wafflella/firebase", "@wafflella/hooks", "@wafflella/types"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
