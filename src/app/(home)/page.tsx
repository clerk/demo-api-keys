import Link from 'next/link'
import { BotIcon } from 'lucide-react'
import { Show } from '@clerk/nextjs'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'

function CTAButton() {
  return (
    <>
      <Show when="signed-in">
        <Button asChild>
          <Link href="/dashboard">Continue to Dashboard →</Link>
        </Button>
      </Show>
      <Show when="signed-out">
        <Button asChild>
          <Link href="/sign-in">Get Started</Link>
        </Button>
      </Show>
    </>
  )
}

export default function Home() {
  return (
    <div className="flex w-fit flex-col items-center space-y-4">
      <BotIcon className="mb-4 size-10" />
      <div className="flex flex-col items-center">
        <h1 className="mb-2 font-semibold text-2xl md:text-3xl lg:text-4xl">
          AgentOps
        </h1>
        <p className="text-center text-muted-foreground text-sm md:text-base lg:text-lg">
          Configure and manage your AI agents with ease.
        </p>
      </div>
      <Suspense fallback={null}>
        <CTAButton />
      </Suspense>
    </div>
  )
}
