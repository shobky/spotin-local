import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { categoriesInitialState } from "./categoriesSlice";
import { getProductCategories } from "@/lib/services/categoriesService";

export const fetchCategoreisThunk = createAsyncThunk(
  "categoreis/fetchCategories",
  async () => {
    const categoreis = await getProductCategories();
    return categoreis;
  }
);

export const fetchCategoreisReducers = (
  builder: ActionReducerMapBuilder<categoriesInitialState>
) =>
  builder
    .addCase(fetchCategoreisThunk.pending, (state) => {
      state.categoriesStatus = "loading";
    })
    .addCase(fetchCategoreisThunk.fulfilled, (state, action) => {
      state.categoriesStatus = "succeeded";
      state.categories = action.payload;
    })
    .addCase(fetchCategoreisThunk.rejected, (state, action) => {
      state.categoriesStatus = "failed";
      state.categoriesError = action.error.message;
    });
