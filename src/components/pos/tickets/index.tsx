"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ticket, TicketIcon } from "lucide-react";
import TicketActions from "./ticketActions";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectTicketsCart } from "@/lib/redux/slices/pos/cart/tickets/ticketsSelector";
import { TicketT } from "@/types";
import { ticketsSlice } from "@/lib/redux/slices/pos/cart/tickets/ticketsSlice";
import { fetchTicketsThunk } from "@/lib/redux/slices/pos/cart/tickets/thunks/ticketsThunk";
import { selectOrderToAppednTo } from "@/lib/redux/slices/orders/ordersSelector";

export default function TicketsMenu() {
  const { ticketsData, ticketsState, tickets, qty, ticketsSubTotal } =
    useSelector(selectTicketsCart);

  const orderToAppednTo = useSelector(selectOrderToAppednTo);

  const ticketsTotalQty = qty;

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ticketsState === "idle") {
      dispatch(fetchTicketsThunk());
    }
  }, [ticketsState, dispatch]);

  const addTicket = (ticket: TicketT) => {
    dispatch(
      ticketsSlice.actions.addTickettoCart({ ...ticket, start: new Date(), end: 0 })
    );
  };
  const decreseTicketQty = (ticket: TicketT) => {
    dispatch(
      ticketsSlice.actions.decreaseQuantity({ ...ticket, start: new Date(), end: 0 })
    );
  };

  return (
    <DropdownMenu open={open} modal={false}>
      <DropdownMenuTrigger
        onClick={() => setOpen(!open)}
        asChild
        className="h-12 w-full"
      >
        <Button
          className="flex gap-2 w-full"
          variant={ticketsTotalQty ? "default" : "outline"}
        >
          {/* <Ticket width={22} /> */}
          {ticketsTotalQty === 0 ? (
            "Checkins"
          ) : (
            <span className="text-[1rem] relative top-[1.2px] w-32 flex items-center gap-2 justify-center">
             Checkins £{ticketsSubTotal ?? ""}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onMouseLeave={() => setOpen(false)}
        alignOffset={-150}
        sticky={"always"}
        className="w-60"
        align="start"
        forceMount
      >
        <DropdownMenuLabel className="font-normal flex flex-col justify-start ">
          <p className="flex justify-between w-full">Checkins <span>x{ticketsTotalQty}</span></p>
          {orderToAppednTo && (
            <p className="text-xs text-secondary-foreground">
              {orderToAppednTo.tickets.totalQty} already checked in.
            </p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="drop-down-menu-group overflow-y-auto max-h-[60vh] drop-down-menu-content">
          {ticketsState === "idle" ||
            (ticketsState === "loading" && (
              <DropdownMenuItem disabled>loading..</DropdownMenuItem>
            ))}
          {ticketsData.map((ticket) => (
            <DropdownMenuItem
              key={ticket.id}
              className="flex items-center justify-between"
            >
              <button
                onClick={() => addTicket(ticket)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  decreseTicketQty(ticket);
                }}
                className="flex items-center gap-3 "
              >
                <Ticket className="w-6" strokeWidth={1.4} />
                <div className="flex flex-col items-start">
                  <div>
                    <span className=" text-xs relative top-[1px]">x</span>
                    {tickets.find((t) => t.ticket.id === ticket.id)?.qty || 0}
                    {ticket.name.toUpperCase()}
                  </div>
                  <p className="text-xs opacity-60">{ticket.price} LE</p>
                </div>
              </button>
              <TicketActions ticket={ticket} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
