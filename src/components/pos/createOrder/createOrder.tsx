"use client";
import React from "react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectCustomerSlice } from "@/lib/redux/slices/pos/cart/customer/customerSelectors";
import { selectProductsCart } from "@/lib/redux/slices/pos/cart/items/itemsSelector";
import { selectTicketsCart } from "@/lib/redux/slices/pos/cart/tickets/ticketsSelector";
import { OrderT, OrderTypeT, StateStatus } from "@/types";
import { createNewOrderThunk } from "@/lib/redux/slices/orders/thunks/createNewOrderThunk";
import {
  selectCreatingOrderStatus,
  selectOrderToAppednTo,
} from "@/lib/redux/slices/orders/ordersSelector";
import { appendToOrderThunk } from "@/lib/redux/slices/orders/thunks/appendToOrderThunk";
import {
  handleAppendingMoretickets,
  mergeOrderItemsWithCartItems,
} from "@/lib/helpers/posHelpers";
import { handleResetPos } from "@/lib/helpers/posHelpers";
import { AppendAction } from "./actions/appendAction";
import { PutAction } from "./actions/putAction";
import { TakeawayAction } from "./actions/takeawayAction";
import CustomerForOrder from "./customers";
import { useToast } from "@/components/ui/use-toast";

export default function CreateOrder() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const orderToAppednTo = useSelector(selectOrderToAppednTo);

  const creatingOrderStatus = useSelector(selectCreatingOrderStatus);
  const isLoading = creatingOrderStatus === "loading";

  const { items, itemsSubTotal } = useSelector(selectProductsCart);
  const { tickets, ticketsSubTotal, qty } = useSelector(selectTicketsCart);

  const { customerName } = useSelector(selectCustomerSlice);

  const newOrdersubTotal = itemsSubTotal + ticketsSubTotal;
  const orderToAppendToSubTotal = orderToAppednTo
    ? newOrdersubTotal +
      orderToAppednTo?.cart.total +
      orderToAppednTo?.tickets.total
    : 0;

  const createNewOrder = async (type: OrderTypeT) => {
    const newOrderCustomer = {
      name:
        customerName && customerName.length > 0
          ? type === "pickup"
            ? `_${customerName}`
            : customerName
          : "_Takeaway",
      id: new Date().toLocaleDateString(),
    };

    const newOrder: OrderT = {
      createdAt: new Date(),
      customer: newOrderCustomer,
      cart: {
        items: items,
        total: itemsSubTotal,
      },
      tickets: {
        tickets: tickets,
        total: ticketsSubTotal,
        totalQty: qty,
      },
      type,
      isTakeaway: type === "pickup" ? true : false,
      subtotal: newOrdersubTotal,
      note: "",
    };

    await dispatch(createNewOrderThunk(newOrder));
  };

  const appendToExistingOrder = async (type: OrderTypeT) => {
    if (!orderToAppednTo) return;
    const newItems = mergeOrderItemsWithCartItems(
      items,
      orderToAppednTo.cart.items
    );
    const newTickets = handleAppendingMoretickets(
      tickets,
      orderToAppednTo.tickets
    );

    const newOrderToAppendTo: OrderT = {
      ...orderToAppednTo,
      cart: {
        items: newItems,
        total: itemsSubTotal + orderToAppednTo.cart.total,
      },
      tickets: {
        tickets: newTickets,
        total: ticketsSubTotal + orderToAppednTo.tickets.total,
        totalQty: qty + orderToAppednTo.tickets.totalQty,
      },
      subtotal: orderToAppendToSubTotal,
    };

    await dispatch(appendToOrderThunk(newOrderToAppendTo));
  };

  const handlePosOrders = async (type: OrderTypeT) => {
    if (creatingOrderStatus === "loading") return;
    try {
      if (!orderToAppednTo) {
        if (newOrdersubTotal === 0) return;
        await createNewOrder(type);
        toast({
          variant: "success",
          title: "Order created",
          duration: 750
        });
      } else {
        if (orderToAppendToSubTotal - newOrdersubTotal === 0) return;
        await appendToExistingOrder(type);
      }
    } catch (err) {
      console.log(err);
    } finally {
      handleResetPos(dispatch);
    }
  };

  return (
    <div className="w-full">
      {orderToAppednTo ? (
        <AppendAction
          orderToAppednTo={orderToAppednTo}
          handlePosOrders={handlePosOrders}
          isLoading={isLoading}
        />
      ) : customerName ? (
        <PutAction handlePosOrders={handlePosOrders} isLoading={isLoading} />
      ) : (
        <CustomerForOrder>
          <TakeawayAction
            handlePosOrders={handlePosOrders}
            isLoading={isLoading}
          />
        </CustomerForOrder>
      )}
    </div>
  );
}
