import { StateStatus } from "@/types/index.d";
import { ProductT } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsReducers } from "./thunks/productsThunks";
import { editProductsReducers } from "./thunks/editProductThunk";
import { newProductReducers } from "./thunks/newProductThunk";
import { deleteProductsReducers } from "./thunks/deleteProductThunk";
import { ToggleProductActivityReducers } from "./thunks/toggleProductActivityThunk";
import { chagneProductStockQtyReducers } from "./thunks/changeStockQtyThunk";

export interface ProductsInitialState {
  products: ProductT[];
  productsStatus: StateStatus;
  productsError: string | undefined;
  editingStatus: StateStatus;
}

const initialState: ProductsInitialState = {
  products: [],
  productsStatus: "idle",
  productsError: undefined,
  editingStatus: "idle",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    fetchProductsReducers(builder);
    editProductsReducers(builder);
    newProductReducers(builder);
    deleteProductsReducers(builder);
    ToggleProductActivityReducers(builder);
    chagneProductStockQtyReducers(builder);
  },
});
