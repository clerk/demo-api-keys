'use client'

import { useEffect, useState } from 'react'
import { useOrganization } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarMenuButton } from '@/components/ui/sidebar'

export function ActiveOrg() {
  const [role, setRole] = useState<string>()
  const { organization, isLoaded } = useOrganization({
    memberships: true,
  })

  useEffect(() => {
    if (organization) {
      organization.getMemberships().then(memberships => {
        setRole(memberships.data[0].roleName)
      })
    }
  }, [organization])

  if (!isLoaded) {
    return (
      <SidebarMenuButton className="pl-0" size="lg">
        <Avatar className="size-8 rounded-lg">
          <AvatarFallback className="rounded-lg border border-border" />
        </Avatar>
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuButton className="pl-0" size="lg">
      <Avatar className="size-8 rounded-lg">
        <AvatarImage alt={organization?.name} src={organization?.imageUrl} />
        <AvatarFallback className="rounded-lg border border-border" />
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        {organization ? (
          <>
            <span className="truncate font-medium">{organization.name}</span>
            {role && <span className="truncate text-xs">{role}</span>}
          </>
        ) : (
          <span className="truncate font-medium text-destructive">
            No organization selected
          </span>
        )}
      </div>
    </SidebarMenuButton>
  )
}
