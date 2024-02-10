import { StateStatus } from "./../../../../../../types/index.d";
import { TicketT } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchTicketsReducers } from "./thunks/ticketsThunk";
import { updateOrAddTicketReducers } from "./thunks/updateOrAddTicketThunk";
import { deleteTicketReducers } from "./thunks/deleteTicketThunk";

export interface TicketsInitialState {
  ticketsData: TicketT[];
  ticketsState: StateStatus;
  ticketsError: string | undefined;

  tickets: {
    ticket: TicketT;
    qty: number;
  }[];
  qty: number;
  ticketsSubTotal: number;
}
const initialState: TicketsInitialState = {
  ticketsData: [],
  ticketsState: "idle",
  ticketsError: undefined,
  tickets: [],
  qty: 0,
  ticketsSubTotal: 0,
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  extraReducers(builder) {
    fetchTicketsReducers(builder);
    updateOrAddTicketReducers(builder);
    deleteTicketReducers(builder)
  },
  reducers: {
    addTickettoCart: (state, action: PayloadAction<TicketT>) => {
      const ticket = action.payload;
      const ticketIndex = state.tickets.findIndex(
        (i) => i.ticket.id === ticket.id
      );
      if (ticketIndex !== -1) {
        state.tickets[ticketIndex].qty++;
      } else {
        state.tickets.push({
          ticket: ticket,
          qty: 1,
        });
      }
      state.qty++;
      state.ticketsSubTotal += ticket.price;
    },
    removeTicketFromCart: (state, action: PayloadAction<TicketT>) => {
      const ticket = action.payload;
      const ticketIndex = state.tickets.findIndex(
        (i) => i.ticket.id === ticket.id
      );

      if (ticketIndex !== -1) {
        const ticketsQty = state.tickets[ticketIndex].qty;
        state.ticketsSubTotal -= ticket.price * ticketsQty;
        state.qty -= ticketsQty;
        state.tickets.splice(ticketIndex, 1);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<TicketT>) => {
      const ticket = action.payload;
      const ticketIndex = state.tickets.findIndex(
        (i) => i.ticket.id === ticket.id
      );

      if (ticketIndex !== -1) {
        const newQty = state.tickets[ticketIndex].qty - 1;
        if (newQty === 0) {
          state.tickets.splice(ticketIndex, 1);
        } else {
          state.tickets[ticketIndex].qty--;
        }
        state.qty--;
        state.ticketsSubTotal -= ticket.price;
      }
    },
    clearTicketCart: (state) => {
      state.ticketsSubTotal = 0;
      state.qty = 0;
      state.tickets = [];
    },
  },
});
