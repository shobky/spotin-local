import {
  archiveCompletedOrders,
} from "@/lib/services/ordersService";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersInitialState } from "../ordersSlice";
import { OrderT } from "@/types";

export const archiveCompletedOrdersThunk = createAsyncThunk(
  "orders/archiveCompletedOrders",
  async (orders: OrderT[]) => {
   const remains =  await archiveCompletedOrders(orders);
   return remains
  }
);

export const archiveCompletedOrdersThunkReducers = (
  builder: ActionReducerMapBuilder<OrdersInitialState>
) =>
  builder
    .addCase(archiveCompletedOrdersThunk.pending, (state) => {
      state.ordersStatus = "loading";
    })
    .addCase(archiveCompletedOrdersThunk.fulfilled, (state, action) => {
      state.ordersStatus = "succeeded";
      state.orders = action.payload
    })
    .addCase(archiveCompletedOrdersThunk.rejected, (state, action) => {
      console.error(action.error.message);
      state.ordersStatus = "failed";
    });
