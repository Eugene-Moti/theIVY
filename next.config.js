/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for cPanel / shared Node deployments
  output: "standalone",

  // Safer in shared hosting environments
  reactStrictMode: true,

  // Prevents image optimization errors on hosts without Sharp
  images: {
    unoptimized: true,
  },

  // Ensures server actions & headers behave well behind proxies
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.app.github.dev",
        "rsunproperty.net",
        "www.rsunproperty.net",
      ],
    },
  },

  // Speeds up builds & reduces bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Avoids build crashes on some shared hosts
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optional but recommended for SEO + security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
