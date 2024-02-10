import { cancelOrder } from "@/lib/services/ordersService";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersInitialState } from "../ordersSlice";
import { OrderT } from "@/types";

export const cancelOrderThunk = createAsyncThunk(
  "orders/cancelOrder",
  async (order: OrderT) => {
    try {
      const data = await cancelOrder(order);
      return data as { order: OrderT; removedOrderId: string };
    } catch (err) {
      console.error(err);
      return { order: order, removedOrderId: order.id };
    }
  }
);

export const cancelOrderThunkReducers = (
  builder: ActionReducerMapBuilder<OrdersInitialState>
) =>
  builder
    .addCase(cancelOrderThunk.pending, (state, action) => {
      const orderIdx = state.orders.findIndex(
        (o) => o.id === action.meta.arg.id
      );
      state.orders[orderIdx].status = "loading";
      if (state.signleOrder) {
        state.signleOrder.status = "loading";
      }
    })
    .addCase(cancelOrderThunk.fulfilled, (state, action) => {
      console.log(action, "hi");
      const newOrders = state.orders.filter(
        (o) => o.id !== action.payload.removedOrderId
      );
      state.orders = newOrders;
      state.signleOrderStatus = "succeeded";
      state.ordersStatus = "succeeded";
      state.signleOrder = undefined;
    })
    .addCase(cancelOrderThunk.rejected, (state, action) => {
      console.log(action, "err");
      state.ordersStatus = "failed";
      state.ordersError = action.error.message;
    });
