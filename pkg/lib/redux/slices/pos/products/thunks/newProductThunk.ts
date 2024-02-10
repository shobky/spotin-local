import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { addNewProduct } from "@/lib/services/productsService";
import { ProductsInitialState } from "../productsSlice";
import { ProductT } from '@/types';

export const newProductThunk = createAsyncThunk(
  "products/newProducts",
  async (product: ProductT) => {
    const newProduct = await addNewProduct(product);
    return newProduct;
  }
);

export const newProductReducers = (
  builder: ActionReducerMapBuilder<ProductsInitialState>
) =>
  builder
    .addCase(newProductThunk.pending, (state) => {
      state.productsStatus = "loading";
    })
    .addCase(newProductThunk.fulfilled, (state, action) => {
      state.productsStatus = "succeeded";
      state.products = [...state.products, action.payload];
    })
    .addCase(newProductThunk.rejected, (state, action) => {
      state.productsStatus = "failed";
      state.productsError = action.error.message;
    });
