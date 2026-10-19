import { auth } from '@clerk/nextjs/server'
import { DataTable } from '@/components/data-table'
import { getAgentsAction } from '@/lib/clerk/actions'

export const dynamic = 'force-dynamic'

export default async function Page() {
  await auth.protect()
  const agents = await getAgentsAction()
  return <DataTable data={agents} />
}
