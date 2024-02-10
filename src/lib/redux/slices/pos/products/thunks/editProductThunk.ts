import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProduct } from "@/lib/services/productsService";
import { ProductsInitialState } from "../productsSlice";
import { ProductT } from "@/types";

export const editProductsThunk = createAsyncThunk(
  "products/edithProducts",
  async (product: ProductT | any) => {
    const updatedProduct = await updateProduct(product);
    return updatedProduct;
  }
);

export const editProductsReducers = (
  builder: ActionReducerMapBuilder<ProductsInitialState>
) =>
  builder
    .addCase(editProductsThunk.pending, (state) => {
      state.editingStatus = "loading";
    })
    .addCase(editProductsThunk.fulfilled, (state, action) => {
      state.editingStatus = "succeeded";
      state.products = [
        ...state.products.filter((p) => p.id !== action.payload.id),
        action.payload,
      ];
    })
    .addCase(editProductsThunk.rejected, (state, action) => {
      state.editingStatus = "failed";
      state.productsError = action.error.message;
    });
