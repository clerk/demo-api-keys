import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    debugIds: true,
  },
  devIndicators: {
    position: 'bottom-right',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
