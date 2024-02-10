import { editProductsSlice } from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
import { ordersSlcie } from "./slices/orders/ordersSlice";
import { customerSlice } from "./slices/pos/cart/customer/customerSlice";
import { itemsSlice } from "./slices/pos/cart/items/itemsSlice";
import { ticketsSlice } from "./slices/pos/cart/tickets/ticketsSlice";
import { categoriesSlice } from "./slices/pos/categories/categoriesSlice";
import { productsSlice } from "./slices/pos/products/productsSlice";
import { stockItemsSlice } from "./slices/stock/stockSlice";

export const rootReducer = {
  products: productsSlice.reducer,
  stockItems: stockItemsSlice.reducer,
  items: itemsSlice.reducer,
  tickets: ticketsSlice.reducer,
  customer: customerSlice.reducer,
  orders: ordersSlcie.reducer,
  categories: categoriesSlice.reducer,
  editProductsSlice: editProductsSlice.reducer,
};
