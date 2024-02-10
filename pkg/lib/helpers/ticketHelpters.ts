import { OrderT, OrderTicketsT, TicketT } from "@/types";
import { differenceInMilliseconds } from "date-fns";

export function ticketTimeTracker(ticket: TicketT) {
  const { start, end, paused } = ticket;
  if (!start) {
    return 0;
  }
  const startDate = new Date(start.seconds * 1000);
  const endDate = paused
    ? new Date(paused.seconds * 1000)
    : end
    ? new Date(end.seconds * 1000)
    : new Date();

  return differenceInMilliseconds(endDate, startDate) / 1000;
}

export function isPassedTicketPeriod(ticket: TicketT) {
  const { additional } = ticket;
  if (!additional) return false;

  const timePeriodInSeconds = additional.after;
  const differenceInSeconds = ticketTimeTracker(ticket);

  if (differenceInSeconds > timePeriodInSeconds) return true;
  return false;
}

export function calculateTicketPrice(ticket: TicketT) {
  const { additional, price } = ticket;
  if (!additional) return price;

  if (isPassedTicketPeriod(ticket)) return price + additional.amount;
  return price;
}

export function calculateTicketsSubTotal(tickets: OrderTicketsT) {
  let ticketsTotal = 0;
  if (!tickets.tickets) return 0;
  tickets.tickets.forEach((ticket) => {
    ticketsTotal += calculateTicketPrice(ticket.ticket) * ticket.qty;
  });

  return ticketsTotal;
}

export function calculateOrderSubTotal(order: OrderT) {
  return calculateTicketsSubTotal(order.tickets) + order.cart.total;
}

export function checkoutActiveTickets(orderTickets: OrderTicketsT) {
  let newTickets: OrderTicketsT = {
    tickets: [],
    total: orderTickets.total,
    totalQty: orderTickets.totalQty,
  };
  orderTickets.tickets.forEach((ticket) => {
    let buffer = { ...ticket };
    buffer.ticket = { ...ticket.ticket, end: new Date() };
    newTickets.tickets.push(buffer);
  });
  return newTickets;
}
