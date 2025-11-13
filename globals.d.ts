import type { Agent } from '@/lib/clerk/metadata-utils'

declare global {
  interface OrganizationPublicMetadata {
    agents?: Agent[]
  }
}
