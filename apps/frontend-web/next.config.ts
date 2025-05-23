import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.occstrategy.com",
      },
    ],
  },
};

export default nextConfig;
