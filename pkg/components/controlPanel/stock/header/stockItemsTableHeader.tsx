import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { Table } from "@tanstack/react-table";
import AddNewStockItem from "./addNewStockItem";
import { StockItem } from "@/types/stock";
export default function StockItemsTableHeader({
  table,
}: {
  table: Table<StockItem>;
}) {
  return (
    <div className="flex gap-2 w-full justify-end items-start pt-4 pb-4">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="z-10">
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AddNewStockItem />
    </div>
  );
}
