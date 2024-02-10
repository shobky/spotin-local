"use client";
import { fetchNotCompleteOrders } from "@/lib/redux/slices/orders/thunks/fetchNotCompleteOrders";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Suspense, useEffect } from "react";
import FilteredOrders from "../orders/filteredOrders";
import { selectOrdersStatus } from "@/lib/redux/slices/orders/ordersSelector";
import { OrderT } from "@/types";
import OrdersSkeleton from "../skeletons/ordersSkeleton";


export default function OrdersContainer({ orders }: { orders: OrderT[] }) {
  const ordersStatus = useSelector(selectOrdersStatus);
  const dispatch = useDispatch();
   
  useEffect(() => {
    async function dispatchOrders() {
      if (ordersStatus === "idle") {
        await dispatch(fetchNotCompleteOrders());
      }
    }
    dispatchOrders();
  }, [ordersStatus, dispatch]);

  return (
    <Suspense fallback={<OrdersSkeleton />}>
      <FilteredOrders orders={orders} />
    </Suspense>
  );
}
