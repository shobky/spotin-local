import { appendToAnOrder, createNewOrder } from "@/lib/services/ordersService";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersInitialState } from "../ordersSlice";
import { OrderT } from "@/types";

export const appendToOrderThunk = createAsyncThunk(
  "orders/appednToOrder",
  async (order: OrderT) => {
    const newOrder = await appendToAnOrder(order);
    return newOrder as OrderT;
  }
);

export const appendToOrderThunkReducers = (
  builder: ActionReducerMapBuilder<OrdersInitialState>
) =>
  builder
    .addCase(appendToOrderThunk.pending, (state) => {
      state.creatingOrderStaus = "loading";
    })
    .addCase(appendToOrderThunk.fulfilled, (state, action) => {
      state.creatingOrderStaus = "succeeded";
      const idx = state.orders.findIndex((o) => o.id === action.payload.id);
      console.log(idx, state.orders[idx], action.payload);
      state.orders[idx] = action.payload;
    })
    .addCase(appendToOrderThunk.rejected, (state) => {
      state.creatingOrderStaus = "failed";
    });
