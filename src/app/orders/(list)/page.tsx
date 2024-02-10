"use client";
import OrdersContainer from "@/components/container/ordersContainer";
import { selectAllNonCompleteOrders } from "@/lib/redux/slices/orders/ordersSelector";
import { useSelector } from "@/lib/redux/store";
import React, { Suspense } from "react";

export default function Orders() {
  const orders = useSelector(selectAllNonCompleteOrders)
  return <OrdersContainer orders={orders} />;
}
    