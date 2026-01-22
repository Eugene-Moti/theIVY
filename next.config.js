/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // ← This is crucial for cPanel/Node.js deployments
  // Optional: Add these if you have images or want better perf
  images: {
    unoptimized: true,  // Often needed on shared hosting without image optimization support
  },
  // reactStrictMode: true,  // Good default, add if missing
};

module.exports = nextConfig;