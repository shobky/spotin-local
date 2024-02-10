import { StateStatus } from "@/types";
import { CustomerT } from "@/types/customers";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { autoCompleteCustomersReducer } from "./thunks/autoCompleteCustomersThunk";
import { fetchAllCustomersReducer } from "./thunks/fetchAllCustomers";
import { addNewCustomerThunkReducers } from "./thunks/addNewCustomerThunk";

export interface CustomerInitialState {
  customerName: string | undefined;
  customers: CustomerT[] | [];
  customerStatus: StateStatus | "empty";
  customerInput: string | undefined;
}
const initialState: CustomerInitialState = {
  customerName: "",
  customers: [],
  customerStatus: "idle",
  customerInput: "",
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<string | undefined>) => {
      state.customerName = action.payload;
    },
    changeCustomerInput: (state, action: PayloadAction<string | undefined>) => {
      state.customerInput = action.payload;
    },
    removeCustomer: (state) => {
      state.customerName = "";
    },
  },
  extraReducers(builder) {
    autoCompleteCustomersReducer(builder),
      fetchAllCustomersReducer(builder),
      addNewCustomerThunkReducers(builder);
  },
});
