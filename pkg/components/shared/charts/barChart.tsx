import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "./chartToolTip";

export default function DataBarChart({ data }: { data: any[] }) {
  const bars = data.length;
  const width = bars <= 10 ? 100 : bars > 20 ? bars * 5 : bars * 8.5;
  return (
    <ResponsiveContainer
      width={`${width}%`}
      height={300}
    >
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}£`}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={<CustomTooltip className="p-2" sign="£" />}
        />
        <Bar
          activeBar={{ stroke: "white", strokeWidth: 2 }}
          className="hover:bg-none"
          dataKey="total"
          fill="hsl(29, 96%, 53%)"
          radius={[4, 4, 4, 4]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
