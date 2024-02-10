import { OrderT, StateStatus } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchNotCompleteOrdersReducers } from "./thunks/fetchNotCompleteOrders";
import { updateOrderTypeThunkReducers } from "./thunks/updateOrderType";
import { createNewOrderThunkReducers } from "./thunks/createNewOrderThunk";
import { fetchOrderByIdReducers } from "./thunks/fetchOrderByIdThunk";
import {
  appendToOrderThunk,
  appendToOrderThunkReducers,
} from "./thunks/appendToOrderThunk";
import { archiveAllOrdersThunkReducers } from "./thunks/archiveOrdersThunk";
import { archiveCompletedOrdersThunkReducers } from "./thunks/archiveCompletedOrdersThunk";
import { cancelOrderThunkReducers } from "./thunks/cancelOrderThunk";

export interface OrdersInitialState {
  //array of orders from db
  orders: OrderT[];
  ordersStatus: StateStatus;
  ordersError: string | undefined;

  //order to view in the /orders/[id]
  signleOrder: OrderT | undefined;
  signleOrderStatus: StateStatus;

  //a totally new order created and pushed to the array of orders after adding to DB
  creatingOrderStaus: StateStatus;
  creatingOrder: OrderT | undefined;

  //the order being edited and getting more item added to it orignial data
  // **not including new items that will be added**
  orderBeingApendedTo: OrderT | undefined;
}

const initialState: OrdersInitialState = {
  orders: [],
  ordersStatus: "idle",
  signleOrderStatus: "idle",
  creatingOrderStaus: "idle",
  creatingOrder: undefined,
  signleOrder: undefined,
  ordersError: undefined,
  orderBeingApendedTo: undefined,
};

export const ordersSlcie = createSlice({
  name: "orders",
  initialState,
  reducers: {
    selectOrderToSignle: (state, action: PayloadAction<OrderT | undefined>) => {
      state.signleOrder = action.payload;
    },
    selectOrderToAppednTo: (
      state,
      action: PayloadAction<OrderT | undefined>
    ) => {
      state.orderBeingApendedTo = action.payload;
    },
  },
  extraReducers(builder) {
    fetchNotCompleteOrdersReducers(builder);
    updateOrderTypeThunkReducers(builder);
    createNewOrderThunkReducers(builder);
    fetchOrderByIdReducers(builder);
    appendToOrderThunkReducers(builder);
    archiveAllOrdersThunkReducers(builder);
    archiveCompletedOrdersThunkReducers(builder);
    cancelOrderThunkReducers(builder);
  },
});
