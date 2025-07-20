import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
    images: {
        domains: ["localhost", "images.ygoprodeck.com"],
    },
};

export default nextConfig;
