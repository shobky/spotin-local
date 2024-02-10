"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, MoreHorizontal, X } from "lucide-react";
import { useSelector } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import {
  selectAllOrders,
  selectOrdersStatus,
} from "@/lib/redux/slices/orders/ordersSelector";
import EndSession from "@/components/cashierSessions/endSession";
import { cashierSessionState } from "@/types";
import StartSession from "@/components/cashierSessions/startSession";
import { getCashierSession } from "@/lib/helpers/sessionHelpers";

export default function OrderHeaderMoreOptions() {
  const [open, setOpen] = useState("closed");
  const [session, setSession] = useState(null);
  const orders = useSelector(selectAllOrders);
  const ordersStatus = useSelector(selectOrdersStatus);

  const handleModalOpen = (n: cashierSessionState) => {
    setOpen(n);
  };

  useEffect(() => {
    setSession(getCashierSession());
  }, []);

  if (open !== "closed") {
    return (
      <>
        {open === "end" ? (
          <EndSession
            handleModalOpen={handleModalOpen}
            orders={orders}
            ordersStatus={ordersStatus}
          />
        ) : (
          <StartSession handleModalOpen={handleModalOpen} />
        )}
      </>
    );
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className=" " asChild>
        <button className="rounded-full border-input border w-10 h-10 flex justify-center items-center hover:bg-secondary aspect-square">
          <MoreHorizontal />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 " align="end">
        <DropdownMenuLabel className="font-normal">
          More Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {session ? (
            <DropdownMenuItem
              className="flex items-center"
              onClick={() => handleModalOpen("end")}
            >
              End session
              <DropdownMenuShortcut>
                <CheckCircle2 size={18} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="flex items-center"
              onClick={() => {handleModalOpen("start")}}
            >
              Start session{" "}
              <DropdownMenuShortcut>
                <CheckCircle2 size={18} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
