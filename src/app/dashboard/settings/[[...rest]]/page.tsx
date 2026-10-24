import { auth } from '@clerk/nextjs/server'
import { OrganizationProfile } from '@clerk/nextjs'
import { Suspense } from 'react'

export default async function SettingsPage() {
  await auth.protect()

  return (
    <div className="flex items-center justify-center">
      <Suspense>
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
      </Suspense>
    </div>
  )
}
