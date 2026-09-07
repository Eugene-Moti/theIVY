/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // /buy folded into the Developments hub
      { source: '/buy', destination: '/developments', permanent: true },
    ]
  },
}

export default nextConfig
