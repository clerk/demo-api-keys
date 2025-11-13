import { NextResponse, type NextRequest } from 'next/server'
import { checkAuth } from '@/lib/clerk/check-auth'
import { getAgents, createAgent, deleteAgent } from '@/lib/clerk/metadata-utils'

export async function GET() {
  const { success, error, data } = await checkAuth()
  if (!success) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }

  const agents = await getAgents(data.orgId)

  return NextResponse.json({ success: true, data: agents }, { status: 200 })
}

export async function POST(req: NextRequest) {
  const { success, error, data } = await checkAuth()

  if (!success) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }

  const payload = await req.json()
  const agent = await createAgent(data.orgId, payload)
  return NextResponse.json({ success: true, data: agent }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { success, error, data } = await checkAuth()

  if (!success) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }

  const { agentId } = await req.json()
  const agent = await deleteAgent(data.orgId, agentId)
  return NextResponse.json({ success: true, data: agent }, { status: 200 })
}
