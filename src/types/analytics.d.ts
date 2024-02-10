import { TimestampT } from ".";

export type CustomerT = {
  name: string | null;
  id: string;
  email?: string;
  picture?: string;
};
export type SalesT = {
  customer: CustomerT;
  items: number;
  tickets: number;
  ticketsQty: number;
  createdAt: TimestampT | Date | any;
};

export type UniqueCustomerVisitor = {
  customer: CustomerT;
  visits: number;
  orderTicketsQty: number;
};

export type ArchivedOrdersData = {
  id: string;
  orders: OrderT[];
  totalReveue: number;
};
