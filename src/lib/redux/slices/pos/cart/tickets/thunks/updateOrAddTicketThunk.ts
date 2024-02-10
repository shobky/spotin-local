import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewTicket,
  updateTicket,
} from "@/lib/services/ticketsService";
import { TicketsInitialState } from "../ticketsSlice";
import { TicketT } from "@/types";

export const updateOrAddTicketThunk = createAsyncThunk(
  "tickets/updateOrAddTicket",
  async (data: { ticket: TicketT; new: boolean }) => {
    if (data.new) {
      const newTicket = await addNewTicket(data.ticket);
      return newTicket;
    } else {
      await updateTicket(data.ticket);
      return data.ticket;
    }
  }
);

export const updateOrAddTicketReducers = (
  builder: ActionReducerMapBuilder<TicketsInitialState>
) =>
  builder
    .addCase(updateOrAddTicketThunk.pending, (state) => {
      state.ticketsState = "loading";
    })
    .addCase(updateOrAddTicketThunk.fulfilled, (state, action) => {
      state.ticketsState = "succeeded";
      const idx = state.ticketsData.findIndex(
        (t) => t.id === action.payload.id
      );
      if (idx === -1) {
        state.ticketsData.push(action.payload);
      } else {
        state.ticketsData[idx] = action.payload;
      }
    })
    .addCase(updateOrAddTicketThunk.rejected, (state, action) => {
      state.ticketsState = "failed";
      state.ticketsError = action.error.message;
    });
