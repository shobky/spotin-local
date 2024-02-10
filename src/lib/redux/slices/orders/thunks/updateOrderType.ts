import {
  archiveOrder,
  checkoutOrder,
  updateOrderType,
} from "@/lib/services/ordersService";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersInitialState } from "../ordersSlice";
import { OrderT, OrderTypeT } from "@/types";

export const updateOrderTypeThunk = createAsyncThunk(
  "orders/updateOrderType",
  async (data: { order: OrderT; newType: OrderTypeT }) => {
    const { order, newType } = data;

    try {
      switch (newType) {
        case "archive":
          await archiveOrder(order);
          break;
        case "complete":
          await checkoutOrder(order);
          break;
        default:
          await updateOrderType(order.id, newType);
          break;
      }

      return { ...order, type: newType };
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error to be caught by the rejected case
    }
  }
);

export const updateOrderTypeThunkReducers = (
  builder: ActionReducerMapBuilder<OrdersInitialState>
) =>
  builder
    .addCase(updateOrderTypeThunk.pending, (state, action) => {
      const orderIdx = state.orders.findIndex(
        (o) => o.id === action.meta.arg.order.id
      );
      state.orders[orderIdx].status = "loading";
      if (state.signleOrder) {
        state.signleOrder.status = "loading";
      }
    })
    .addCase(updateOrderTypeThunk.fulfilled, (state, action) => {
      if (action.payload.type === "archive") {
        state.orders = state.orders.filter((o) => o.id !== action.payload.id);
      } else {
        const orderIdx = state.orders.findIndex(
          (o) => o.id === action.payload.id
        );
        state.orders[orderIdx].status = "succeeded";
        state.orders[orderIdx] = action.payload;
        state.signleOrder = action.payload;
        state.signleOrder.status = "succeeded";
        state.ordersStatus = "succeeded";
        state.signleOrderStatus = "succeeded";
      }
    })
    .addCase(updateOrderTypeThunk.rejected, (state, action) => {
      state.ordersStatus = "failed";
      state.ordersError = action.error.message;
    });
