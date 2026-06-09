import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mnmlai.dev",
      },
      {
        protocol: "https",
        hostname: "api.mnml.ai",
      },
    ],
  },
};

export default nextConfig;
