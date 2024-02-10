import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./chartToolTip";

export default function DataLineChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer
      width={`${data.length > 10 ? data.length * 12 : 100}%`}
      className="text-foreground hide-scrollbar "
      height={300}
    >
      <LineChart data={data}>
        <XAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickMargin={15}
          dataKey="name"
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <Tooltip content={<CustomTooltip sign="checkins" />} />
        <Line
          type="bumpX"
          dataKey={"total"}
          stroke="var(--primary)"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
