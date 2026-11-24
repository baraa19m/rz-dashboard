import { useState, type ReactNode } from 'react'
import {
  flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
  type ColumnDef, type SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from './Card'
import { EmptyState, ErrorState, LoadingState } from './states'

export type Row = Record<string, unknown>

/** Build column definitions from header names only. Swap for real accessorKeys when data arrives. */
export const makeColumns = (headers: string[]): ColumnDef<Row>[] =>
  headers.map((h) => ({
    id: h,
    header: h,
    accessorFn: (r) => r[h],
    cell: (c) => (c.getValue() as ReactNode) ?? '—',
  }))

type Props<T> = {
  columns: ColumnDef<T>[]
  data?: T[]
  status?: 'ready' | 'loading' | 'error'
  emptyTitle?: string
  emptyHint?: string
  pageSize?: number
  onRowClick?: (row: T) => void
  onRetry?: () => void
}

export function DataTable<T>({
  columns, data = [], status = 'ready', emptyTitle, emptyHint, pageSize = 10, onRowClick, onRetry,
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data, columns, state: { sorting }, onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })
  const total = data.length

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-800">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="whitespace-nowrap px-4 py-3 font-semibold">
                    <button className="inline-flex items-center gap-1.5" onClick={h.column.getToggleSortingHandler()}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      <ArrowUpDown size={12} className="opacity-50" />
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {status === 'ready' && table.getRowModel().rows.map((r) => (
              <tr key={r.id} onClick={() => onRowClick?.(r.original)}
                className={`border-t border-surface-border ${onRowClick ? 'cursor-pointer hover:bg-brand-50/60' : ''}`}>
                {r.getVisibleCells().map((c) => (
                  <td key={c.id} className="px-4 py-3">{flexRender(c.column.columnDef.cell, c.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {status === 'loading' && <LoadingState label="Loading table…" />}
      {status === 'error' && <ErrorState message="Failed to load table data." onRetry={onRetry} />}
      {status === 'ready' && total === 0 && <EmptyState title={emptyTitle} hint={emptyHint} />}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-border px-4 py-3 text-xs text-slate-500">
        <span>{total} results</span>
        <div className="flex items-center gap-3">
          <select className="input h-8 px-3 text-xs" value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}>
            {[10, 25, 50].map((n) => <option key={n} value={n}>{n} / page</option>)}
          </select>
          <button className="rounded-full border border-surface-border p-1.5 disabled:opacity-40"
            disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}><ChevronLeft size={14} /></button>
          <span>Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}</span>
          <button className="rounded-full border border-surface-border p-1.5 disabled:opacity-40"
            disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}><ChevronRight size={14} /></button>
        </div>
      </div>
    </Card>
  )
}
