"use client";

import {
  calculateOrdersSales,
  calculateUniqueCustomers,
} from "@/lib/analytics/ordersAnalytics";
import {
  selectAllNonCompleteOrders,
  selectOrdersStatus,
} from "@/lib/redux/slices/orders/ordersSelector";
import { fetchNotCompleteOrders } from "@/lib/redux/slices/orders/thunks/fetchNotCompleteOrders";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { useEffect } from "react";
import { OrderT } from "@/types";
import OrderStats from "../dashboard/orderStats";
import ChartContainer from "../dashboard/dailyReport/chartContainer";

export default function DailyReportContainer({
  isToday,
  archivedOrders,
}: {
  isToday: boolean;
  archivedOrders: OrderT[];
}) {
  const unArchivedOrders = useSelector(selectAllNonCompleteOrders);
  const selectedDayOrders = isToday
    ? [...unArchivedOrders, ...archivedOrders]
    : archivedOrders;
  const ordersStatus = useSelector(selectOrdersStatus);
  const dispatch = useDispatch();

  const { totalRevenue, sales, totalCheckinIncome, totalItemsIncome } =
    calculateOrdersSales(selectedDayOrders);
  const { totalCheckins } = calculateUniqueCustomers(selectedDayOrders);

  useEffect(() => {
    if (ordersStatus === "idle") dispatch(fetchNotCompleteOrders());
  });

  if (selectedDayOrders.length < 1) {
    return (
      <p className="font-medium text-center relative top-60">
        {" "}
        No orders found for the selected day.
      </p>
    );
  }
  return (
    <div className="w-full ">
      <OrderStats
        totalCheckins={totalCheckins}
        totalRevenue={totalRevenue}
        totalCheckinIncome={totalCheckinIncome}
        totalItemsIncome={totalItemsIncome}
        orders={selectedDayOrders}
        sales={sales}
      />
      <ChartContainer orders={selectedDayOrders} />
    </div>
  );
}
