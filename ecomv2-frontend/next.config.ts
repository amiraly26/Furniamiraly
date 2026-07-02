// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "159.65.15.249",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "payload.ecomv2.online",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  staticPageGenerationTimeout: 1,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
            "default-src *",
            "script-src * 'unsafe-inline' 'unsafe-eval'",
            "style-src * 'unsafe-inline'",
            "img-src * data: blob:",
            "font-src *",
            "connect-src *",
            "media-src *",
            "frame-src *",
            "object-src *",
          ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
