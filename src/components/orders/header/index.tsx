import React from "react";
import OrdersFilterer from "./ordersFilterer";
import OrdersSorter from "./ordersSorter";
import OrderHeaderMoreOptions from "./orderHeaderMoreOptions";

export default function OrdersHeader() {
  return (
    <div className="flex items-center justify-between flex-wrap">
      <OrdersFilterer />
      <div className="flex gap-2 h-full items-center">
        <OrdersSorter />
        <OrderHeaderMoreOptions />
      </div>
    </div>
  );
}
