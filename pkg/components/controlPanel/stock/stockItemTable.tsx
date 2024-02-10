"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector } from "@/lib/redux/store";
import { StockItemData } from "@/types/stock";
import StockItemsTableHeader from "./header/stockItemsTableHeader";
import { selectAllProducts } from "@/lib/redux/slices/pos/products/productsSelectors";
import { ProductT } from "@/types";
import { selectStockItemsSlice } from "@/lib/redux/slices/stock/stockItemsSelectors";
import { useSearchParams } from "next/navigation";
import StockTableActions from "./stockTableActions";

let productsData: ProductT[] = [];

export const columns: ColumnDef<StockItemData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="">{row.getValue("amount")} <span className=" opacity-80">{row.getValue("unit")}</span></div>
    ),
  },
  {
    accessorKey: "unit",
    header: "",
    cell: ({ row }) => (
      <></>
    ),
  },
  {
    accessorKey: "usedIn",
    header: "Used in",
    cell: ({ row }) => (
      <div className="capitalize flex flex-wrap gap-1 ">
        {row.original.usedIn?.map((productId: string, i) => {
          const product = productsData.filter((p) => p.id === productId)[0];
          return (
            <p
              className=" bg-muted text-muted-foreground  p-1 text-xs rounded-lg w-fit"
              key={i}
            >
              {product?.name || ""}
            </p>
          );
        })}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: StockTableActions,
  },
];

export function StockItemsTable({
  stockItemsData,
}: {
  stockItemsData: StockItemData[];
}) {
  const searchQuery = useSearchParams().get("q");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { stockItemsStatus } = useSelector(selectStockItemsSlice);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState(9); // Set your desired page size to 9
  const [pageIndex, setPageIndex] = React.useState(0);
  const { products } = useSelector(selectAllProducts);
  productsData = products;

  const table = useReactTable({
    data: stockItemsData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <div className="w-full">
      <StockItemsTableHeader table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.filter((r) => {
                  if (
                    searchQuery === null ||
                    r.original.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  ) {
                    return r;
                  }
                })
                .map((row) => (
                  <TableRow
                    className="hover:bg-secondary"
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
                  className="h-24 text-center"
                >
                  {stockItemsStatus === "idle" ||
                  stockItemsStatus === "loading" ? (
                    <p className="flex justify-center w-full items-center gap-2">
                      <Loader2 className=" animate-spin" size={17} />
                      Loading
                    </p>
                  ) : (
                    `No results.`
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPageIndex(table.getState().pagination.pageIndex - 1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPageIndex(table.getState().pagination.pageIndex + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
