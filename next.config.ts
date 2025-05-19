import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone", // custom server için önerilir

     eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;
