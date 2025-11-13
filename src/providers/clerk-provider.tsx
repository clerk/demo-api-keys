'use client'

import { useTheme } from 'next-themes'
import { ClerkProvider as ClerkNextJSProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'

type ClerkProviderProps = React.ComponentProps<typeof ClerkNextJSProvider>

export function ClerkProvider({
  children,
  appearance = {},
  ...props
}: ClerkProviderProps) {
  const { resolvedTheme } = useTheme()
  return (
    <ClerkNextJSProvider
      {...props}
      appearance={{
        theme: shadcn,
        ...appearance,
        layout: {
          ...appearance.layout,
          helpPageUrl: 'https://clerk.com/docs',
          privacyPageUrl: 'https://clerk.com/legal/privacy',
          termsPageUrl: 'https://clerk.com/legal/terms',
          logoImageUrl:
            resolvedTheme === 'dark' ? '/clerk-dark.png' : '/clerk-light.png',
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
      supportEmail="nick.scott@clerk.dev"
    >
      {children}
    </ClerkNextJSProvider>
  )
}
