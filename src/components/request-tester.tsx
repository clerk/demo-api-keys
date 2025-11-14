'use client'

import { useState, useMemo } from 'react'
import { CodeTabs } from '@/components/animate-ui/components/animate/code-tabs'
import { Input } from '@/components/ui/input'

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`

const createCodes = (apiKey = '<API_KEY>') => ({
  'get-agents': `curl -X GET ${SITE_URL}/api/agents \
  -H "Authorization: Bearer ${apiKey}"`,
  'create-agent': `curl -X POST ${SITE_URL}/api/agents \
  -H "Authorization: Bearer ${apiKey}" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Agent", "description": "My Agent Description", "model": "gpt-4o"}'`,
  'delete-agent': `curl -X DELETE ${SITE_URL}/api/agents \
  -H "Authorization: Bearer ${apiKey}" \
  -d '{"agentId": "1"}'`,
})

export function RequestTester() {
  const [apiKey, setApiKey] = useState('')

  const codes = useMemo(
    () => createCodes(apiKey.trim() || '<API_KEY>'),
    [apiKey]
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
