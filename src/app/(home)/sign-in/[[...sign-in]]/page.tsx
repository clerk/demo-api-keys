import { SignIn } from '@clerk/nextjs'

export default function AuthPage() {
  return (
    <SignIn
      __experimental={{ newComponents: true }}
      path={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      withSignUp
    />
  )
}
