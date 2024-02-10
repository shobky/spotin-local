import { StateStatus, TimestampT } from ".";
import { StockItem, StockItemUnit } from "./stock";

export type ProductKey =
  | "id"
  | "name"
  | "picture"
  | "price"
  | "active"
  | "stockQty"
  | "category"
  | "ingredients";

export type IngredientT = {
  item: {
    name: string;
    id: string | undefined;
    unit: StockItemUnit;
  };
  measure: number;
};
export type ProductT = {
  id: string;
  name: string;
  picture: string | any;
  price: number;
  active?: boolean;
  stockQty?: number;
  category: {
    name: string;
    id: string;
  };
  ingredients: IngredientT[];
};

export type CartItemT = {
  item: ProductT;
  qty: number;
};

export type CartT = {
  items: CartItem[];
  total: number;
};

export type CategoryT = {
  id: string;
  name: string;
};
export type TicketT = {
  id: string;
  name: string;
  price: number;
  additional: {
    amount: number;
    after: number;
  } | null;
  start?: TimestampT | any;
  end?: TimestampT | any;
  active?: boolean;
  paused?: TimestampT | any;
};
