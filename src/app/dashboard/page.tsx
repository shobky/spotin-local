import DailyReportContainer from "@/components/container/dailyReportContainer";
import { SignleDayPicker } from "@/components/shared/datePickers/signleDayPicker";
import { getOrdersByDay } from "@/lib/services/ordersService";
import { OrderT } from "@/types";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { reportDate: string };
}) {
  const selectedDate = searchParams.reportDate
    ? new Date(JSON.parse(searchParams.reportDate))
    : new Date();
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const archivedOrders = (await getOrdersByDay(
    selectedDate.getDate()
  )) as OrderT[];

  return (
    <>
      <div className="flex items-center justify-end space-y-2 absolute -top-[1rem] right-0 ">
        <div className="flex items-center space-x-2">
          <SignleDayPicker />
        </div>
      </div>
      <DailyReportContainer isToday={isToday} archivedOrders={archivedOrders} />
    </>
  );
}
