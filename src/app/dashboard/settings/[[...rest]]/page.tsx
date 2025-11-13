'use client'

import dynamic from 'next/dynamic'

const OrganizationProfile = dynamic(
  () => import('@clerk/nextjs').then(mod => mod.OrganizationProfile),
  {
    ssr: false,
  }
)

export default function SettingsPage() {
  return (
    <div className="flex items-center justify-center">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: '!w-full',
            cardBox: '!w-full !h-auto !flex !shadow-none !border-none',
            navbar: '!hidden',
            navbarMobileMenuRow: '!hidden',
            scrollBox: '!w-full !h-auto !max-w-none',
          },
        }}
      />
    </div>
  )
}
