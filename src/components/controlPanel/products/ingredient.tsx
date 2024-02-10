import React from "react";

import { IngredientT } from "@/types";
import { StockItem } from "@/types/stock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2, X } from "lucide-react";
import {
  editProductsSlice,
  selectProductToEditSlice,
} from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";

export default function Ingredient({
  ingredient,
  handleUnSelectItem,
}: {
  ingredient: IngredientT;
  handleUnSelectItem: (value: string) => void;
}) {
  const { product } = useSelector(selectProductToEditSlice);
  const dispatch = useDispatch();

  const handleMeasureChange = (e: any) => {
    dispatch(
      editProductsSlice.actions.editIngredientMeasure({
        id: String(ingredient.item.id),
        measure: e.target.value,
      })
    );
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`px-3 py-2 w-fit font-medium rounded-xl text-sm ${
            ingredient.measure === 0
              ? "bg-muted text-muted-foreground hover:bg-muted"
              : "bg-green-700/20 hover:bg-green-700/20 text-white"
          }`}
        >
          {ingredient.item.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className=" w-72 rounded-xl bg-secondary shadow-lg p-2 space-y-4"
      >
        <div className="flex justify-between items-center bg-muted p-4 rounded-xl ">
          <h4 className="font-medium leading-none">
            {ingredient.item.name.toUpperCase()}
          </h4>
          <button
            type="button"
            onClick={() => handleUnSelectItem(String(ingredient.item.id))}
            className=" bg-red-500 hover:bg-red-600 p-1 rounded-full "
          >
            <Trash2 size={14} />
          </button>
        </div>
        <div>
          <Input
            value={ingredient.measure && ingredient.measure}
            placeholder="Measure*"
            className="h-12 rounded-xl"
            onChange={(e) => handleMeasureChange(e)}
          />
          <p className="p-2 text-sm">
            This is how many{" "}
            <span className="font-medium text-primary">
              {ingredient.item.unit === "g"
                ? "grams"
                : ingredient.item.unit + "'s"}
            </span>{" "}
            of{" "}
            <span className="font-medium text-primary">
              {ingredient.item.name}
            </span>{" "}
            it takes to make one{" "}
            <span className="font-medium text-primary">{product?.name}</span>.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
