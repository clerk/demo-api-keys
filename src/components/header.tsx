'use client'

import { SignInButton, Show, UserButton } from '@clerk/nextjs'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-end">
      <div className="flex items-center gap-2 px-4">
        <Suspense>
          <Show when="signed-out">
            <Button asChild className="border border-primary" variant="outline">
              <SignInButton />
            </Button>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </Suspense>
      </div>
    </header>
  )
}
