import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { StockItemsInitalState } from "../stockSlice";
import { addNewStockItem } from "@/lib/services/stockItemsService";
import { StockItem } from "@/types/stock";

export const addNewStockItemThunk = createAsyncThunk(
  "stockItems/addNewStockItem",
  async (stockItemData: StockItem) => {
    const stockItem = await addNewStockItem(stockItemData);
    return stockItem;
  }
);

export const addNewStockItemReducers = (
  builder: ActionReducerMapBuilder<StockItemsInitalState>
) =>
  builder
    .addCase(addNewStockItemThunk.pending, (state) => {
      state.stockItemsStatus = "loading";
    })
    .addCase(addNewStockItemThunk.fulfilled, (state, action) => {
      state.stockItemsStatus = "succeeded";
      state.stockItems = [...state.stockItems, action.payload];
      state.stockItemToEdit = undefined
    })
    .addCase(addNewStockItemThunk.rejected, (state, action) => {
      state.stockItemsStatus = "failed";
      state.stockItemsError = action.error.message;
    });
