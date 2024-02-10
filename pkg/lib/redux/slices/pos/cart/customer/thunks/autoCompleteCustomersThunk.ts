import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { autoCompleteCustomers } from "@/lib/services/customerService";
import { CustomerInitialState } from "../customerSlice";

export const fetchAutoCompleteCustomersThunk = createAsyncThunk(
  "products/fetchAutoCompleteCustomers",
  async (name: string) => {
    const customers = await autoCompleteCustomers(name);
    return customers;
  }
);

export const autoCompleteCustomersReducer = (
  builder: ActionReducerMapBuilder<CustomerInitialState>
) =>
  builder
    .addCase(fetchAutoCompleteCustomersThunk.pending, (state) => {
      state.customerStatus = "loading";
    })
    .addCase(fetchAutoCompleteCustomersThunk.fulfilled, (state, action) => {
      state.customerStatus = "succeeded";
      state.customers = [...action.payload, ...state.customers];
    })
    .addCase(fetchAutoCompleteCustomersThunk.rejected, (state, action) => {
      state.customerStatus = "failed";
    });
