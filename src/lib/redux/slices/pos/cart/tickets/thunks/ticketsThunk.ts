import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTikets } from "@/lib/services/ticketsService";
import { TicketsInitialState } from "../ticketsSlice";

export const fetchTicketsThunk = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const tickets = await getAllTikets();
    return tickets;
  }
);

export const fetchTicketsReducers = (
  builder: ActionReducerMapBuilder<TicketsInitialState>
) =>
  builder
    .addCase(fetchTicketsThunk.pending, (state) => {
      state.ticketsState = "loading";
    })
    .addCase(fetchTicketsThunk.fulfilled, (state, action) => {
      state.ticketsState = "succeeded";
      state.ticketsData = action.payload;
    })
    .addCase(fetchTicketsThunk.rejected, (state, action) => {
      state.ticketsState = "failed";
      state.ticketsError = action.error.message;
    });
