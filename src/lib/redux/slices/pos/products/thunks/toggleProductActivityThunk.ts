import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateProductActivity,
} from "@/lib/services/productsService";
import { ProductsInitialState } from "../productsSlice";

export const ToggleProductActivityThunk = createAsyncThunk(
  "products/toggleProductActivity",
  async (data: { id: string; newValue: boolean }) => {
    await updateProductActivity(data.id, data.newValue);
    return data;
  }
);

export const ToggleProductActivityReducers = (
  builder: ActionReducerMapBuilder<ProductsInitialState>
) =>
  builder
    .addCase(ToggleProductActivityThunk.pending, (state) => {
      state.editingStatus = "loading";
    })
    .addCase(ToggleProductActivityThunk.fulfilled, (state, action) => {
      state.editingStatus = "succeeded";
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      state.products[idx].active = action.payload.newValue;
    })
    .addCase(ToggleProductActivityThunk.rejected, (state, action) => {
      state.editingStatus = "failed";
      state.productsError = action.error.message;
    });
