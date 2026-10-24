import { auth } from '@clerk/nextjs/server'
import { DataTable } from '@/components/data-table'
import { getAgentsAction } from '@/lib/clerk/actions'

export default async function Page() {
  const { orgId } = await auth.protect()
  const agents = await getAgentsAction()
  return <DataTable data={agents} key={orgId} />
}
