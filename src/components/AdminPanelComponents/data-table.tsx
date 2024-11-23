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
  data: TData[] | [];
  pageSize?: number;
  records?: any;
  handleFilter?: (pageNumber: number, pageSize: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  records,
  handleFilter,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize ? pageSize : 100, // Set page size
        pageIndex: 0, // Ensure pagination starts from the first page
      },
    },
  });

  return (
    <div>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
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
      <div className="flex w-full justify-end py-4">
        {records ? <Paginator
          totalPages={records?.totalPages}
          totalRecords={records?.totalRecords}
          pageNumber={records?.pageNumber}
          pageSize={records?.pageSize}
          changePage={(pageNumber, pageSize) => {
            handleFilter?.(pageNumber, pageSize);
          }}
        /> : ""}
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { Button } from "@/components/ui/button";
// import Paginator from "../Paginator";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[] | [];
//   pageSize?: number;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   pageSize = 10,
// }: DataTableProps<TData, TValue>) {
//   const [pageIndex, setPageIndex] = useState(0); // Tracks current page
//   const [pageSizeState, setPageSize] = useState(pageSize); // Tracks page size

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: {
//       pagination: {
//         pageSize: pageSizeState, // Set page size
//         pageIndex, // Start from the current page
//       },
//     },
//     state: {
//       pagination: {
//         pageSize: pageSizeState,
//         pageIndex,
//       },
//     },
//     onPaginationChange: (newPagination:any) => {
//       setPageIndex(newPagination.pageIndex);
//       setPageSize(newPagination.pageSize);
//     },
//   });

//   // Handle page change via custom paginator
//   const changePage = (pageNumber: number, pageSize: number) => {
//     setPageIndex(pageNumber - 1); // Adjust pageIndex to be 0-based
//     setPageSize(pageSize); // Update page size
//   };

//   return (
//     <div>
//       <div
//         className="rounded-md border"
//         style={{
//           maxHeight: "535px",
//           overflowY: "auto",
//           overflowX: "hidden",
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//         }}
//       >
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center text-red-600"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Custom paginator */}
//       <Paginator
//         totalPages={table.getPageCount()}
//         totalRecords={data.length}
//         pageNumber={pageIndex + 1}
//         pageSize={pageSizeState}
//         changePage={changePage}
//       />
//     </div>
//   );
// }
