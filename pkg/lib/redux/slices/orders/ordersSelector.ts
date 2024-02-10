import { State } from "../../store";

export const selectOrdersStatus = (state: State) => state.orders.ordersStatus;
export const selectSignleOrderStatus = (state: State) =>
  state.orders.signleOrderStatus;

export const selectPickupOrders = (state: State) =>
  state.orders.orders.filter((o) => o.type === "pickup");

export const selectNewOrders = (state: State) =>
  state.orders.orders.filter((o) => o.type === "new");

export const selectPreparingOrders = (state: State) =>
  state.orders.orders.filter((o) => o.type === "preparing");

export const selectAllCompleteOrders = (state: State) =>
  state.orders.orders.filter((o) => o.type === "complete");

//deprecated
export const selectAllNonCompleteOrders = (state: State) => state.orders.orders;
//

export const selectAllOrders = (state: State) => state.orders.orders;

export const selectCreatingOrderStatus = (state: State) =>
  state.orders.creatingOrderStaus;

export const selectSignleOrder = (state: State) => state.orders.signleOrder;

export const selectOrderToAppednTo = (state: State) =>
  state.orders.orderBeingApendedTo;
