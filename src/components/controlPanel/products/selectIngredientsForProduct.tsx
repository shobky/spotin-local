import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectStockItemsSlice } from "@/lib/redux/slices/stock/stockItemsSelectors";
import {
  editProductsSlice,
  selectProductToEditSlice,
} from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
import { StockItem } from "@/types/stock";
import Ingredient from "./ingredient";

export default function SelectedIngredientsForProduct() {
  const { stockItems } = useSelector(selectStockItemsSlice);
  const { product } = useSelector(selectProductToEditSlice);
  const selectedIngredients = product?.ingredients || [];
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleUnSelectItem = (value: string|undefined) => {
    dispatch(editProductsSlice.actions.removeIngredientItem(String(value)));
  };

  const handleSelect = (value: StockItem) => {
    const ingredientData = {
      name: value.name,
      id: value.id,
      unit: value.unit,
    };
    if (selectedIngredients.findIndex((i) => i.item.id === value.id) === -1) {
      dispatch(
        editProductsSlice.actions.addIngredientItem({
          item: ingredientData,
          measure: 0,
        })
      );
    } else {
      handleUnSelectItem(value.id);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="border border-input rounded-xl p-2 flex flex-col gap-2  ease-in-out duration-75">
        <div className="flex flex-wrap gap-2 ">
          {selectedIngredients.map((value) => (
            <Ingredient
              handleUnSelectItem={handleUnSelectItem}
              key={value.item.id}
              ingredient={value}
            />
          ))}
        </div>
        <PopoverTrigger asChild>
          <button
            aria-expanded={open}
            className=" bg-muted hover:bg-opacity-10 flex justify-between items-center px-3 py-2 font-medium rounded-xl text-sm w-[12rem] "
          >
            Select ingredients
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent align="start" className=" h-72 p-0 w-[12rem] ">
        <Command>
          <CommandInput
            placeholder={`Search ${stockItems.length} ingredients...`}
            className="h-9"
          />
          <CommandEmpty>No ingredients found.</CommandEmpty>
          <CommandGroup className="overflow-y-auto pretty-scrollbar  w-full ">
            {stockItems.map((option) => (
              <CommandItem
                key={option.id}
                value={option.name}
                onSelect={() => handleSelect(option)}
              >
                {option.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedIngredients.findIndex(
                      (i) => i.item.id === option.id
                    ) != -1
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
