import { OrderT } from "@/types";
import React from "react";
import { cn } from "@/lib/utils";
import { calculateOrderSubTotal } from "@/lib/helpers/ticketHelpters";
import OrderCardAction from "../orderCardAction";
import OrderItems from "./orderItems";
import OrderTickets from "./orderTickets";
import OrderInfo from "./orderInfo";

export const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "bg-muted w-full px-8 py-6 rounded-lg flex flex-col justify-between  h-full",
        className
      )}
    >
      {children}
    </section>
  );
};

export default function DetailedOrder({ order }: { order: OrderT }) {
  return (
    <div className="flex gap-4 h-full ">
      <div className="grid gap-4 w-full h-full">
        <OrderInfo order={order} />
        <Section>
          <p className="text-sm text-muted-foreground">Subtotal </p>
          <p
            className={`text-2xl font-extrabold ${
              order.type === "canceled" && " line-through"
            }`}
          >
            {calculateOrderSubTotal(order)}£
          </p>
        </Section>
        <OrderCardAction view="big" order={order} />
      </div>
      <div className="w-full h-full ">
        <OrderItems type={order.type} cart={order.cart} />
      </div>
      <div className="w-full h-full ">
        <OrderTickets
        type={order.type}
          tickets={order.tickets}
          checkoutDate={order.checkoutDate}
        />
      </div>
    </div>
  );
}
