import { ProductT } from ".";

export type StockItemKey = "id" | "name" | "usedIn" | "amount" | "unit";
export type StockItemUnit = "g" | "ml" | "item";

export type StockItem = {
  id?: string;
  name: string;
  usedIn: string[];
  amount: number;
  unit: StockItemUnit;
};

export type StockItemData = {
  id?: string;
  name: string;
  usedIn: string[];
  amount: number;
  unit: StockItemUnit;
  products?: ProductT[];
};
