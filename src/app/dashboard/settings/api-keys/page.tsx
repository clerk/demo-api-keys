'use client'

import { APIKeys } from '@clerk/nextjs'

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <h1 className="font-semibold text-lg">API keys (custom UI)</h1>
      <APIKeys showDescription type="api_key" />
    </div>
  )
}
