import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { StockItemsInitalState } from "../stockSlice";
import { updateStockItem } from "@/lib/services/stockItemsService";
import { StockItem } from "@/types/stock";

export const updateStockItemThunk = createAsyncThunk(
  "stockItems/updateStockItem",
  async (stockItemData: StockItem) => {
    await updateStockItem(stockItemData);
    return stockItemData;
  }
);

export const updateStockItemReducers = (
  builder: ActionReducerMapBuilder<StockItemsInitalState>
) =>
  builder
    .addCase(updateStockItemThunk.pending, (state) => {
      state.stockItemsStatus = "loading";
    })
    .addCase(updateStockItemThunk.fulfilled, (state, action) => {
      state.stockItemsStatus = "succeeded";
      const idx = state.stockItems.findIndex((i) => i.id === action.payload.id);

      if (idx !== -1) {
        state.stockItems[idx] = action.payload;
      }
      state.stockItemToEdit = undefined;
    })
    .addCase(updateStockItemThunk.rejected, (state, action) => {
      state.stockItemsStatus = "failed";
      state.stockItemsError = action.error.message;
    });
