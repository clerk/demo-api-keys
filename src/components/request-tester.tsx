'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'
import { CodeTabs } from '@/components/animate-ui/components/animate/code-tabs'
import { Input } from '@/components/ui/input'

const subscribe = () => () => {
  // The origin never changes, so there's nothing to unsubscribe from
}
const getOrigin = () => window.location.origin
const getServerOrigin = () => 'http://localhost:3000'

const createCodes = (siteUrl: string, apiKey = '<API_KEY>') => ({
  'get-agents': `curl -X GET ${siteUrl}/api/agents \
  -H "Authorization: Bearer ${apiKey}"`,
  'create-agent': `curl -X POST ${siteUrl}/api/agents \
  -H "Authorization: Bearer ${apiKey}" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Agent", "description": "My Agent Description", "model": "gpt-4o"}'`,
  'delete-agent': `curl -X DELETE ${siteUrl}/api/agents \
  -H "Authorization: Bearer ${apiKey}" \
  -d '{"agentId": "1"}'`,
})

export function RequestTester() {
  const [apiKey, setApiKey] = useState('')
  const siteUrl = useSyncExternalStore(subscribe, getOrigin, getServerOrigin)

  const codes = useMemo(
    () => createCodes(siteUrl, apiKey.trim() || '<API_KEY>'),
    [siteUrl, apiKey]
  )

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="max-w-md">
        <Input
          onChange={e => setApiKey(e.target.value)}
          placeholder="Enter API key to prefill the sample requests"
          type="text"
          value={apiKey}
        />
      </div>
      <CodeTabs
        codes={codes}
        lang="bash"
        onCopiedChange={async (copied, content) => {
          if (!(copied && content)) {
            return
          }
          await navigator.clipboard.writeText(content)
        }}
      />
    </div>
  )
}
