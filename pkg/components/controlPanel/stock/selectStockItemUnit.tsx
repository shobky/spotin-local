import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectStockItemToEdit } from "@/lib/redux/slices/stock/stockItemsSelectors";
import { stockItemsSlice } from "@/lib/redux/slices/stock/stockSlice";
import { StockItemKey } from "@/types/stock";

export function SelectStockItemUnit({
  handleEditproduct,
}: {
  handleEditproduct: (key: StockItemKey, newValue: any) => void;
}) {
  const stockItemToEdit = useSelector(selectStockItemToEdit);
  return (
    <Select
      value={stockItemToEdit?.unit}
      onValueChange={(v) => handleEditproduct("unit", v)}
    >
      <SelectTrigger className="w-full h-12 ">
        <SelectValue placeholder="Select unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="g">g</SelectItem>
          <SelectItem value="ml">ml</SelectItem>
          <SelectItem value="item">item</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
