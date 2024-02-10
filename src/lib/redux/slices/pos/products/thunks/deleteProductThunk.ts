import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteFromProducts } from "@/lib/services/productsService";
import { ProductsInitialState } from "../productsSlice";

export const deleteProductsThunk = createAsyncThunk(
  "products/deleteProducts",
  async (id: string | undefined) => {
    if (!id) throw new Error("undefined product id");
    await deleteFromProducts(id);
    return id;
  }
);

export const deleteProductsReducers = (
  builder: ActionReducerMapBuilder<ProductsInitialState>
) =>
  builder
    .addCase(deleteProductsThunk.pending, (state) => {
      state.productsStatus = "loading";
    })
    .addCase(deleteProductsThunk.fulfilled, (state, action) => {
      state.productsStatus = "succeeded";
      const newList = state.products.filter((p) => p.id !== action.payload);
      state.products = newList;
    })
    .addCase(deleteProductsThunk.rejected, (state, action) => {
      state.productsStatus = "failed";
      state.productsError = action.error.message;
    });
