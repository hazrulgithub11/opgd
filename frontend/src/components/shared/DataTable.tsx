import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  showArrow?: boolean;
  emptyMessage?: string;
  totalRecords?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
}

export default function DataTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  showArrow = true,
  emptyMessage = "No records found.",
  totalRecords,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  pageSize = 100,
}: DataTableProps<T>) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalRecords ?? data.length);
  const total = totalRecords ?? data.length;

  return (
    <div>
      {/* Record count */}
      {total > 0 && (
        <p className="text-xs text-gray-500 mb-2">
          {start} - {end} of {total} records
        </p>
      )}

      <div className="overflow-x-auto touch-pan-x overscroll-x-contain rounded border border-gray-200 bg-white">
        <table className="min-w-max w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-3 py-2.5 text-left font-semibold text-cyan-600 whitespace-nowrap",
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
              {showArrow && <th className="w-6" />}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showArrow ? 1 : 0)}
                  className="text-center py-12 text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={rowKey(row)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "border-b border-gray-100 last:border-0 transition-colors",
                    onRowClick && "cursor-pointer hover:bg-cyan-50/50"
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn("whitespace-nowrap px-3 py-2 text-gray-700", col.className)}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? "")}
                    </td>
                  ))}
                  {showArrow && (
                    <td className="pr-2 text-gray-300">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-1 mt-2">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={cn(
                  "w-6 h-6 rounded text-xs font-medium transition-colors",
                  page === currentPage
                    ? "bg-cyan-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
