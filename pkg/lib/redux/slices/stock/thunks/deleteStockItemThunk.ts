import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { StockItemsInitalState } from "../stockSlice";
import { deleteStockItem } from "@/lib/services/stockItemsService";
import { StockItem } from "@/types/stock";

export const deleteStockItemThunk = createAsyncThunk(
  "stockItems/deleteStockItem",
  async (stockItemData: StockItem) => {
    await deleteStockItem(stockItemData);
    return stockItemData;
  }
);

export const deleteStockItemReducers = (
  builder: ActionReducerMapBuilder<StockItemsInitalState>
) =>
  builder
    .addCase(deleteStockItemThunk.pending, (state) => {
      state.stockItemsStatus = "loading";
    })
    .addCase(deleteStockItemThunk.fulfilled, (state, action) => {
      state.stockItemsStatus = "succeeded";
      state.stockItems = state.stockItems.filter(
        (i: StockItem) => i.id !== action.payload.id
      );
    })
    .addCase(deleteStockItemThunk.rejected, (state, action) => {
      state.stockItemsStatus = "failed";
      state.stockItemsError = action.error.message;
    });
