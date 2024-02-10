import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsInitialState } from "../productsSlice";
import { getAllActiveProducts } from "@/lib/services/productsService";

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await getAllActiveProducts();
    return products;
  }
);

export const fetchProductsReducers = (
  builder: ActionReducerMapBuilder<ProductsInitialState>
) =>
  builder
    .addCase(fetchProductsThunk.pending, (state) => {
      state.productsStatus = "loading";
    })
    .addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.productsStatus = "succeeded";
      state.products = action.payload;
    })
    .addCase(fetchProductsThunk.rejected, (state, action) => {
      state.productsStatus = "failed";
      state.productsError = action.error.message;
    });
