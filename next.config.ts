import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
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
