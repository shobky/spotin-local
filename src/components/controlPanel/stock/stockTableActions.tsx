import { editProductsSlice } from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
import { stockItemsSlice } from "@/lib/redux/slices/stock/stockSlice";
import { deleteStockItemThunk } from "@/lib/redux/slices/stock/thunks/deleteStockItemThunk";
import { useDispatch } from "@/lib/redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

export default function StockTableActions({ row }: { row: any }) {
  const stockItem = row.original;
  const dispatch = useDispatch();

  const handleCopyProductId = () => {
    navigator.clipboard.writeText(stockItem.id || "");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(stockItem.id || "")}
        >
          Copy product ID
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            dispatch(
              editProductsSlice.actions.pickProductToChangeQty(row.original)
            )
          }
        >
          Change stock
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between"
          onClick={() =>
            dispatch(stockItemsSlice.actions.pickStockItemToEdit(stockItem))
          }
        >
          Edit <Edit size={15} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between focus:bg-red-400/10 text-destructive focus:text-destructive "
          onClick={() => dispatch(deleteStockItemThunk(stockItem))}
        >
          Delete <Trash2 size={15} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
