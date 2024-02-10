import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { StockItemsInitalState } from "../stockSlice";
import { getStockItems } from "@/lib/services/stockItemsService";

export const fetchStockItemsThunk = createAsyncThunk(
  "stockItems/fetchStockItems",
  async () => {
    const stockItems = await getStockItems();
    return stockItems;
  }
);

export const fetchStockItemsReducers = (
  builder: ActionReducerMapBuilder<StockItemsInitalState>
) =>
  builder
    .addCase(fetchStockItemsThunk.pending, (state) => {
      state.stockItemsStatus = "loading";
    })
    .addCase(fetchStockItemsThunk.fulfilled, (state, action) => {
      state.stockItemsStatus = "succeeded";
      state.stockItems = action.payload;
    })
    .addCase(fetchStockItemsThunk.rejected, (state, action) => {
      state.stockItemsStatus = "failed";
      state.stockItemsError = action.error.message;
    });
