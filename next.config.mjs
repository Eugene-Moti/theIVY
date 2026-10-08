/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aspvhjmmaaaivzezsnur.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      // /buy folded into the Developments hub
      { source: '/buy', destination: '/developments', permanent: true },
    ]
  },
}

export default nextConfig
