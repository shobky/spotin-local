import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewCustomer,
  autoCompleteCustomers,
} from "@/lib/services/customerService";
import { CustomerInitialState } from "../customerSlice";

export const addNewCustomerThunk = createAsyncThunk(
  "products/addNewCustomer",
  async (data: { name: string; id: number }) => {
    const newCustomer = await addNewCustomer(data.name, data.id);
    return newCustomer;
  }
);

export const addNewCustomerThunkReducers = (
  builder: ActionReducerMapBuilder<CustomerInitialState>
) =>
  builder
    .addCase(addNewCustomerThunk.pending, (state) => {
      state.customerStatus = "loading";
    })
    .addCase(addNewCustomerThunk.fulfilled, (state, action) => {
      state.customerStatus = "succeeded";
      if (action.payload) {
        state.customers = [...state.customers, action.payload];
      }
    })
    .addCase(addNewCustomerThunk.rejected, (state, action) => {
      state.customerStatus = "failed";
    });
