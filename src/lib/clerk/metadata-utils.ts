import { nanoid } from 'nanoid'
import { clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'

const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  model: z.string(),
})

const agentInputSchema = agentSchema.omit({ id: true }).extend({
  id: z.string().optional(),
})

export type Agent = z.infer<typeof agentSchema>
export type AgentInput = z.input<typeof agentInputSchema>

export async function getAgents(organizationId: string): Promise<Agent[]> {
  const clerk = await clerkClient()
  const org = await clerk.organizations.getOrganization({ organizationId })
  return org.publicMetadata?.agents || []
}

export async function createAgent(organizationId: string, agent: AgentInput) {
  const clerk = await clerkClient()
  const org = await clerk.organizations.getOrganization({
    organizationId,
  })
  const newAgent = agentSchema.parse({
    ...agentInputSchema.parse(agent),
    id: nanoid(),
  })
  await clerk.organizations.updateOrganizationMetadata(organizationId, {
    publicMetadata: {
      agents: [...(org.publicMetadata?.agents || []), newAgent],
    },
  })
  return newAgent
}

export const deleteAgent = async (organizationId: string, agentId: string) => {
  const clerk = await clerkClient()
  const org = await clerk.organizations.getOrganization({
    organizationId,
  })
  const agents =
    org.publicMetadata?.agents?.filter(agent => agent.id !== agentId) || []
  await clerk.organizations.updateOrganizationMetadata(organizationId, {
    publicMetadata: {
      agents,
    },
  })
  return { success: true, agents }
}
