import React, { useState } from "react";
import { OrderT } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReportBarChart from "./barChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportLineChart from "./lineChart";
export default function ChartContainer({ orders }: { orders: OrderT[] }) {
  const [chartType, setChartType] = useState("items");
  const handleChangeChartType = (type: string) => {
    setChartType(type);
  };
  return (
    <Card className="col-span-4 my-4 w-full  ">
      <CardHeader className=" flex-row flex justify-between items-center">
        <CardTitle>Overview</CardTitle>
        <SelectChartData
          handleChangeChartType={handleChangeChartType}
          chartType={chartType}
        />
      </CardHeader>
      <CardContent className="pl-2 overflow-x-auto pretty-scrollbar">
        {chartType === "items" ? (
          <ReportBarChart orders={orders} />
        ) : (
          <ReportLineChart orders={orders}  />
        )}
      </CardContent>
    </Card>
  );
}

export function SelectChartData({
  handleChangeChartType,
  chartType,
}: {
  handleChangeChartType: (type: string) => void;
  chartType: string;
}) {
  return (
    <Select
      value={chartType}
      onValueChange={(value) => handleChangeChartType(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select chart data" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="checkins">Checkins</SelectItem>
          <SelectItem value="items">Items</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
