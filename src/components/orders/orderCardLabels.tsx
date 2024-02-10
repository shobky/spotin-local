import { OrderT } from "@/types";
import {
  ArrowUpRight,
  History,
  HourglassIcon,
  Tag,
  Tags,
  TimerOff,
} from "lucide-react";
import React from "react";
import ToolTip from "../ui/toolTip";
import { differenceInMinutes } from "date-fns";

export default function OrderCardLabels({ order }: { order: OrderT }) {
  const isOrderLate =
    differenceInMinutes(new Date(), new Date(order.createdAt.seconds * 1000)) >
    15;

  const isFullDay =
    differenceInMinutes(new Date(), new Date(order.createdAt.seconds * 1000)) >
    120;

  return (
    <div className="flex flex-wrap w-full items-center gap-[.3rem]">
      {(order.type === "pickup" || order.isTakeaway) && (
        <ToolTip className="min-w-[4rem] text-xs bg-secondary" tip="Takeaway">
          <ArrowUpRight className="text-order-pickup" size={18} />
        </ToolTip>
      )}
      {order?.tickets?.totalQty > 1 ? (
        <ToolTip
          tip={`${order.tickets.totalQty} Checkins`}
          className="min-w-[5.5rem] text-xs bg-secondary"
        >
          <Tags className="text-green-400" size={19} />
        </ToolTip>
      ) : (
        order.tickets?.totalQty === 1 && (
          <ToolTip
            tip={"1 person"}
            className="min-w-[5rem] text-xs bg-secondary"
          >
            <Tag className="text-green-400" size={15} />
          </ToolTip>
        )
      )}
      {order.type === "preparing" && (
        <>
          <ToolTip
            tip="Preparing"
            className="min-w-[4rem] text-xs bg-secondary"
          >
            <History className="text-primary" size={16} />
          </ToolTip>
          {isOrderLate && (
            <ToolTip
              tip="Late order"
              className="min-w-[5rem] text-xs bg-secondary"
            >
              <HourglassIcon size={15} className=" text-destructive" />
            </ToolTip>
          )}
        </>
      )}
      {isFullDay && (
        <ToolTip tip="Full day" className="min-w-[5rem] text-xs bg-secondary">
          <TimerOff size={16} className="text-yellow-500" />
        </ToolTip>
      )}
    </div>
  );
}
