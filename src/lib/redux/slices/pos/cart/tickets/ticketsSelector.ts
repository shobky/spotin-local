import { State } from "@/lib/redux/store";

export const selectAllActiveTickets = (state: State) => {
  return {
    ticketsData: state.tickets.ticketsData,
    ticketsState: state.tickets.ticketsState,
  };
};

export const selectTicketsCart = (state: State) => state.tickets;

export const selectTicketsSubTotal = (state: State) =>
  state.tickets.ticketsSubTotal;
