"use client";
import {
  selectAllOrders,
  selectCreatingOrderStatus,
} from "@/lib/redux/slices/orders/ordersSelector";
import { useSelector } from "@/lib/redux/store";
import { usePathname } from "next/navigation";

export default function OrderNewBadge() {
  const status = useSelector(selectCreatingOrderStatus);
  const orders = useSelector(selectAllOrders);
  const count = orders.length;

  return (
    <>
      {count > 0 && (
        <div
          className={`font-medium absolute right-0 top-0 flex justify-center items-center text-xs transition-all ease-in-out duration-150 ${
            status === "loading" && "text-green-500 scale-105"
          }`}
        >
          +{count}
        </div>
      )}
    </>
  );
}
