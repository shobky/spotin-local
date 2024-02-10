"use client";
import TicketCard from "@/components/controlPanel/tickets/ticketCard";
import { fetchTicketsThunk } from "@/lib/redux/slices/pos/cart/tickets/thunks/ticketsThunk";
import { selectAllActiveTickets } from "@/lib/redux/slices/pos/cart/tickets/ticketsSelector";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { useEffect } from "react";

export default function Tickets() {
  const { ticketsData, ticketsState } = useSelector(selectAllActiveTickets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ticketsState === "idle") {
      dispatch(fetchTicketsThunk());
    }
  }, [ticketsState, dispatch]);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {ticketsData.map((ticket) => (
        <TicketCard ticket={ticket} key={ticket.id}/>
      ))}
    </div>
  );
}
