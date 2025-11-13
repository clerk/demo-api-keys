'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreateAgentButton } from '@/components/create-agent'
import { createColumns } from './columns'
import { createAgentAction, deleteAgentAction } from '@/lib/clerk/actions'
import type { Agent } from '@/lib/clerk/metadata-utils'

export function DataTable({ data: initialData }: { data: Agent[] }) {
  const [data, setData] = useState<Agent[]>(initialData)
  const [loading, setLoading] = useState(false)

  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  async function createAgent(payload: Agent) {
    setLoading(true)
    // Optimistic update: Add the item immediately to the UI
    setData(prevData => [...prevData, payload])
    try {
      await createAgentAction(payload)
      toast.success(`Successfully created agent ${payload.name}`)
    } catch (error) {
      // Roll back in case of an error
      setData(prevData => prevData.filter(item => item.id !== payload.id))
      console.error('Failed to add agent:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteAgent(agent: Agent) {
    setLoading(true)
    setData(prevData => prevData.filter(item => item.id !== agent.id))
    try {
      await deleteAgentAction(agent.id)
      toast.success(`Successfully deleted agent ${agent.name}`)
    } catch (error) {
      // Roll back in case of an error
      setData(prevData => [...prevData, agent])
      console.error('Failed to delete agent:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = createColumns(deleteAgent)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: row => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <Tabs className="flex w-full flex-1 flex-col" defaultValue="agents">
      <TabsList className="grid min-w-xs grid-cols-2">
        <TabsTrigger value="agents">Agents</TabsTrigger>
        <TabsTrigger value="prompts">Prompts</TabsTrigger>
      </TabsList>
      <TabsContent value="agents">
        <div className="flex h-full flex-col justify-between gap-4">
          <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-end">
              <CreateAgentButton
                createAgent={createAgent}
                isPending={loading}
              />
            </div>
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted">
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead colSpan={header.colSpan} key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="**:data-[slot=table-cell]:first:w-8">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row => (
                      <TableRow
                        data-state={row.getIsSelected() && 'selected'}
                        key={row.id}
                      >
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        className="h-24 text-center"
                        colSpan={columns.length}
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex items-center justify-between px-4">
            <div className="hidden flex-1 text-muted-foreground text-sm lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label className="font-medium text-sm" htmlFor="rows-per-page">
                  Rows per page
                </Label>
                <Select
                  onValueChange={value => {
                    table.setPageSize(Number(value))
                  }}
                  value={`${table.getState().pagination.pageSize}`}
                >
                  <SelectTrigger className="w-20" id="rows-per-page" size="sm">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map(pageSize => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center font-medium text-sm">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  className="hidden h-8 w-8 p-0 lg:flex"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.setPageIndex(0)}
                  variant="outline"
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft />
                </Button>
                <Button
                  className="size-8"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                  size="icon"
                  variant="outline"
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft />
                </Button>
                <Button
                  className="size-8"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                  size="icon"
                  variant="outline"
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight />
                </Button>
                <Button
                  className="hidden size-8 lg:flex"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  size="icon"
                  variant="outline"
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="prompts" />
    </Tabs>
  )
}
