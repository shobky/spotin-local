"use client";

import { Button } from "@/components/ui/button";
import ToolTip from "@/components/ui/toolTip";
import {
  selectAllNonCompleteOrders,
  selectOrdersStatus,
} from "@/lib/redux/slices/orders/ordersSelector";
import { useSelector } from "@/lib/redux/store";
import { AlertCircle, FileWarning, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

export const categories = {
  all: {
    name: "All",
    type: "all",
    backgroundColor: " bg-purple-500 - hover:bg-purple-600",
  },
  preparing: {
    name: "Preparing",
    type: "preparing",
    backgroundColor: " bg-order-preparing - hover:bg-order-preparing/90",
  },
  new: {
    name: "New",
    type: "new",
    backgroundColor: " bg-order-new - hover:bg-order-new/90",
  },
  pickup: {
    name: "Takeaway",
    type: "pickup",
    backgroundColor: " bg-order-pickup - hover:bg-order-pickup/90",
  },
  complete: {
    name: "Complete",
    type: "complete",
    backgroundColor: " bg-order-complete - hover:bg-order-complete/90",
  },
};
export default function OrdersFilterer() {
  const orders = useSelector(selectAllNonCompleteOrders);
  const ordersStatus = useSelector(selectOrdersStatus);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedType = searchParams.get("type");

  const handleSelectType = useCallback((rule: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", rule);
    router.replace(pathname + "?" + params.toString());
  }, [searchParams, router]);

  useEffect(() => {
    if (!selectedType) {
      handleSelectType("all");
    }
  }, [selectedType, handleSelectType]);

  const counts: any = {
    all: orders.length,
    new: orders.filter((o) => o.type === "new").length,
    pickup: orders.filter((o) => o.type === "pickup").length,
    preparing: orders.filter((o) => o.type === "preparing").length,
    complete: orders.filter((o) => o.type === "complete").length,
  };

  return (
    <div className="flex gap-2 flex-wrap bg-secondary  p-1 rounded-full ">
      {Object.entries(categories).map(([key, value]) => {
        const active =
          selectedType === value.type ||
          (selectedType === "all" && value.type === "all");
        return (
          <Button
            variant={"outline"}
            size={"sm"}
            key={key}
            onClick={() => handleSelectType(value.type)}
            className={` 
            font-semibold text-sm flex gap-4  rounded-full 
            ${
              active &&
              value.backgroundColor +
                "cursor-default text-white hover:text-white"
            }`}
          >
            {value.name}
            {ordersStatus === "idle" || ordersStatus === "loading" ? (
              <Loader2 className="animate-spin w-4" />
            ) : ordersStatus === "failed" ? (
              <ToolTip tip="error">
                <AlertCircle className="text-destructive w-4" />
              </ToolTip>
            ) : (
              <p className=" font-noraml text-xs relative top-[1.5px] ">{`(${counts[key]})`}</p>
            )}
          </Button>
        );
      })}
    </div>
  );
}
