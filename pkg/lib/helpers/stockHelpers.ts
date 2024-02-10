import { ProductT } from "@/types";
import { StockItem } from "@/types/stock";
import { stockItemsSlice } from "../redux/slices/stock/stockSlice";

type checkProductStockReturnType = {
  success: boolean;
  msg: string | null;
};

export function checkProductStock(
  product: ProductT,
  stockItems?: StockItem[]
): checkProductStockReturnType {
  if (!product.ingredients) {
    return {
      success: false,
      msg: `Item doen't have a stock entery, add it in stock please.`,
    };
  }
  for (const ingredient of product.ingredients) {
    const item = stockItems?.find((i) => i.id === ingredient.item.id);

    if (!item) {
      return {
        success: false,
        msg: "Something went wrong, Ingredient wasn't found in stock!",
      };
    }

    const remainingAmount = Number(item.amount) - Number(ingredient.measure);
    const productPerRemaining = remainingAmount / ingredient.measure;

    if (remainingAmount > 0 && productPerRemaining <= 5) {
      return {
        success: true,
        msg: `Only ${productPerRemaining} in stock. Don't forget to restock!`,
      };
    }

    if (
      Number(item.amount) === Number(ingredient.measure) ||
      (remainingAmount > 0 && ingredient.measure > remainingAmount)
    ) {
      return {
        success: true,
        msg: `This is the last ${product.name}, No more ${item.name} in stock`,
      };
    }

    if (item.amount < ingredient.measure) {
      return {
        success: false,
        msg: `${item.name} is out of stock. You only have ${item.amount} ${item.unit} left.`,
      };
    }
  }

  return { success: true, msg: null };
}

export function updateItemStockAfterCart(
  product: ProductT,
  stockItems: StockItem[],
  dispatch: (args: any) => void,
  action: "increase" | "decrease" | "remove",
  qty?: number
) {
  for (const ingredient of product.ingredients) {
    const idx = stockItems.findIndex((i) => i.id === ingredient.item.id);
    const item = stockItems[idx];
    if (action === "increase") {
      const newStockAmount = Number(item.amount) - Number(ingredient.measure);
      dispatch(
        stockItemsSlice.actions.updateItemStockAfterCart({
          idx,
          newStockAmount,
        })
      );
    } else if (action === "decrease") {
      const newStockAmount = Number(ingredient.measure) + Number(item.amount);
      dispatch(
        stockItemsSlice.actions.updateItemStockAfterCart({
          idx,
          newStockAmount,
        })
      );
    } else {
      const newStockAmount =
        Number(ingredient.measure) * Number(qty) + Number(item.amount);
      dispatch(
        stockItemsSlice.actions.updateItemStockAfterCart({
          idx,
          newStockAmount,
        })
      );
    }
  }
}
