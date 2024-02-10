"use client";
import Cart from "@/components/pos/cart/cartMenu";
import CreateOrder from "@/components/pos/createOrder/createOrder";
import TicketsMenu from "@/components/pos/tickets";
import { selectOrderToAppednTo } from "@/lib/redux/slices/orders/ordersSelector";
import { ordersSlcie } from "@/lib/redux/slices/orders/ordersSlice";
import { fetchOrderById } from "@/lib/redux/slices/orders/thunks/fetchOrderByIdThunk";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PosActionsData() {
  const order = useSelector(selectOrderToAppednTo);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const orderId = searchParams.get("order");

  useEffect(() => {
    if (orderId && !order) {
      dispatch(fetchOrderById(orderId));
    }

    dispatch(ordersSlcie.actions.selectOrderToAppednTo(order));
  }, [orderId, order, dispatch]);

  return (
    <div className="flex sm:flex-col gap-2 items-start w-full">
      <div className="sm:grid grid-cols-2 w-full gap-2">
        <TicketsMenu />
        <Cart />
      </div>
      {/* contains the input to select a customer along side creating order buttons */}
      <CreateOrder />
    </div>
  );
}
