import { StateStatus } from "@/types";
import { StockItem, StockItemKey } from "@/types/stock";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchStockItemsReducers } from "./thunks/fetchStockItemsThunk";
import { addNewStockItemReducers } from "./thunks/addNewStockItemThunk";
import { updateStockItemReducers } from "./thunks/updateStockItemThunk";
import { deleteStockItemReducers } from "./thunks/deleteStockItemThunk";

export interface StockItemsInitalState {
  stockItems: StockItem[];
  stockItemsStatus: StateStatus;
  stockItemsError: string | undefined;
  stockItemToEdit: StockItem | undefined;
  stockHistory: StockItem[] | [];
}

const initialState: StockItemsInitalState = {
  stockItems: [],
  stockItemsStatus: "idle",
  stockItemsError: undefined,
  stockItemToEdit: undefined,
  stockHistory: [],
};

type EditStockItemPayload = {
  key: StockItemKey;
  newValue: any;
};

type UpdateItemStockAfterCartPayload = {
  idx: number;
  newStockAmount: number;
};
export const stockItemsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    pickStockItemToEdit: (
      state,
      action: PayloadAction<StockItem | undefined>
    ) => {
      state.stockItemToEdit = action.payload;
    },
    editStockItem: (state, action: PayloadAction<EditStockItemPayload>) => {
      const newStockItem = {
        ...state.stockItemToEdit,
        [action.payload.key]: action.payload.newValue,
      };
      state.stockItemToEdit = newStockItem as StockItem;
    },
    addStockItemUsedInProduct: (state, action: PayloadAction<string>) => {
      state.stockItemToEdit?.usedIn.push(action.payload);
    },
    removeStockItemUsedInProduct: (state, action: PayloadAction<string>) => {
      if (state.stockItemToEdit) {
        const indexToRemove = state.stockItemToEdit.usedIn.indexOf(
          action.payload
        );
        if (indexToRemove !== -1) {
          const newUsedInProducts = [...state.stockItemToEdit.usedIn];
          newUsedInProducts.splice(indexToRemove, 1);
          state.stockItemToEdit.usedIn = newUsedInProducts;
        }
      }
    },
    updateItemStockAfterCart: (
      state,
      action: PayloadAction<UpdateItemStockAfterCartPayload>
    ) => {
      const idx = action.payload.idx;
      const updatedStockItem = {
        ...state.stockItems[idx],
        amount: action.payload.newStockAmount,
      };
      state.stockItems[idx] = updatedStockItem;
      // update the history to push to firestore after confirming the order.
      const newStockHistory = [...state.stockHistory, updatedStockItem];
      state.stockHistory = newStockHistory;
    },
  },
  extraReducers(builder) {
    fetchStockItemsReducers(builder);
    addNewStockItemReducers(builder);
    updateStockItemReducers(builder);
    deleteStockItemReducers(builder);
  },
});
