import { State } from "../../store";

export const selectStockItemsSlice = (state: State) => state.stockItems;

export const selectStockItemToEdit = (state: State) =>
  state.stockItems.stockItemToEdit;
