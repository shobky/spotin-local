import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateProductStockQty,
} from "@/lib/services/productsService";
import { ProductsInitialState } from "../productsSlice";

export const ChangeProductStockQtyThunk = createAsyncThunk(
  "products/chagneProductStockQty",
  async (data: { id: string; newValue?: number }) => {
    await updateProductStockQty(data.id, data.newValue);
    return data;
  }
);

export const chagneProductStockQtyReducers = (
  builder: ActionReducerMapBuilder<ProductsInitialState>
) =>
  builder
    .addCase(ChangeProductStockQtyThunk.pending, (state) => {
      state.editingStatus = "loading";
    })
    .addCase(ChangeProductStockQtyThunk.fulfilled, (state, action) => {
      state.editingStatus = "succeeded";
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      state.products[idx].stockQty = action.payload.newValue;
    })
    .addCase(ChangeProductStockQtyThunk.rejected, (state, action) => {
      state.editingStatus = "failed";
      state.productsError = action.error.message;
    });
