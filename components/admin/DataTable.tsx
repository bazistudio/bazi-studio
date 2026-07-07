"use client"

import { ReactNode } from "react"

interface Column<T> {
  header: string
  accessor: keyof T
  cell?: (item: T) => ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  emptyState?: ReactNode
}

export default function DataTable<T>({ data, columns, onRowClick, emptyState }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border glass-panel">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 font-medium border-b border-border">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-muted-foreground">
                  {emptyState || "No records found."}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  onClick={() => onRowClick?.(row)}
                  className={`bg-card/50 hover:bg-muted/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-foreground">
                      {col.cell ? col.cell(row) : (row[col.accessor] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
