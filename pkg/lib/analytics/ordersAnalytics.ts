import { isValid } from "date-fns";
import { CustomerT, UniqueCustomerVisitor } from "./../../types/analytics.d";
import { CartItemT, OrderT } from "@/types";

export function calculateOrdersSales(orders: OrderT[]) {
  if (!orders) return { totalRevenue: 0, sales: [] };
  let totalRevenue = 0;
  let totalCheckinIncome = 0;
  let totalItemsIncome = 0;

  let sales = [];
  for (const order of orders) {
    totalRevenue += order.subtotal;
    totalCheckinIncome += order.tickets.total;
    totalItemsIncome += order.cart.total;
    sales.push({
      customer: order.customer,
      items: order.cart.total,
      tickets: order.tickets.total,
      ticketsQty: order.tickets.totalQty,
      createdAt: order.createdAt,
      checkins: order.tickets.totalQty,
    });
  }
  return { totalRevenue, sales, totalCheckinIncome, totalItemsIncome };
}

export function calculateUniqueCustomers(orders: OrderT[]) {
  if (!orders) return { totalCheckins: 0, totalUniqueCustomers: [] };

  let totalUniqueCustomers: UniqueCustomerVisitor[] = [];
  let totalCheckins = 0;

  for (const order of orders) {
    const customerIdx = totalUniqueCustomers.findIndex(
      (tuc) => tuc.customer.id === order.id
    );
    if (customerIdx === -1) {
      totalUniqueCustomers.push({
        customer: order.customer,
        visits: 1,
        orderTicketsQty: order.tickets.totalQty,
      });
    } else {
      totalUniqueCustomers[customerIdx].visits = Number(
        totalUniqueCustomers[customerIdx].visits + 1
      );
    }
    totalCheckins += order.tickets.totalQty;
  }
  return { totalUniqueCustomers, totalCheckins };
}

const formatTime = (date: Date | number): string => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
  }).format(date);
};

export const generateChartData = (
  orders: OrderT[]
): { name: string; total: number }[] => {
  const data: { name: string; total: number }[] = [];

  // Loop through each order
  orders.forEach((order) => {
    // Loop through each ticket in the order
    order.tickets.tickets.forEach((ticket) => {
      // Use the start time of the ticket to determine the hour
      const startHour = isValid(new Date(ticket.ticket.start.seconds * 1000))
        ? new Date(ticket.ticket.start.seconds * 1000).getHours()
        : new Date(ticket.ticket.start).getHours();
      const formattedTime = formatTime(new Date().setHours(startHour, 0, 0, 0));

      // Check if the time is already present in the data array
      const existingEntryIndex = data.findIndex(
        (entry) => entry.name === formattedTime
      );

      if (existingEntryIndex !== -1) {
        // If time exists, increment the check-ins
        data[existingEntryIndex].total += ticket.qty;
      } else {
        // If time doesn't exist, add a new entry
        data.push({ name: formattedTime, total: ticket.qty });
      }
    });
  });

  return data;
};

export function calculateItemsSold(orders: OrderT[]) {
  const items: { name: string; total: number }[] = [];
  orders.forEach((order) => {
    order.cart.items.forEach((item: CartItemT) => {
      const idx = items.findIndex(
        (i) => i.name === `${item.item.name.slice(0,14)}`
      );
      if (idx === -1) {
        items.push({ name: `${item.item.name.slice(0,14)}`, total: item.qty });
      } else {
        items[idx].total = items[idx].total + item.qty;
      }
    });
  });
  return items;
}
