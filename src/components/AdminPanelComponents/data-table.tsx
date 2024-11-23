"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Paginator from "../Paginator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  records?: {
    totalPages: number;
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
  };
  handleFilter?: (pageNumber: number, pageSize: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data = [], // Provide default empty array
  pageSize = 10,
  records,
  handleFilter,
}: DataTableProps<TData, TValue>) {
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];

  const table = useReactTable({
    data: safeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
  });

  // Safely get rows with null checks
  const rows = table.getRowModel()?.rows;
  const hasRows = rows && rows.length > 0;

  return (
    <div className="w-full">
      <div
        className="rounded-md border"
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Table>
          <TableHeader className="bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-white" key={header.id}>
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
          <TableBody>
            {hasRows ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
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
                  colSpan={columns.length}
                  className="h-24 text-center text-red-600"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {records && handleFilter && (
        <div className="flex w-full justify-end py-4">
          <Paginator
            totalPages={records.totalPages}
            totalRecords={records.totalRecords}
            pageNumber={records.pageNumber}
            pageSize={records.pageSize}
            changePage={handleFilter}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;