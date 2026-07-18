import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@wafflella/firebase", "@wafflella/types"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
