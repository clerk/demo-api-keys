import { SignIn } from '@clerk/nextjs'
import { Suspense } from 'react'

export default function AuthPage() {
  return (
    <div className="w-full max-w-xs">
      <Suspense fallback={null}>
        <SignIn
          __experimental={{ newComponents: true }}
          path={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
          withSignUp
        />
      </Suspense>
    </div>
  )
}
