"use client";
import { Input } from "@/components/ui/input";
import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { selectStockItemsSlice } from "@/lib/redux/slices/stock/stockItemsSelectors";
import { StockItemKey } from "@/types/stock";
import { stockItemsSlice } from "@/lib/redux/slices/stock/stockSlice";
import { addNewStockItemThunk } from "@/lib/redux/slices/stock/thunks/addNewStockItemThunk";
import { updateStockItemThunk } from "@/lib/redux/slices/stock/thunks/updateStockItemThunk";
import { SelectStockItemUnit } from "./selectStockItemUnit";
import SelectProductForStockItem from "./selectProductForStockItem";

export default function EditingStockItemForm({ id }: { id?: string }) {
  const { stockItemsError, stockItemsStatus, stockItemToEdit } = useSelector(
    selectStockItemsSlice
  );
  const dispatch = useDispatch();

  if ((!stockItemToEdit && id !== "new") || stockItemsError)
    return <p> something went wrong, try again.</p>;

  const handleEditproduct = (key: StockItemKey, newValue: any) => {
    dispatch(
      stockItemsSlice.actions.editStockItem({
        key,
        newValue,
      })
    );
  };
  const handleSubmitStockItem = async (e: FormEvent) => {
    e.preventDefault();
    if (stockItemsStatus === "loading") return;
    if (!stockItemToEdit) return;
    if (stockItemToEdit.id) {
      await dispatch(updateStockItemThunk(stockItemToEdit));
    } else {
      await dispatch(addNewStockItemThunk(stockItemToEdit));
    }
  };

  return (
    <form
      onSubmit={handleSubmitStockItem}
      className="group bg-secondary p-8 rounded-xl space-y-4 w-[22rem]"
    >
      <section className="space-y-2">
        <Input
          onChange={(e) => handleEditproduct("name", e.target.value)}
          className="h-12"
          placeholder="Name*"
          value={stockItemToEdit?.name}
        />
        <div className="gap-2 grid grid-cols-2">
          <Input
            onChange={(e) =>
              handleEditproduct("amount", Number(e.target.value))
            }
            value={stockItemToEdit?.amount}
            className="h-12"
            placeholder="Amount*"
            type="number"
          />

          <SelectStockItemUnit handleEditproduct={handleEditproduct} />
        </div>
        <SelectProductForStockItem />
      </section>
      <Button
        type="submit"
        disabled={stockItemsStatus === "loading"}
        className="w-full h-12"
      >
        {stockItemsStatus === "loading" && (
          <Loader2 className=" animate-spin" />
        )}
        Apply changes
      </Button>
    </form>
  );
}
