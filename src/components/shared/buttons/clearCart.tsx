"use client";
import { Button } from "@/components/ui/button";
import { selectAllItemsinCart } from "@/lib/redux/slices/pos/cart/items/itemsSelector";
import { itemsSlice } from "@/lib/redux/slices/pos/cart/items/itemsSlice";
import { useSelector } from "@/lib/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

export default function ClearCartBtn() {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItemsinCart);
  return (
    <>
      {items.length > 0 && (
        <Button
          size={"sm"}
          variant={"destructive"}
          className="text-sm"
          onClick={() => dispatch(itemsSlice.actions.clearCart())}
        >
          Clear
        </Button>
      )}
    </>
  );
}
