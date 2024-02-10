"use client";
import { Button } from "@/components/ui/button";
import { ticketsSlice } from "@/lib/redux/slices/pos/cart/tickets/ticketsSlice";
import { useDispatch } from "@/lib/redux/store";
import { TicketT } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import React from "react";

export default function TicketActions({ ticket }: { ticket: TicketT }) {
  const dispatch = useDispatch();
  return (
    <div className="flex  gap-2">
      <Button
        type="button"
        variant={"secondary"}
        size={"icon"}
        className="relative z-10 rounded-full w-5 h-5 p-1 hover:bg-primary"
        onClick={() => dispatch(ticketsSlice.actions.decreaseQuantity(ticket))}
      >
        <Minus />
      </Button>
      <Button
        type="button"
        variant={"secondary"}
        size={"icon"}
        className="relative z-10 rounded-full w-5 h-5 p-1 hover:bg-destructive"
        onClick={() =>
          dispatch(ticketsSlice.actions.removeTicketFromCart(ticket))
        }
      >
        <X />
      </Button>
    </div>
  );
}
