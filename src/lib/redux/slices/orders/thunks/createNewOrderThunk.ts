import { createNewOrder } from "@/lib/services/ordersService";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersInitialState } from "../ordersSlice";
import { OrderT } from "@/types";

export const createNewOrderThunk = createAsyncThunk(
  "orders/createNewOrder",
  async (order: OrderT) => {
    const newOrder = await createNewOrder(order);
    return newOrder as OrderT;
  }
);

export const createNewOrderThunkReducers = (
  builder: ActionReducerMapBuilder<OrdersInitialState>
) =>
builder
    .addCase(createNewOrderThunk.pending, (state) => {
      state.creatingOrderStaus = "loading";
    })
    .addCase(createNewOrderThunk.fulfilled, (state, action) => {
      state.creatingOrderStaus = "succeeded";
      state.orders.push(action.payload);
    })
    .addCase(createNewOrderThunk.rejected, (state) => {
      state.creatingOrderStaus = "failed";
    });
