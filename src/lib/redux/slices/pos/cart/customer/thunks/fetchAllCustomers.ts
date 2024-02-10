import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCustomers } from "@/lib/services/customerService";
import { CustomerInitialState } from "../customerSlice";

export const fetchAllCustomersThunk = createAsyncThunk(
  "products/fetchAllCustomers",
  async () => {
    const customers = await fetchAllCustomers();
    return customers;
  }
);

export const fetchAllCustomersReducer = (
  builder: ActionReducerMapBuilder<CustomerInitialState>
) =>
  builder
    .addCase(fetchAllCustomersThunk.pending, (state) => {
      state.customerStatus = "loading";
    })
    .addCase(fetchAllCustomersThunk.fulfilled, (state, action) => {
      state.customerStatus = "succeeded";
      state.customers = action.payload;
    })
    .addCase(fetchAllCustomersThunk.rejected, (state, action) => {
      state.customerStatus = "failed";
    });
