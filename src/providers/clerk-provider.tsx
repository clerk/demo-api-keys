import { ClerkProvider as ClerkNextJSProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/ui/themes'

type ClerkProviderProps = React.ComponentProps<typeof ClerkNextJSProvider>

export function ClerkProvider({
  children,
  appearance = {},
  ...props
}: ClerkProviderProps) {
  return (
    <ClerkNextJSProvider
      {...props}
      appearance={{
        theme: shadcn,
        ...appearance,
        options: {
          ...appearance.options,
          helpPageUrl: 'https://clerk.com/docs',
          privacyPageUrl: 'https://clerk.com/legal/privacy',
          termsPageUrl: 'https://clerk.com/legal/terms',
          logoImageUrl: '/clerk-light.png',
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
      supportEmail="support@clerk.dev"
    >
      {children}
    </ClerkNextJSProvider>
  )
}
