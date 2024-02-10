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
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderT } from "@/types";
import {
  ArrowRight,
  Ban,
  MoreHorizontal,
  ShoppingCart,
  StickyNote,
} from "lucide-react";
import Link from "next/link";
import OrderCardAction from "./orderCardAction";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "@/lib/redux/store";
import { ordersSlcie } from "@/lib/redux/slices/orders/ordersSlice";
import { calculateOrderSubTotal } from "@/lib/helpers/ticketHelpters";
import { cancelOrderThunk } from "@/lib/redux/slices/orders/thunks/cancelOrderThunk";

export default function OrderMoreOptions({
  order,
  handleAddNote,
}: {
  order: OrderT;
  handleAddNote: (note?: string) => void;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const detailedOrderPage = usePathname().split("/")[2];

  if (!order) {
    return <></>;
  }

  const handleAppendingToOrder = () => {
    dispatch(ordersSlcie.actions.selectOrderToAppednTo(order));
    router.push("/?order=" + order.id);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button>
          <MoreHorizontal />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 " align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col justify-between">
            <p className="font-semibold">{order.customer.name}</p>
            <p className="font-light">
              #{typeof order.id === "string" && order.id.slice(0, 17)}..
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <button className="w-full" onClick={handleAppendingToOrder}>
            <DropdownMenuItem className="flex items-center">
              Add more items{" "}
              <DropdownMenuShortcut>
                <ShoppingCart size={18} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </button>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More actions</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-[150px]">
                {!detailedOrderPage && (
                  <Link href={`/orders/${order.id}`}>
                    <DropdownMenuItem className="flex items-center">
                      Go to order{" "}
                      <DropdownMenuShortcut>
                        <ArrowRight size={18} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                )}
                <button className="w-full" onClick={() => handleAddNote()}>
                  <DropdownMenuItem className="flex items-center">
                    Leave a note
                    <DropdownMenuShortcut>
                      <StickyNote size={18} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </button>
                <button
                  className="w-full "
                  onClick={() => dispatch(cancelOrderThunk(order))}
                >
                  <DropdownMenuItem className="flex  text-red-500 focus:text-white focus:bg-red-500  items-center">
                    Cancel order
                    <DropdownMenuShortcut>
                      <Ban size={18} className="" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </button>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-12 flex justify-between items-center">
          <OrderCardAction order={order} />
          <p className="font-bold text-lg ">${calculateOrderSubTotal(order)}</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
