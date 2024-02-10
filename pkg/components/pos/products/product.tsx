"use client";
import Image from "next/image";
import React from "react";
import { ProductT } from "@/types";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { itemsSlice } from "@/lib/redux/slices/pos/cart/items/itemsSlice";
import { selectAllItemsinCart } from "@/lib/redux/slices/pos/cart/items/itemsSelector";
import CartQty from "./cartQty";
import { useToast } from "@/components/ui/use-toast";
import {
  checkProductStock,
  updateItemStockAfterCart,
} from "@/lib/helpers/stockHelpers";
import { selectStockItemsSlice } from "@/lib/redux/slices/stock/stockItemsSelectors";

export default function Product({ product }: { product: ProductT }) {
  const { stockItems } = useSelector(selectStockItemsSlice);
  const dispatch = useDispatch();
  const itemQty = useSelector(selectAllItemsinCart).find(
    (i) => i.item.id === product.id
  )?.qty;

  const { toast } = useToast();

  const manageAddToCartWithSideEffects = () => {
    // Add product to cart
    dispatch(itemsSlice.actions.addItemtoCart(product));

    // Update stock accordingly for each ingredient
    updateItemStockAfterCart(product, stockItems, dispatch, "increase");
  };

  const handleAaddProductToCart = () => {
    const { success, msg } = checkProductStock(product, stockItems);
    console.log(success, msg);
    if (success) {
      manageAddToCartWithSideEffects();
      if (msg) {
        toast({
          title: "Product in stock.",
          description: msg,
          duration: 4500,
          variant: "success",
        });
      }
    } else {
      toast({
        title: "Product out of stock.",
        description: msg,
        duration: 4500,
        variant: "destructive",
        action: (
          <Button
            className="bg-white hover:bg-white font-bold text-red-500"
            onClick={() => dispatch(itemsSlice.actions.addItemtoCart(product))}
          >
            +anyway
          </Button>
        ),
      });
    }
  };

  const handleDecreaseQty = (e: any) => {
    console.log(itemQty);
    e.preventDefault();
    if (itemQty && itemQty > 0) {
      // Decrease product qty from cart
      dispatch(itemsSlice.actions.decreaseQuantity(product));

      // Update stock accordingly for each ingredient
      updateItemStockAfterCart(product, stockItems, dispatch, "decrease");
    }
  };

  const handleRemoveFromCart = () => {
    // Remove product from cart
    dispatch(itemsSlice.actions.removeItemFromCart(product));

    // Update stock accordingly for each ingredient
    updateItemStockAfterCart(product, stockItems, dispatch, "remove", itemQty);
  };

  return (
    <div
      className={`
    relative aspect-square w-full h-full grid place-content-center rounded-xl ease-in-out duration-300 overflow-hidden text-white p-3 group`}
    >
      <CartQty
        qty={Number(itemQty)}
        handleRemoveFromCart={handleRemoveFromCart}
      />

      <Button
        onClick={handleAaddProductToCart}
        onContextMenu={(e) => handleDecreaseQty(e)}
        className={`w-full h-full absolute top-0 left-0 
        ${
          Number(itemQty) > 0
            ? "bg-green-500 hover:bg-green-600"
            : "bg-primary hover:bg-orange-500"
        }
  `}
      >
        <span className="bg-black/10 w-full absolute h-full top-0 left-0 "></span>
        <Image
          src={
            typeof product.picture === "string"
              ? product.picture
              : URL.createObjectURL(product.picture)
          }
          alt={product.name}
          width={200}
          height={200}
          priority
          className="absolute object-contain  aspect-square  group-hover:scale-[1.7] ease  duration-300  left-0 top-0"
        />
        <p
          style={{ textShadow: " 2px 2px rgba(0, 0, 0, 0.775)" }}
          className="text-base text-center font-medium items-center relative break-words whitespace-pre-wrap"
        >
          {product.name.toLocaleUpperCase()}
        </p>
      </Button>
    </div>
  );
}
