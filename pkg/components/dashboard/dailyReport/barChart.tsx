"use client";
import React from "react";
import {
  calculateItemsSold,
} from "@/lib/analytics/ordersAnalytics";
import { OrderT } from "@/types";
import DataBarChart from "@/components/shared/charts/barChart";

export default function ReportBarChart({
  orders,
}: {
  orders: OrderT[];
}) {
  const orderItemsStatistics = calculateItemsSold(orders);
  return <DataBarChart data={orderItemsStatistics} />;
}
