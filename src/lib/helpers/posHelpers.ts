import { CartItemT, OrderTicketsT, TicketT } from "@/types";
import { itemsSlice } from "../redux/slices/pos/cart/items/itemsSlice";
import { ticketsSlice } from "../redux/slices/pos/cart/tickets/ticketsSlice";
import { customerSlice } from "../redux/slices/pos/cart/customer/customerSlice";
import { ordersSlcie } from "../redux/slices/orders/ordersSlice";


export function mergeOrderItemsWithCartItems(
  cartItems: CartItemT[],
  orderItems: CartItemT[]
) {
  const mergedItems = [...orderItems];
  const newItems = [...cartItems];

  for (const newItem of newItems) {
    const itemIndex = mergedItems.findIndex(
      (m) => m.item.id === newItem.item.id
    );
    console.log(itemIndex, mergedItems[itemIndex], newItem);
    if (itemIndex === -1) {
      mergedItems.push(newItem);
    } else {
      const modifiedItem = { ...mergedItems[itemIndex] };
      modifiedItem.qty += newItem.qty;
      mergedItems[itemIndex] = modifiedItem;
    }
  }
  return mergedItems;
}

export function handleAppendingMoretickets(
  cartTickets: { ticket: TicketT; qty: number }[],
  orderTickets: OrderTicketsT
) {
  return [...orderTickets.tickets, ...cartTickets];
}



export function handleResetPos(dispatch: any) {
  dispatch(itemsSlice.actions.clearCart());
  dispatch(ticketsSlice.actions.clearTicketCart());
  dispatch(customerSlice.actions.removeCustomer());
  dispatch(ordersSlcie.actions.selectOrderToAppednTo(undefined));
}

