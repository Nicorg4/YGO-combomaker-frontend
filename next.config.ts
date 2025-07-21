import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
    images: {
        domains: ["localhost", "images.ygoprodeck.com", 'ygo-combomaker-backend-production.up.railway.app'],
    },
};

export default nextConfig;
