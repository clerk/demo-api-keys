'use server'

import { checkAuth } from './check-auth'
import { getAgents, createAgent, deleteAgent } from './metadata-utils'
import type { AgentInput } from './metadata-utils'

export async function getAgentsAction() {
  const { success, error, data } = await checkAuth()
  if (!success) {
    throw new Error(error.message)
  }
  return getAgents(data.orgId)
}

export async function createAgentAction(payload: AgentInput) {
  const { success, error, data } = await checkAuth()
  if (!success) {
    throw new Error(error.message)
  }
  return await createAgent(data.orgId, payload)
}

export async function deleteAgentAction(agentId: string) {
  const { success, error, data } = await checkAuth()
  if (!success) {
    throw new Error(error.message)
  }
  return deleteAgent(data.orgId, agentId)
}
