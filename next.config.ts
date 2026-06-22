import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
};

module.exports = {
  allowedDevOrigins: ['rooster-production.up.railway.app'],
}

export default nextConfig;
