import OrdersContainer from "@/components/container/ordersContainer";
import FilteredOrders from "@/components/orders/filteredOrders";
import OrdersSorter from "@/components/orders/header/ordersSorter";
import OrderCard from "@/components/orders/orderCard";
import { CalendarDateRangePicker } from "@/components/shared/datePickers/date-range-picker";
import { getArchivedOrdersInRange } from "@/lib/services/archiveService";
import { subDays } from "date-fns";
import React from "react";

async function ArcivedOrdersList({ range }: { range: any }) {
  const defaultRange = {
    from: subDays(new Date(), 30),
    to: new Date(),
  };
  const orders = await getArchivedOrdersInRange(range ?? defaultRange);

  return (
    <div className="w-full">
      <OrdersContainer orders={orders} />
    </div>
  );
}
export default async function Archive(params: any) {
  const range =
    params?.searchParams?.range && JSON.parse(params.searchParams.range);
  console.log(range);

  return (
    <>
      <div className="flex justify-between  items-end gap-2 ">
        <div className="relative -top-1">
          <CalendarDateRangePicker />
        </div>
        <OrdersSorter />
      </div>
      <ArcivedOrdersList range={range} />
    </>
  );
}
