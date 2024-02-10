import { archiveAllOrders, createNewOrder } from "@/lib/services/ordersService";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersInitialState } from "../ordersSlice";
import { OrderT } from "@/types";
import { error } from "console";

export const archiveAllOrdersThunk = createAsyncThunk(
  "orders/archiveAllOrders",
  async (orders: OrderT[]) => {
    await archiveAllOrders(orders);
  }
);

export const archiveAllOrdersThunkReducers = (
  builder: ActionReducerMapBuilder<OrdersInitialState>
) =>
  builder
    .addCase(archiveAllOrdersThunk.pending, (state) => {
      state.ordersStatus = "loading";
    })
    .addCase(archiveAllOrdersThunk.fulfilled, (state, action) => {
      state.ordersStatus = "succeeded";
      state.orders = [];
    })
    .addCase(archiveAllOrdersThunk.rejected, (state, action) => {
      console.error(action.error.message);
      state.ordersStatus = "failed";
    });
