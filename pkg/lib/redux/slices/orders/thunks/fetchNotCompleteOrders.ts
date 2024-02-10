import {
  getAllNotCompleteOrders,
  getAllOrders,
} from "@/lib/services/ordersService";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersInitialState } from "../ordersSlice";

export const fetchNotCompleteOrders = createAsyncThunk(
  "orders/fetchNotCompleteOrders",
  async () => {
    const orders = await getAllOrders();
    return orders;
  }
);

export const fetchNotCompleteOrdersReducers = (
  builder: ActionReducerMapBuilder<OrdersInitialState>
) =>
  builder
    .addCase(fetchNotCompleteOrders.pending, (state) => {
      state.ordersStatus = "loading";
    })
    .addCase(fetchNotCompleteOrders.fulfilled, (state, action) => {
      state.ordersStatus = "succeeded";
      state.orders = action.payload;
    })
    .addCase(fetchNotCompleteOrders.rejected, (state, action) => {
      state.ordersStatus = "failed";
      state.ordersError = action.error.message;
    });
