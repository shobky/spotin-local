import DataLineChart from "@/components/shared/charts/lineChart";
import {
  generateChartData,
} from "@/lib/analytics/ordersAnalytics";
import { OrderT } from "@/types";
import React from "react";

export default function ReportLineChart({ orders }: { orders: OrderT[] }) {
  const data = generateChartData(orders);

  return <DataLineChart data={data} />;
}
