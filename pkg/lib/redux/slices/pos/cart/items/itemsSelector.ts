import { State } from "@/lib/redux/store";

export const selectAllItemsinCart = (state: State) => state.items.items;
export const selectProductsCart = (state: State) => state.items;
