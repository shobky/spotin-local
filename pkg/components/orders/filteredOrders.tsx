"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import OrderCard from "./orderCard";
import { OrderT, SortinRules } from "@/types";
import { useSelector } from "@/lib/redux/store";
import { selectOrdersStatus } from "@/lib/redux/slices/orders/ordersSelector";
import OrdersSkeleton from "../skeletons/ordersSkeleton";

export default function FilteredOrders({
  orders,
  serverParent,
}: {
  orders: OrderT[];
  serverParent?: boolean;
}) {
  const searchParams = useSearchParams();
  const ordersStatus = useSelector(selectOrdersStatus);

  const searchQuery = searchParams.get("q") || "";
  const selectedType = searchParams.get("type");
  const sortinRulesString = searchParams.get("sortingRules");

  if ((ordersStatus === "idle" || ordersStatus === "loading") && !serverParent)
    return <OrdersSkeleton />;

  if (ordersStatus === "failed")
    return <p>something went wrong, Try to refresh.</p>;

  if (orders.length === 0 || !orders)
    return (
      <p className="text-center font-bold text-xl relative top-[35vh]">
        No orders yet.
      </p>
    );

  const filteredOrders = orders.filter((o) => {
    if (o.type === selectedType || selectedType === "all") {
      if (o.customer.name?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return o;
      }
    }
  });
  const sortinRules: SortinRules = JSON.parse(String(sortinRulesString));

  if (sortinRules?.Alphapitical) {
    if (sortinRules?.Alphapitical === "asc") {
      filteredOrders.sort(
        (a, b) => b.customer.name?.localeCompare(String(a.customer.name)) || 1
      );
    } else {
      filteredOrders.sort(
        (a, b) => a.customer.name?.localeCompare(String(b.customer.name)) || -1
      );
    }
  } else if (sortinRules?.Time) {
    if (sortinRules?.Time === "asc") {
      filteredOrders.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    } else {
      filteredOrders.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    }
  } else {
    if (sortinRules?.Subtotal === "asc") {
      filteredOrders.sort((a, b) => b.subtotal - a.subtotal);
    } else {
      filteredOrders.sort((a, b) => a.subtotal - b.subtotal);
    }
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(17%,1fr))] gap-2">
      {filteredOrders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}
