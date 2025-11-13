import type { Metadata } from 'next'
import { Geist, JetBrains_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { ClerkProvider } from '@/providers/clerk-provider'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Clerk API Keys Quickstart',
    template: '%s | Clerk API Keys Quickstart',
  },
  description: 'A quickstart for using Clerk API Keys',
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  preload: true,
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  preload: true,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html
        className={cn(geistSans.variable, jetBrainsMono.variable)}
        lang="en"
        suppressHydrationWarning
      >
        <body className="antialiased">
          <Toaster position="top-right" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
