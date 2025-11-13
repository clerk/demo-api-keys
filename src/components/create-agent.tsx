'use client'

import { useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Agent } from '@/lib/clerk/metadata-utils'

type CreateAgentProps = {
  createAgent: (payload: Agent) => Promise<void>
  isPending: boolean
}

export function CreateAgentButton({
  createAgent,
  isPending,
}: CreateAgentProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [open, setOpen] = useState(false)

  async function formAction(formData: FormData) {
    const agent = {
      id: nanoid(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      model: formData.get('model') as string,
    } satisfies Agent
    await createAgent(agent)
    setOpen(false)
    formRef.current?.reset()
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Add Agent</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Agent</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a new agent to your organization.
        </DialogDescription>
        <form action={formAction} className="space-y-4" ref={formRef}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldDescription>The name of the agent.</FieldDescription>
                <Input
                  id="name"
                  name="name"
                  placeholder="Order Processing Agent"
                  type="text"
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="model">Model</FieldLabel>
                <Select defaultValue="gpt-5-nano" name="model">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-5-nano">GPT-5 nano</SelectItem>
                    <SelectItem value="gpt-4o-mini">GPT-4o mini</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <FieldDescription>
                  The description of the agent.
                </FieldDescription>
                <Input
                  id="description"
                  name="description"
                  placeholder="Description"
                  type="text"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <Button disabled={isPending} type="submit">
              Add Agent
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
