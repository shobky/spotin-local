"use client";
import React, { useState } from "react";
import { ShoppingBasket, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectProductsCart } from "@/lib/redux/slices/pos/cart/items/itemsSelector";
import { itemsSlice } from "@/lib/redux/slices/pos/cart/items/itemsSlice";
import ClearCartBtn from "@/components/shared/buttons/clearCart";
import { selectOrderToAppednTo } from "@/lib/redux/slices/orders/ordersSelector";
import { selectStockItemsSlice } from "@/lib/redux/slices/stock/stockItemsSelectors";
import { CartItemT, ProductT } from "@/types";
import { updateItemStockAfterCart } from "@/lib/helpers/stockHelpers";

export default function Cart() {
  const { itemsSubTotal, items } = useSelector(selectProductsCart);
  const { stockItems } = useSelector(selectStockItemsSlice);
  const orderToAppednTo = useSelector(selectOrderToAppednTo);
  const cartEmpty = items.length === 0;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item: CartItemT) => {
    // Remove product from cart
    dispatch(itemsSlice.actions.removeItemFromCart(item.item));

    // Update stock accordingly for each ingredient
    updateItemStockAfterCart(
      item.item,
      stockItems,
      dispatch,
      "remove",
      item.qty
    );
  };

  return (
    <DropdownMenu open={open} modal={false}>
      <DropdownMenuTrigger
        onClick={() => setOpen(!open)}
        asChild
        className="h-12 w-full"
      >
        <Button
          className={`${
            !cartEmpty &&
            !open &&
            "bg-green-600 hover:bg-green-700 text-white hover:text-white"
          } flex gap-2 items-center w-full`}
          variant={open ? "default" : "outline"}
        >
          <ShoppingBasket width={22} />
          <span className="text-[1rem] relative top-[1.2px]">
            {" "}
            £{itemsSubTotal}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onMouseLeave={() => setOpen(false)}
        sticky={"always"}
        className="w-56  "
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal  flex items-center justify-between">
          Subtotal: {itemsSubTotal} LE
          <ClearCartBtn />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="drop-down-menu-group overflow-y-auto max-h-[60vh] drop-down-menu-content">
          {cartEmpty && (
            <DropdownMenuItem disabled>Cart Is Empty.</DropdownMenuItem>
          )}
          {items.map((item) => {
            const totalPriceOfProduct = item.qty * item.item.price;
            return (
              <DropdownMenuItem
                inset
                className="flex justify-between"
                key={item.item.id}
              >
                <div>
                  <div>
                    <span className=" text-xs relative top-[1px]">x</span>
                    {item.qty} {item.item?.name}
                  </div>
                  <p className="text-xs opacity-60">
                    {totalPriceOfProduct &&
                      totalPriceOfProduct > 0 &&
                      totalPriceOfProduct}{" "}
                    LE
                  </p>
                </div>
                <Button
                  className="rounded-full scale-[.6]"
                  variant={"destructive"}
                  size={"icon"}
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <X />
                </Button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        {/* cart items from order if appending to an existing order */}
        {orderToAppednTo && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>{`Order's items`}</DropdownMenuItem>
            <DropdownMenuGroup className="drop-down-menu-group overflow-y-auto max-h-[60vh] drop-down-menu-content">
              {orderToAppednTo.cart.items.map((item) => {
                const totalPriceOfProduct = item.qty * item.item.price;
                return (
                  <DropdownMenuItem
                    disabled
                    inset
                    className="flex justify-between"
                    key={item.item.id}
                  >
                    <div>
                      <div>
                        <span className=" text-xs relative top-[1px]">x</span>
                        {item.qty} {item.item?.name}
                      </div>
                      <p className="text-xs opacity-60">
                        {totalPriceOfProduct &&
                          totalPriceOfProduct > 0 &&
                          totalPriceOfProduct}{" "}
                        LE
                      </p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
