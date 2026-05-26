<p align="center">
  <a href="https://go.clerk.com/e3UDpP4" target="_blank" rel="noopener noreferrer">
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./public/mark-light.png">
      <img src="./public/mark-dark.png" height="64">
    </picture>
  </a>
  <br />
</p>
<div align="center">
  <h1>
    # Clerk Organization API Keys — AI SaaS Dashboard Quickstart
  </h1>
  <a href="https://www.npmjs.com/package/@clerk/nextjs">
    <img alt="" src="https://img.shields.io/npm/dm/@clerk/nextjs" />
  </a>
  <a href="https://clerk.com/discord">
    <img alt="Discord" src="https://img.shields.io/discord/856971667393609759?color=7389D8&label&logo=discord&logoColor=ffffff" />
  </a>
  <a href="https://x.com/clerk">
    <img alt="Follow on X" src="https://img.shields.io/twitter/url.svg?label=%40clerk&style=social&url=https%3A%2F%2Fx.com%2Fclerk" />
  </a>
  <br />
  <br />
  <img alt="Clerk Hero Image" src="public/hero.png">
</div>

## Introduction

This quickstart is a minimal **AI SaaS Dashboard** demonstrating how to use **Clerk’s new Organization-Scoped API Keys** together with **multi-tenant, org-aware UI & API routes**.

This example consists of a simple dashboard page renders a table of “agents.”
For demo purposes, agent data is stored inside the **organization’s `publicMetadata`**.

## Features 

The example shows how to:

- Force users into **organization-only mode** by disabling personal accounts
- Allow org members with the correct **system permissions** view, generate, and revoke organization API keys
- Use both Clerk’s `<OrganizationProfile />` and `<APIKeys />` component to easily add API Keys as a feature in your application
- Protect resources with API routes that accept both **session tokens** *and* **organization API keys** 
- Scope resources to the **active organization**
- Allow org users to switch between organizations via the Clerk Org Switcher and see different data per org

---

## API Routes — Multi-Token Verification

This example exposes:

```
/api/agents
  GET     → list agents
  POST    → create an agent
  DELETE  → delete an agent
```

Each route uses:

```ts
auth({ acceptsToken: ['api_key', 'session_token'] })
```

### Session Token

- Sent automatically via cookies
- Used by logged-in dashboard users

### Organization API Key

- Sent as a **Bearer token**
- Used by external scripts or remote requests

Example request:

```bash
curl -X GET http://localhost:3000/api/agents \
  -H "Authorization: Bearer org_api_key_..."
```

Both authentication modes access the same org-scoped data.

---

### Agent Schema for POST Requests

**Create an agent** by sending:

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "model": "string"
}
```

**Delete an agent** by sending:

```json
{
  "agentId": "string"
}
```

---


### API Keys UI

Adding UI support for API Keys is as simple as using Clerk's drop in components:

#### 1. <OrganizationProfile /> component 


```tsx
import { OrganizationProfile } from '@clerk/nextjs'

<OrganizationProfile />
```

This component contains an **“API Keys”** tab that automatically appears for users with the required permissions.
This tab will also appear in modals that show that the organization profile.

#### 2. Dedicated API Keys component


```tsx
import { APIKeys } from '@clerk/nextjs'

<APIKeys />
```

Based on permissions, both components show:

- List of org API keys (`read`)
- Generate button (`manage`)
- Revoke button (`manage`)


---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/clerk/demo-api-keys.git
cd <project>
bun install
```

---


### 2. Enable Organization API Keys

Navigate to:

```
Clerk Dashboard → Configure → Organization Management → Roles & Permissions
```

- Ensure **organizations** are enabled
- Ensure **personal accounts are disabled**
- Assign a role with:

  - `org:sys_api_keys:read`
  - `org:sys_api_keys:manage`

to your test users.

---


### 3. Configure your application
add the following to `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/dashboard"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/dashboard"
```

---

### 4. Run the example

```bash
bun dev
```

Visit:

```text
http://localhost:3000
```

You will be required to create or join an organization, then you can:

- View / generate / revoke org API keys
- Create / list / delete AI agents
- Switch orgs and see isolated data
- Make http requests using org API keys

