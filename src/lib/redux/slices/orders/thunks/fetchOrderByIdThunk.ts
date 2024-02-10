import { getOrderById } from "@/lib/services/ordersService";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersInitialState } from "../ordersSlice";

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id: string) => {
    const order = await getOrderById(id);
    return order;
  }
);

export const fetchOrderByIdReducers = (
  builder: ActionReducerMapBuilder<OrdersInitialState>
) =>
  builder
    .addCase(fetchOrderById.pending, (state) => {
      state.signleOrderStatus = "loading";
    })
    .addCase(fetchOrderById.fulfilled, (state, action) => {
      state.signleOrderStatus = "succeeded";
      state.signleOrder = action.payload;
    })
    .addCase(fetchOrderById.rejected, (state, action) => {
      state.signleOrderStatus = "failed";
      state.ordersError = action.error.message;
    });
