"use client";
import { Button } from "@/components/ui/button";
import {
  calculateOrderSubTotal,
  checkoutActiveTickets,
} from "@/lib/helpers/ticketHelpters";
import { updateOrderTypeThunk } from "@/lib/redux/slices/orders/thunks/updateOrderType";
import { useDispatch } from "@/lib/redux/store";
import { OrderTypeT, OrderT } from "@/types";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function OrderCardAction({
  order,
  view,
}: {
  order: OrderT;
  view?: "big" | "normal";
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const styles = view === "big" ? `px-8 h-full py-6 rounded-lg text-xl` : "";
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = order.status === "loading";

  const newOrderType = {
    complete: "archive",
    preparing: "new",
    new: "complete",
    pickup: "complete",
    archive: "archive",
    canceled: "canceled",
  };

  const handleUpdateOrderState = async () => {
    switch (newOrderType[order.type]) {
      case "archive":
        await dispatch(updateOrderTypeThunk({ order, newType: "archive" }));
        router.push(`/orders?${params.toString()}`);
        break;
      case "complete":
        const newTickets = checkoutActiveTickets(order.tickets);
        const finalSubTotal = calculateOrderSubTotal(order);
        const completedOrder: OrderT = {
          ...order,
          subtotal: finalSubTotal,
          tickets: newTickets,
        };
        await dispatch(
          updateOrderTypeThunk({
            order: completedOrder,
            newType: "complete",
          })
        );
        break;
      default:
        await dispatch(
          updateOrderTypeThunk({
            order,
            newType: newOrderType[order.type] as OrderTypeT,
          })
        );
    }
  };

  return (
    <>
      {order.type === "canceled" ? (
        <p className={`text-sm  ${styles} ${view === "big" ? "bg-red-500 text-white" : "text-red-500 "}`}>Canceled</p>
      ) : (
        <Button
          onClick={handleUpdateOrderState}
          className={`text-white bg-order-${order.type} hover:bg-order-${order.type}-hover  ${styles}`}
        >
          {loading && <Loader2 className=" animate-spin mr-2" />}
          {order.type === "complete"
            ? "Archive"
            : order.type === "preparing"
            ? "Put as new"
            : (order.type === "new" || order.type === "pickup") && "Checkout"}
        </Button>
      )}
    </>
  );
}
