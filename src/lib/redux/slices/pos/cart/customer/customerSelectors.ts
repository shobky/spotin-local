import { State } from "@/lib/redux/store";

export const selectPickedCustomerName = (state: State) =>
  state.customer.customerName;

export const selectCustomerSlice = (state: State) =>   state.customer;
