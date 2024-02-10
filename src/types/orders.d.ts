import { CartT, StateStatus, TicketT } from ".";

type TimestampT = {
  seconds: number;
  nanoseconds: number;
};

export type OrderTypeT =
  | "new"
  | "preparing"
  | "complete"
  | "pickup"
  | "archive"
  | "canceled";

export type OrderTicketsT = {
  tickets: { ticket: TicketT; qty: number }[];
  total: number;
  totalQty: number;
};

export type OrderT = {
  id?;
  customer: {
    name: string | null;
    id: string;
  };
  cart: CartT;
  tickets: OrderTicketsT;
  subtotal: number;
  type: OrderTypeT;
  state?: OrderTypeT | "in-progress";
  createdAt: TimestampT | Date | any;
  touched?: Date | any;
  deleted?: boolean;
  deletedAT?: Date;
  status?: StateStatus;
  error?: string | undefined;
  checkoutDate?: TimestampT | Date | any;
  isTakeaway?: boolean;
  note?: string;
  day?: number;
  month?: number;
  year?: number;
};
