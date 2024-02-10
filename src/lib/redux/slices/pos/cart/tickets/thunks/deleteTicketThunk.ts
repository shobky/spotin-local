import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { TicketsInitialState } from "../ticketsSlice";
import { deleteTicketWithId } from "@/lib/services/ticketsService";

export const deleteTicketThunk = createAsyncThunk(
  "tickets/deleteTicket",
  async (id: string) => {
    await deleteTicketWithId(id);
    return id;
  }
);

export const deleteTicketReducers = (
  builder: ActionReducerMapBuilder<TicketsInitialState>
) =>
  builder
    .addCase(deleteTicketThunk.pending, (state) => {
      state.ticketsState = "loading";
    })
    .addCase(deleteTicketThunk.fulfilled, (state, action) => {
      state.ticketsState = "succeeded";
      state.ticketsData = state.ticketsData.filter(
        (t) => t.id !== action.payload
      );
    })
    .addCase(deleteTicketThunk.rejected, (state, action) => {
      state.ticketsState = "failed";
      state.ticketsError = action.error.message;
    });
