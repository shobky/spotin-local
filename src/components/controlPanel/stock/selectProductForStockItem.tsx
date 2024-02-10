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
import { selectAllProducts } from "@/lib/redux/slices/pos/products/productsSelectors";
import { X } from "lucide-react";
import { selectStockItemToEdit } from "@/lib/redux/slices/stock/stockItemsSelectors";
import { stockItemsSlice } from "@/lib/redux/slices/stock/stockSlice";

export default function SelectProductForStockItem() {
  const { products } = useSelector(selectAllProducts);
  const stockItemToEdit = useSelector(selectStockItemToEdit);
  const usedInProducts = stockItemToEdit?.usedIn || [];

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleUnSelectItem = (value: string) => {
    dispatch(stockItemsSlice.actions.removeStockItemUsedInProduct(value));
  };

  const handleSelect = (currentValue: string) => {
    if (usedInProducts.includes(currentValue)) {
      handleUnSelectItem(currentValue);
    } else {
      dispatch(stockItemsSlice.actions.addStockItemUsedInProduct(currentValue));
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="border border-input rounded-lg p-2 flex flex-col gap-2  ease-in-out duration-75">
        {usedInProducts.length > 0 ? (
          <div className="flex flex-wrap gap-2 ">
            {usedInProducts.map((value) => (
              <p
                className=" bg-muted flex items-center gap-1 text-muted-foreground px-2 py-1 w-fit font-medium rounded-md text-xs"
                key={value}
              >
                {products.find((p) => p.id === value)?.name}{" "}
                <button
                  type="button"
                  onClick={() => handleUnSelectItem(value)}
                  className=" relative z-20 bg-black rounded-full p-[1px]"
                >
                  <X size={10} />
                </button>
              </p>
            ))}
          </div>
        ) : (
          <p className=" bg-muted text-muted-foreground px-2 py-1 w-fit  font-medium rounded-md text-xs">
            none
          </p>
        )}
        <PopoverTrigger asChild>
          <button
            aria-expanded={open}
            className=" bg-muted hover:bg-opacity-10 flex justify-between px-2 py-1 font-medium rounded-md text-sm w-[12rem] "
          >
            Select products
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent align="start" className="h-56 p-0 w-[12rem] ">
        <Command>
          <CommandInput
            placeholder={`Search ${products.length} products...`}
            className="h-9"
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup className="overflow-y-auto pretty-scrollbar  w-full ">
            {products.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => handleSelect(product.id)}
              >
                {product.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    usedInProducts.includes(product.id)
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
