import { CartItemT, ProductT } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ItemsInitialState {
  items: CartItemT[];
  itemsSubTotal: number;
}
const initialState: ItemsInitialState = {
  items: [],
  itemsSubTotal: 0,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItemtoCart: (state, action: PayloadAction<ProductT>) => {
      const product = action.payload;
      const itemIndex = state.items.findIndex((i) => i.item.id === product.id);
      if (itemIndex !== -1) {
        state.items[itemIndex].qty++;
      } else {
        state.items.push({
          item: product,
          qty: 1,
        });
      }
      state.itemsSubTotal += Number(product.price);
    },
    removeItemFromCart: (state, action: PayloadAction<ProductT>) => {
      const product = action.payload;
      const itemIndex = state.items.findIndex((i) => i.item.id === product.id);

      if (itemIndex !== -1) {
        state.itemsSubTotal -=
          Number(product.price) * state.items[itemIndex].qty;
        state.items.splice(itemIndex, 1);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<ProductT>) => {
      const product = action.payload;
      const itemIndex = state.items.findIndex((i) => i.item.id === product.id);

      if (itemIndex !== -1) {
        const newQty = state.items[itemIndex].qty - 1;
        if (newQty === 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].qty--;
        }
        state.itemsSubTotal -= Number(product.price);
      }
    },
    clearCart: (state) => {
      (state.items = []), (state.itemsSubTotal = 0);
    },
  },
});
